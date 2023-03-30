      <?php
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Headers: *");
      header('Access-Control-Allow-Methods:  POST, GET');

      require("../connect_database.php");
      $sql = "SELECT name,picture_1, price,count(*) as total_sale from game join activation_code on game.name=activation_code.game_name where status=\"used\"  group by name order by total_sale desc,name limit 5";
      $result = $conn->query($sql);
      $arr = [];
      if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                  $row['picture_1'] = unpack('c*', $row['picture_1']);
                  $arr[]=$row;
            }
      }
      echo json_encode($arr);
      require("../close_connection.php");
      ?>