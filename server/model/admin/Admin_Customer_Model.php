<?php
class CustomerModel
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
            $sql = 'SELECT id,name,email,phone,total_spending from customer';
            $result = $this->db->query($sql);
            $arr = array();
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function find($data)
      {
            $arr = [];
            $sql = "SELECT id,name,email,phone,total_spending from customer where name like '%$data%'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        if (!in_array($row, $arr))
                              $arr[] = $row;
                  }
            }
            $data = explode('@', $data)[0];
            $sql = "SELECT id,name,email,phone,total_spending from customer where SUBSTRING_INDEX(email, '@', 1) like '%$data%'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        if (!in_array($row, $arr))
                              $arr[] = $row;
                  }
            }
            $data = $_POST["data"];
            $sql = "SELECT id,name,email,phone,total_spending from customer where phone LIKE '%$data%'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                        if (!in_array($row, $arr))
                              $arr[] = $row;
                  }
            }
            return $arr;
      }

      public function delete($array)
      {
            $sql = "";
            foreach ($array as $elem) {
                  $sql.="delete from customer where id='$elem'; ";
            }
            return $this->db->multi_query($sql);
      }

      public function detail($id)
      {
            $sql = "SELECT id,name,email,phone,total_spending, membership_rank, membership_discount,image,dob from customer where id= '$id'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  return $result->fetch_assoc();
            }
      }

      public function history($id)
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

      public function update($id, $rank, $discount, $email, $phone)
      {
            $sql = "";
            if ($phone === "null")
                  $sql = "update customer 
            set membership_rank = '$rank', membership_discount = '$discount',email='$email',phone=null
            where id='$id'";
            else
                  $sql = "update customer 
            set membership_rank = '$rank', membership_discount = '$discount',email='$email',phone='$phone'
            where id='$id'";
            return $this->db->query($sql);
      }

      public function getTopCustomers()
      {
            $sql = "select id,name,email,total_spending from customer order by total_spending desc, name limit 10";
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
