
  <?php
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Headers: *");
      header('Access-Control-Allow-Methods:  POST, GET');

      require("../connect_database.php");
      $data = $_POST["data"];
      $sql = "SELECT name,id,price,discount,ratings,count(activation_code.game_id) as solds from game join activation_code on game_id=id where status='used' and name like '%$data%' group by name,id,price,discount,ratings order by name";
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