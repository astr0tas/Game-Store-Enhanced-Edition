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

      public function getGames($name = null)
      {
            $sql = "";
            if ($name)
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
            $stmt = $this->db->prepare("CALL addToWishlist(?, ?,@OutStatus,@OutDeleted)");
            $stmt->bind_param("ss", $game_id, $id);
            $stmt->execute();
            $stmt->close();
            $result = $this->db->query("SELECT @OutStatus AS OutStatus,@OutDeleted as OutDeleted");
            $row = $result->fetch_assoc();
            return $row;
      }

      public function removeFromWishlist($id, $game_id)
      {
            $sql = "delete from wishlist where customer_id='$id' and game_id='$game_id'";
            return $this->db->query($sql);
      }

      public function addToCart($id, $game_id)
      {
            $stmt = $this->db->prepare("CALL addToCart(?, ?,@OutStatus,@OutRemain,@OutDeleted)");
            $stmt->bind_param("ss", $game_id, $id);
            $stmt->execute();
            $stmt->close();
            $result = $this->db->query("SELECT @OutStatus AS OutStatus,@OutRemain as OutRemain,@OutDeleted as OutDeleted");
            $row = $result->fetch_assoc();
            return $row;
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

      public function getWishlist($id, $name)
      {
            $sql = "";
            if ($name)
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

      public function getCart($id)
      {
            $sql = "SELECT game.id, game.name, picture_1, price, discount, amount from game join shopping_cart on game_id=game.id join customer on customer_id=customer.id  where customer_id='$id' and status=true order by game.name asc";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function adjustAmount($id, $gameID, $mode, $amount)
      {
            $stmt = $this->db->prepare("CALL adjustAmount(?, ?, ?, ?,@OutStatus,@OutDeleted,@OutNotEnough)");
            $stmt->bind_param("ssss", $gameID, $id, $mode, $amount);
            $stmt->execute();
            $stmt->close();
            $result = $this->db->query("SELECT @OutStatus AS OutStatus,@OutDeleted as OutDeleted,@OutNotEnough as OutNotEnough");
            $row = $result->fetch_assoc();
            return $row;
      }

      public function buyGame($id, $total, $method)
      {
            $stmt = $this->db->prepare("CALL buyGame(?, ?, ?, @OutStatus,@OutDeleted,@OutNotEnough)");
            $stmt->bind_param("sds", $id, $total, $method);
            $stmt->execute();
            $stmt->close();
            $result = $this->db->query("SELECT @OutStatus AS OutStatus,@OutDeleted as OutDeleted,@OutNotEnough as OutNotEnough");
            $row = $result->fetch_assoc();
            return $row;
      }

      public function getReceipt($id)
      {
            $sql= "select game.id,game.name,game.picture_1,game.price,game.discount,purchase_history.code from game join purchase_history on game.id=purchase_history.game_id join purchase_history_description on purchase_history_description.id=purchase_history.description_id where purchase_history.customer_id='$id' and purchase_history_description.date >= now() - interval 1 minute order by game.name";
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
            $sql = "SELECT id,name,discount,picture_1, price from game join activation_code on game.id=activation_code.game_id where activation_code.status=\"used\" and game.status=true group by name order by count(*) desc,name limit 5";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
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
