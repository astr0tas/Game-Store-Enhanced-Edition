<?php
class GameModel
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

      public function getList()
      {
            $sql = "SELECT name,id,price,discount,ratings from game order by name";
            $result = $this->db->query($sql);

            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function find($data)
      {
            $sql = "SELECT name,id,price,discount,ratings from game where name like '%$data%' order by name";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function getGameSales($id)
      {
            $sql = "SELECT count(activation_code.game_id) as solds from activation_code where status='used' and game_id='$id'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  $row = $result->fetch_assoc();
                  return $row;
            }
            return null;
      }

      public function getGameCategory($id)
      {
            $sql = "SELECT category_type from belongs_to where game_id='$id'";
            $result = $this->db->query($sql);

            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function delete($array)
      {
            $sql = "";
            foreach ($array as $elem) {
                  $sql .= "delete from game where id='$elem'; ";
            }
            return $this->db->multi_query($sql);
      }

      public function getAllInfo($id)
      {
            $sql = "SELECT * from game where id='$id' order by name";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  $row = $result->fetch_assoc();
                  return $row;
            }
            return null;
      }

      public function getGameStatus($id)
      {
            $sql = "select * from activation_code where game_id='$id' and status='available' limit 1";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows) {
                  return true;
            }
            return false;
      }

      public function getCategories()
      {
            $sql = "SELECT * from category";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function create($name, $price, $discount, $description, $minSpec, $maxSpec, $pic1, $pic2, $pic3, $pic4)
      {
            $stmt = $this->db->prepare("CALL addGame(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,@id)");
            $stmt->bind_param("ssssssssss", $name, $price, $discount, $description, $minSpec, $maxSpec, $pic1, $pic2, $pic3, $pic4);
            $stmt->execute();
            $stmt->close();
            $result = $this->db->query("SELECT @id AS id");
            $row = $result->fetch_assoc();
            $id = $row['id'];
            return $id;
      }

      public function addTag($id, $tag)
      {
            $sql = "delete from belongs_to where game_id='$id';";
            if ($tag !== null) {
                  foreach ($tag as $elem) {
                        $sql .= "call addTag('$id','$elem');";
                  }
            }
            return $this->db->multi_query($sql);
      }

      public function addCode($id, $code)
      {
            $sql = "";
            if ($code === null) return false;
            foreach ($code as $elem) {
                  $sql .= "call addCode('$id','$elem');";
            }
            return $this->db->multi_query($sql);
      }

      public function update($id, $name, $price, $discount, $description, $minSpec, $maxSpec, $pic1, $pic2, $pic3, $pic4)
      {
            $stmt = $this->db->prepare("CALL updateGame(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssssssssss", $id, $name, $price, $discount, $description, $minSpec, $maxSpec, $pic1, $pic2, $pic3, $pic4);
            return $stmt->execute();
      }

      public function updateGetGameDetail($id)
      {
            $sql = "SELECT name,price,discount,description,spec_minimum,spec_recommended,picture_1,picture_2,picture_3,picture_4 from game where game.id='$id'";
            $result = $this->db->query($sql);

            if ($result->num_rows > 0) {
                  $row = $result->fetch_assoc();
                  $row['picture_1'] = unpack('c*', $row['picture_1']);
                  $row['picture_2'] = unpack('c*', $row['picture_2']);
                  $row['picture_3'] = unpack('c*', $row['picture_3']);
                  $row['picture_4'] = unpack('c*', $row['picture_4']);
                  return $row;
            }
            return null;
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

      public function __destruct()
      {
            $this->db->close();
      }
}
