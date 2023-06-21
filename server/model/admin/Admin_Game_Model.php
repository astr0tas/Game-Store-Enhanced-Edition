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
            $sql = "SELECT name,id,price,discount,status from game order by name";
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
            $sql = "SELECT name,id,price,discount from game where name like '%$data%' order by name";
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
            $sql = "    ";
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

      public function update($id, $name, $price, $discount, $description, $minSpec, $recSpec, $picture1, $picture2, $picture3, $picture4)
      {
            $stmt = $this->db->prepare("CALL updateGame(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssssssssss", $id, $name, $price, $discount, $description, $minSpec, $recSpec, $picture1, $picture2, $picture3, $picture4);
            return $stmt->execute();
      }

      public function getDailySolds()
      {
            $sql = "SELECT game.id,game.name,game.price,game.discount,count(*) as solds from game 
            join purchase_history on purchase_history.game_id=game.id 
            join purchase_history_description on purchase_history_description.id=purchase_history.description_id 
            where date>=CURDATE() and game.status=true group by game.id,game.name,game.price,game.discount
            order by solds desc limit 5";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function getWeeklySolds()
      {
            $sql = "SELECT game.id,game.name,game.price,game.discount,count(*) as solds from game 
            join purchase_history on purchase_history.game_id=game.id 
            join purchase_history_description on purchase_history_description.id=purchase_history.description_id 
            where date>=DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) and game.status=true group by game.id,game.name,game.price,game.discount
            order by solds desc limit 5";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function getMonthlySolds()
      {
            $sql = "SELECT game.id,game.name,game.price,game.discount,count(*) as solds from game 
            join purchase_history on purchase_history.game_id=game.id 
            join purchase_history_description on purchase_history_description.id=purchase_history.description_id 
            where DATE_FORMAT(date, '%Y-%m-01') = DATE_FORMAT(NOW(), '%Y-%m-01') and game.status=true group by game.id,game.name,game.price,game.discount
            order by solds desc limit 5";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function getAnnuallySolds()
      {
            $sql = "SELECT game.id,game.name,game.price,game.discount,count(*) as solds from game 
            join purchase_history on purchase_history.game_id=game.id 
            join purchase_history_description on purchase_history_description.id=purchase_history.description_id 
            where DATE_FORMAT(date, '%Y-01-01') = DATE_FORMAT(NOW(), '%Y-01-01') and game.status=true group by game.id,game.name,game.price,game.discount
            order by solds desc limit 5";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function latestTransaction($id)
      {
            $sql = "select date from purchase_history_description join purchase_history on purchase_history.description_id=purchase_history_description.id
            where game_id='$id' order by date desc limit 1";
            $result = $this->db->query($sql);
            return $result->fetch_assoc();
      }

      public function getOverall($choice)
      {
            $sql = "";
            if ($choice === '0')
                  $sql .= "select belongs_to.category_type as name, count(*) as value from belongs_to 
                  join purchase_history on purchase_history.game_id=belongs_to.game_id
                  join purchase_history_description on purchase_history_description.id=purchase_history.description_id
                  join game on game.id=belongs_to.game_id
                  where purchase_history_description.date>=CURDATE() and game.status=true
                  group by belongs_to.category_type
                  order by belongs_to.category_type";
            else if ($choice === '1')
                  $sql .= "select belongs_to.category_type as name, count(*) as value from belongs_to 
                  join purchase_history on purchase_history.game_id=belongs_to.game_id
                  join purchase_history_description on purchase_history_description.id=purchase_history.description_id
                  join game on game.id=belongs_to.game_id
                  where purchase_history_description.date>=DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) and game.status=true
                  group by belongs_to.category_type
                  order by belongs_to.category_type";
            else if ($choice === '2')
                  $sql .= "select belongs_to.category_type as name, count(*) as value from belongs_to 
                  join purchase_history on purchase_history.game_id=belongs_to.game_id
                  join purchase_history_description on purchase_history_description.id=purchase_history.description_id
                  join game on game.id=belongs_to.game_id
                  where DATE_FORMAT(purchase_history_description.date, '%Y-%m-01') = DATE_FORMAT(NOW(), '%Y-%m-01') and game.status=true
                  group by belongs_to.category_type
                  order by belongs_to.category_type";
            else
                  $sql .= "select belongs_to.category_type as name, count(*) as value from belongs_to 
                  join purchase_history on purchase_history.game_id=belongs_to.game_id
                  join purchase_history_description on purchase_history_description.id=purchase_history.description_id
                  join game on game.id=belongs_to.game_id
                  where DATE_FORMAT(purchase_history_description.date, '%Y-01-01') = DATE_FORMAT(NOW(), '%Y-01-01') and game.status=true
                  group by belongs_to.category_type
                  order by belongs_to.category_type";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function getCategories2($name)
      {
            $sql = "SELECT * from category where type like '$name%'";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function getStats($choice,$category,$name)
      {
            $sql = "";
            if ($choice === '0')
                  $sql .= "SELECT game.id,game.name,game.price,game.discount,count(*) as solds from game 
            join purchase_history on purchase_history.game_id=game.id 
            join purchase_history_description on purchase_history_description.id=purchase_history.description_id
            join belongs_to on belongs_to.game_id=game.id
            where date>=CURDATE() and game.status=true and game.name like '$name%' and belongs_to.category_type='$category'
            group by game.id,game.name,game.price,game.discount
            order by solds desc";
            else if ($choice === '1')
                  $sql .= "SELECT game.id,game.name,game.price,game.discount,count(*) as solds from game 
            join purchase_history on purchase_history.game_id=game.id 
            join purchase_history_description on purchase_history_description.id=purchase_history.description_id 
            join belongs_to on belongs_to.game_id=game.id
            where date>=DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) and game.status=true and game.name like '$name%' and belongs_to.category_type='$category'
            group by game.id,game.name,game.price,game.discount
            order by solds desc";
            else if ($choice === '2')
                  $sql .= "SELECT game.id,game.name,game.price,game.discount,count(*) as solds from game 
            join purchase_history on purchase_history.game_id=game.id 
            join purchase_history_description on purchase_history_description.id=purchase_history.description_id 
            join belongs_to on belongs_to.game_id=game.id
            where DATE_FORMAT(date, '%Y-%m-01') = DATE_FORMAT(NOW(), '%Y-%m-01') and game.status=true and game.name like '$name%' and belongs_to.category_type='$category'
            group by game.id,game.name,game.price,game.discount
            order by solds desc";
            else
                  $sql .= "SELECT game.id,game.name,game.price,game.discount,count(*) as solds from game 
            join purchase_history on purchase_history.game_id=game.id 
            join purchase_history_description on purchase_history_description.id=purchase_history.description_id 
            join belongs_to on belongs_to.game_id=game.id
            where DATE_FORMAT(date, '%Y-01-01') = DATE_FORMAT(NOW(), '%Y-01-01') and game.status=true and game.name like '$name%' and belongs_to.category_type='$category'
            group by game.id,game.name,game.price,game.discount
            order by solds desc";
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
