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

            $this->db = new mysqli($host, $user, $password, $database);
            if ($this->db->connect_error) {
                  die('Connection failed: ' . $this->db->connect_error);
            }
      }

      //   public function getAll() {
      //     $sql = 'SELECT * FROM users';
      //     $result = $this->db->query($sql);
      //     $users = array();

      //     if ($result->num_rows > 0) {
      //       while ($row = $result->fetch_assoc()) {
      //         $users[] = $row;
      //       }
      //     }

      //     return $users;
      //   }

      //   public function create($data) {
      //     $name = $data['name'];
      //     $email = $data['email'];
      //     $sql = "INSERT INTO users (name, email) VALUES ('$name', '$email')";
      //     $this->db->query($sql);
      //   }

      //   public function update($id, $data) {
      //     $name = $data['name'];
      //     $email = $data['email'];
      //     $sql = "UPDATE users SET name = '$name', email = '$email' WHERE id = $id";
      //     $this->db->query($sql);
      //   }

      //   public function delete($id) {
      //     $sql = "DELETE FROM users WHERE id = $id";
      //     $this->db->query($sql);
      //   }

      public function __destruct()
      {
            $this->db->close();
      }
}
