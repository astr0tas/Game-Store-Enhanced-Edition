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

      /*Authentication*/
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

      /* Personal infomation */

      public function personalInfo($id)
      {
            $sql = "select name,email,phone,address,username,image,dob from admin where id='$id'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  $row = $result->fetch_assoc();
                  return $row;
            }
            return null;
      }

      public function updatePersonalInfo($id,$name, $email, $phone, $address, $password, $image, $dob)
      {
            $stmt = $this->db->prepare("CALL updateAdminInfo(?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssssss", $id,$name, $email, $phone, $address, $password, $image, $dob);
            return $stmt->execute();
      }

      public function __destruct()
      {
            $this->db->close();
      }
}
