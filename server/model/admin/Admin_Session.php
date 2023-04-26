      <?php
      function startAdminSession($id)
      {
            // Start session
            session_start();
            // Set session variables for this $id
            $_SESSION['id'] = $id;

            // Get the session cookie
            $session_id = session_id();

            // Return session data to the client
            echo json_encode(array("name" => "PHPADMINSESSID", "value" => $session_id));
      }

      function killAdminSession($id) // Destroy a specific session
      {
            ini_set('session.use_cookies', 0);
            session_id($id);
            session_start();
            session_unset();
            session_destroy();
            return $_SESSION;
      }
      ?>