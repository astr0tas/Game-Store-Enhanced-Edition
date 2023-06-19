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

      /* Authentication */

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

      public function signUp($name, $email, $username, $password, $phone, $dob)
      {
            $stmt = $this->db->prepare("call addCustomer(?,?,?,?,?,?,@usedEmail,@usedUsername)");
            $stmt->bind_param("ssssss", $name, $email, $phone, $dob, $username, $password);
            $stmt->execute();
            $stmt->close();
            $result = $this->db->query("select @usedEmail as email, @usedUsername as username");
            $row = $result->fetch_assoc();
            return $row;
      }

      /* Personal Infomation */

      public function getInfo($id)
      {
            $sql = "SELECT name,email,phone,total_spending,membership_rank,membership_discount,username,image,dob from customer where id= '$id'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  return $result->fetch_assoc();
            }
      }

      public function getHistory($id)
      {
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

      public function updateInfo($id, $name, $email, $phone, $password, $image, $dob)
      {
            $stmt = $this->db->prepare("CALL updateCustomerInfo(?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssssss", $id, $name, $email, $phone, $password, $image, $dob);
            return $stmt->execute();
      }

      public function getDiscount($id)
      {
            $sql = "select membership_discount from customer where id='$id'";
            $result = $this->db->query($sql);
            return $result->fetch_assoc();
      }

      public function __destruct()
      {
            $this->db->close();
      }
}
