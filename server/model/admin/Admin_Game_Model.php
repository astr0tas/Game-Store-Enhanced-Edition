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
            $sql = "SELECT name,id,price,discount,ratings,count(activation_code.game_id) as solds from game join activation_code on game_id=id where status='used' group by name,id,price,discount,ratings order by name";
            $result = $this->db->query($sql);

            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function delete($data)
      {
            $sql = "DELETE FROM game WHERE id='$data'";
            return $this->db->query($sql);
      }

      public function find($data)
      {
            $sql = "SELECT name,id,price,discount,ratings,count(activation_code.game_id) as solds from game join activation_code on game_id=id where status='used' and name like '%$data%' group by name,id,price,discount,ratings order by name";
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
