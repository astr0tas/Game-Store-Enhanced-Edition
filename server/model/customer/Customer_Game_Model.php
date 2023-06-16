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

      public function getGames($name=null)
      {
            $sql="";
            if($name)
                  $sql = "SELECT id,name,picture_1, price, discount from game where status=true and name like '$name%' order by name asc";
            else
                  $sql = "SELECT id,name,picture_1, price, discount from game where status=true order by name asc";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function isAddedToWishlist($id, $game_id)
      {
            $sql = "SELECT * from wishlist where game_id='$game_id' and customer_id='$id'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  return $result->fetch_assoc();
            }
            return null;
      }

      public function isAddedToCart($id, $game_id)
      {
            $sql = "SELECT * from shopping_cart where game_id='$game_id' and customer_id='$id'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  return $result->fetch_assoc();
            }
            return null;
      }

      public function addToWishlist($id, $game_id)
      {
            $sql = "insert into wishlist values('$game_id','$id')";
            return $this->db->query($sql);
      }

      public function removeFromWishlist($id, $game_id)
      {
            $sql = "delete from wishlist where customer_id='$id' and game_id='$game_id'";
            return $this->db->query($sql);
      }

      public function addToCart($id, $game_id)
      {
            $sql = "insert into shopping_cart(game_id,customer_id) values('$game_id','$id')";
            return $this->db->query($sql);
      }

      public function removeFromCart($id, $game_id)
      {
            $sql = "delete from shopping_cart where customer_id='$id' and game_id='$game_id'";
            return $this->db->query($sql);
      }

      public function getGameStatus($id)
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

      public function getGameCategory($id)
      {
            $sql = "select category_type from belongs_to where game_id='$id'";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {   
                        $arr[] = $row;
                  }
            }
            return $arr;  
      }

      public function getAllInfo($id)
      {
            $sql = "SELECT * from game where id='$id'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  $row = $result->fetch_assoc();
                  return $row;
            }
            return null;
      }

      public function getWishlist($id,$name)
      {
            $sql="";
            if($name)
                  $sql = "SELECT id,name,picture_1, price, discount from game join wishlist on game_id=id where customer_id='$id' and name like '$name%' and status=true order by name asc";
            else
                  $sql = "SELECT id,name,picture_1, price, discount from game join wishlist on game_id=id where customer_id='$id' and status=true order by name asc";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
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

      public function getCart()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $sql = "SELECT game.id,game.name,picture_1, price, discount,amount,membership_discount from game join shopping_cart on game_id=game.id join customer on customer_id=customer.id  where customer_id='$id' group by game.name order by game.name asc";
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

      public function displayCart($offset)
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $sql = "SELECT game.id,game.name,picture_1, price, discount,amount,membership_discount from game join shopping_cart on game_id=game.id join customer on customer_id=customer.id  where customer_id='$id' group by game.name order by game.name asc limit 2 offset $offset";
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

      public function buyGame($games,$method)
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $games=explode(',',$games);
            $sql="";
            foreach ($games as $element) {
                  $sql .= "call buyGame('$id','$element','$method');";
            }
            return $this->db->multi_query($sql);
      }

      public function product($offset)
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $sql = "SELECT game.id,game.name,picture_1, price, discount,purchase_history.code from game join purchase_history on purchase_history.game_id=game.id join purchase_history_description on purchase_history_description.id = purchase_history.description_id where purchase_history_description.date=curdate() group by game.name order by game.name asc limit 2 offset $offset";
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
