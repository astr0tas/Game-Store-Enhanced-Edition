
  <?php
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Headers: *");
      header('Access-Control-Allow-Methods:  POST, GET');

      // $servername = "localhost";
      // $username = "owner";
      // $password = "owner123";
      // $database = "game_store";
      // $port = "3306";

      // // Create connection
      // $conn = new mysqli($servername, $username, $password, $database, $port);

      // // Check connection
      // if ($conn->connect_error) {
      //       die("Connection failed: " . $conn->connect_error);
      // }
      require("../connect_database.php");
      $sql = $conn->prepare("UPDATE customer SET userpassword=? where username=?");
      $sql->bind_param("ss", $_POST['password'], $_POST['username']);
      if ($sql->execute() === TRUE) {
            echo "Password updated successfully";
      } else {
            echo "Error updating Password: " . $conn->error;
      }
      $sql->close();
      require("../close_connection.php");
      //$conn->close();
      ?>