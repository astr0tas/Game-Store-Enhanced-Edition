<?php
class CustomerGameModel
{
      private $db;

      public function __construct()
      {
            $host = 'localhost';
            $user = 'owner';
            $password = 'owner123';
            $database = 'game_store';
            $port = '3306';

            $this->db = new mysqli($host, $user, $password, $database, $port);
            if ($this->db->connect_error) {
                  die('Connection failed: ' . $this->db->connect_error);
            }
      }

      public function getBestSeller()
      {
            $sql = "SELECT id,name,discount,picture_1, price,count(*) as total_sale from game join activation_code on game.id=activation_code.game_id where status=\"used\"  group by name order by total_sale desc,name limit 5";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $row['picture_1'] = unpack('c*', $row['picture_1']);
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function addWishlist($game_id)
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $sql = "insert into wishlist values('$game_id','$id')";
            return $this->db->query($sql);
      }

      public function removeWishlist($game_id)
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $sql = "delete from wishlist where customer_id='$id' and game_id='$game_id'";
            return $this->db->query($sql);
      }

      public function addCart($game_id)
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $sql = "insert into shopping_cart(game_id,customer_id) values('$game_id','$id'); delete from wishlist where customer_id='$id' and game_id='$game_id';";
            return $this->db->multi_query($sql);
      }

      public function removeCart($game_id)
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $sql = "delete from shopping_cart where customer_id='$id' and game_id='$game_id'";
            return $this->db->query($sql);
      }

      public function gameStatus($id)
      {
            $sql = "select * from activation_code where game_id='$id' and status='available' limit 1";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  $row = $result->fetch_assoc();
                  $arr[] = $row;
            }
            return $arr;
      }

      public function getAllGames($limit, $offset)
      {
            $sql = "SELECT id,name,picture_1, price, discount from game group by name order by name asc limit $limit offset $offset";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $row['picture_1'] = unpack('c*', $row['picture_1']);
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function getWishlist($limit, $offset)
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $sql = "SELECT id,name,picture_1, price, discount from game join wishlist on game_id=id where customer_id='$id' group by name order by name asc limit $limit offset $offset";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $row['picture_1'] = unpack('c*', $row['picture_1']);
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function isAddedToWishlist($game_id)
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $sql = "SELECT * from wishlist where game_id='$game_id' and customer_id='$id'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  return $result->fetch_assoc();
            }
            return null;
      }

      public function isAddedToCart($game_id)
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $sql = "SELECT * from shopping_cart where game_id='$game_id' and customer_id='$id'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  return $result->fetch_assoc();
            }
            return null;
      }

      public function findGame($name, $limit, $offset)
      {
            $sql = "SELECT id,name,picture_1, price, discount from game where name like '%$name%' group by name order by name asc limit $limit offset $offset";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $row['picture_1'] = unpack('c*', $row['picture_1']);
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function findWishlist($name, $limit, $offset)
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $sql = "SELECT game.id,game.name,picture_1, price, discount from game join wishlist on wishlist.game_id=game.id where wishlist.customer_id='$id' and game.name like '%$name%' group by game.name order by game.name asc limit $limit offset $offset";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $row['picture_1'] = unpack('c*', $row['picture_1']);
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function __destruct()
      {
            $this->db->close();
      }
}
