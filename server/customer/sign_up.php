
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
      $sql = "SELECT email,username from customer";
      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                  if ($row['email'] == $_POST['email']) {
                        echo json_encode("email");
                        exit();
                  } else if ($row['username'] == $_POST['username']) {
                        echo json_encode("username");
                        exit();
                  }
            }
      }
      $id = "CUSTOMER01";
      $sql = "SELECT id from customer ORDER BY id DESC LIMIT 1";
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $id = ((int)substr($row['id'], 8)) + 1;
            if ($id < 10)
                  $id = "0" . strval($id);
            else
                  $id = strval($id);
            $id = "CUSTOMER" . $id;
      }
      $sql = $conn->prepare("INSERT INTO customer VALUES (?,?,?,?,0.0,'none',0,?,?)");
      $sql->bind_param("ssssss", $id, $_POST['name'], $_POST['email'], $_POST['phone'], $_POST['username'], $_POST['password']);
      $sql->execute();
      $sql->close();
      require("../close_connection.php");
      // $conn->close();
      ?>