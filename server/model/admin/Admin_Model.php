<?php
class AdminModel
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
            $sql = "select * from admin where username='$username' and userpassword='$password'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  $row = $result->fetch_assoc();
                  return $row;
            }
            return null;
      }

      public function recovery($username)
      {
            $sql = "select * from admin where username='$username'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  $row = $result->fetch_assoc();
                  return $row;
            }
            return null;
      }

      public function newPassword($username, $password)
      {
            $sql = "update admin set userpassword='$password' where username='$username'";
            $this->db->query($sql);
      }

      public function myself()
      {
            ini_set('session.use_cookies', 0);
            session_id($_COOKIE['PHPADMINSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $sql = "select name,email,phone,address,username from admin where id='$id'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  $row = $result->fetch_assoc();
                  return $row;
            }
            return null;
      }

      public function updateMySelf($name, $email, $phone, $password, $address)
      {
            ini_set('session.use_cookies', 0);
            session_id($_COOKIE['PHPADMINSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $address = $address === "null" ? null : $address;
            if ($password === "null") {
                  $stmt = $this->db->prepare("update admin set name='$name',email='$email',phone='$phone',address=? where id='$id'");
                  $stmt->bind_param("s", $address);
            } else {
                  $stmt = $this->db->prepare("update admin set name='$name',email='$email',userpassword='$password',phone='$phone',address=? where id='$id'");
                  $stmt->bind_param("s", $address);
            }
            return $stmt->execute();
      }

      public function __destruct()
      {
            $this->db->close();
      }
}
