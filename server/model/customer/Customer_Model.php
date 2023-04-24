<?php
class CustomerSelfModel
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

      public function login($username, $password)
      {
            $sql = "select * from customer where username='$username' and userpassword='$password'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  $row = $result->fetch_assoc();
                  return $row;
            }
            return null;
      }

      public function recovery($username)
      {
            $sql = "select * from customer where username='$username'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  $row = $result->fetch_assoc();
                  return $row;
            }
            return null;
      }

      public function newPassword($username, $password)
      {
            $sql = "update customer set userpassword='$password' where username='$username'";
            $this->db->query($sql);
      }

      public function signUp($name, $email, $username, $password, $phone)
      {
            if ($phone === "null") $phone = null;
            $stmt = $this->db->prepare("call addCustomer(?,?,?,?,?,@usedEmail,@usedUsername)");
            $stmt->bind_param("sssss", $name, $email, $phone, $username, $password);
            $stmt->execute();
            $stmt->close();
            $result = $this->db->query("select @usedEmail as email, @usedUsername as username");
            $row = $result->fetch_assoc();
            return $row;
      }

      public function __destruct()
      {
            $this->db->close();
      }
}
