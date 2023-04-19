
  <?php
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Headers: *");
      header('Access-Control-Allow-Methods:  POST, GET');

      require("../connect_database.php");
      $arr = [];
      $data = $_POST["data"];
      $sql = "SELECT id,name,email,phone,total_spending from customer where name like '%$data%'";
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                  if (!in_array($row, $arr))
                        $arr[] = $row;
            }
      }
      $data= explode('@', $data)[0];
      $sql = "SELECT id,name,email,phone,total_spending from customer where SUBSTRING_INDEX(email, '@', 1) like '%$data%'";
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                  if (!in_array($row, $arr))
                        $arr[] = $row;
            }
      }
      $data = $_POST["data"];
      $sql = "SELECT id,name,email,phone,total_spending from customer where phone LIKE '%$data%'";
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                  if (!in_array($row, $arr))
                        $arr[] = $row;
            }
      }
      echo json_encode($arr);
      require("../close_connection.php");
      ?>