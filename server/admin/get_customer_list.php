
  <?php
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Headers: *");
      header('Access-Control-Allow-Methods:  POST, GET');

      require("../connect_database.php");
      $sql = "SELECT id,name,email,phone,total_spending from customer";
      $result = $conn->query($sql);

      $arr = [];
      if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                  $arr[] = $row;
            }
      }
      echo json_encode($arr);
      require("../close_connection.php");
      ?>