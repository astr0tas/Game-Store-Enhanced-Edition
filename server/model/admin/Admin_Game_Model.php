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
            $sql = "SELECT name,id,price,discount,ratings,status from game order by name";
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

      public function deactivate($array)
      {
            $sql = "";
            foreach ($array as $elem) {
                  $sql .= "update game set status=false where id='$elem'; ";
            }
            return $this->db->multi_query($sql);
      }

      public function activate($array)
      {
            $sql = "";
            foreach ($array as $elem) {
                  $sql .= "update game set status=true where id='$elem'; ";
            }
            return $this->db->multi_query($sql);
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

      public function update($id,$name, $price, $discount, $description, $minSpec, $recSpec, $picture1, $picture2, $picture3, $picture4)
      {
            $stmt = $this->db->prepare("CALL updateGame(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssssssssss", $id, $name, $price, $discount, $description, $minSpec, $recSpec, $picture1, $picture2, $picture3, $picture4);
            return $stmt->execute();
      }

      public function __destruct()
      {
            $this->db->close();
      }
}
