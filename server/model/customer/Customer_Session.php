      <?php
      function startSession($id)
      {
            // Set the session cookie's attributes: expires - path - domain - secure - httpOnly
            session_set_cookie_params(3 * 24 * 60 * 60, "/", null, false, false);
            // Start session
            session_start();
            $_SESSION['id'] = $id;
      }

      function endSession($id) // Destroy a specific session
      {
            session_id($id);
            session_start();
            session_unset();
            session_destroy();
            return $_SESSION;
      }
      ?>