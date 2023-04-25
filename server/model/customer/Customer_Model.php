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

      public function myself()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $sql = "SELECT name,email,phone,total_spending,membership_rank,membership_discount,username from customer where id= '$id'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  return $result->fetch_assoc();
            }
      }

      public function myHistory()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $sql = "select name, code, date, price, method from purchase_history 
            join purchase_history_description on description_id = purchase_history_description.id and customer_id='$id'
            join game on game_id = game.id order by date desc,name asc";
            $result = $this->db->query($sql);
            $arr = [];
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function updateMySelf($name, $email, $phone, $password)
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $sql = "";
            if ($password === "null") {
                  if ($phone === "null")
                        $sql = "update customer set name='$name',email='$email',phone=null where id='$id'";
                  else
                        $sql = "update customer set name='$name',email='$email',phone='$phone' where id='$id'";
            } else {
                  if ($phone === "null")
                        $sql = "update customer set name='$name',email='$email',phone=null,userpassword='$password' where id='$id'";
                  else
                        $sql = "update customer set name='$name',email='$email',phone='$phone',userpassword='$password' where id='$id'";
            }
            return $this->db->query($sql);
      }

      public function __destruct()
      {
            $this->db->close();
      }
}
