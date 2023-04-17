
  <?php
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Headers: *");
      header('Access-Control-Allow-Methods:  POST, GET,DELETE');

      require("../connect_database.php");

      $id = $_POST['id'];
      $sql = "DELETE FROM customer WHERE id='$id'";
      $result = $conn->query($sql);
      if ($result === TRUE) {
            echo "Customer deleted successfully";
      } else {
            echo "Error deleteting customer: " . $conn->error;
      }

      require("../close_connection.php");
      ?>