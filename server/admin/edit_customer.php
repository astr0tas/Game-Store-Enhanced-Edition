<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods:  POST, GET');

require("../connect_database.php");
$id = $_POST["id"];
$rank = $_POST["rank"];
$discount = $_POST["discount"];
$sql = "update customer 
set membership_rank = '$rank', membership_discount = '$discount'
where id='$id'";
$result = $conn->query($sql);

require("../close_connection.php");
?>