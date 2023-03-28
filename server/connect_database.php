<?php
$servername = "localhost";
      $username = "owner";
      $password = "owner123";
      $database = "game_store";
      $port = "3306";

      // Create connection
      $conn = new mysqli($servername, $username, $password, $database, $port);

      // Check connection
      if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
      }
?>