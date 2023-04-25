      <?php
      function startSession($id)
      {
            // Start session
            session_start();
            // Set session variables for this $id
            // if (!isset($_SESSION[$id])) {
            //       $_SESSION[$id] = array();
            // }
            // $_SESSION[$id]['user_id'] = $id;
            $_SESSION['id'] = $id;

            // Get the session cookie
            $session_name = session_name();
            $session_id = session_id();

            // Return session data to the client
            echo json_encode(array("name" => $session_name, "value" => $session_id));
      }

      function kill($id) // Destroy a specific session
      {
            session_id($id);
            session_start();
            session_unset();
            session_destroy();
            return $_SESSION;
      }
      ?>