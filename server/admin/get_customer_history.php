<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods:  POST, GET');

require("../connect_database.php");
$data = $_POST["data"];
$sql = "select game_name, code, date, price, method from purchase_history 
join purchase_history_description on description_id = id and customer_id='$data'
join game on game_name = name order by date desc , game_name asc;";
$result = $conn->query($sql);

$arr = [];
if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
            $arr[] = $row;
      }
}

echo json_encode($arr);
require("../close_connection.php");
