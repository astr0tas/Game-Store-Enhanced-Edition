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
            $port='3306';

            $this->db = new mysqli($host, $user, $password, $database,$port);
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

      public function delete($data)
      {
            $sql = "DELETE FROM customer WHERE id='$data'";
            $result = $this->db->query($sql);
            return $result;
      }

      public function detail($data)
      {
            $sql = "SELECT id,name,email,phone,total_spending, membership_rank, membership_discount from customer where id= '$data'";
            $result = $this->db->query($sql);
            if ($result->num_rows > 0) {
                  return $result->fetch_assoc();
            }
      }

      public function history($data)
      {
            $sql = "select name, code, date, price, method from purchase_history 
            join purchase_history_description on description_id = purchase_history_description.id and customer_id='$data'
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

      public function edit($id, $rank, $discount)
      {
            $sql = "update customer 
            set membership_rank = '$rank', membership_discount = '$discount'
            where id='$id'";
            return $this->db->query($sql);
      }

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
