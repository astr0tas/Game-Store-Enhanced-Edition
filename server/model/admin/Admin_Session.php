      <?php
      function startAdminSession($id)
      {
            // Set the session cookie's name
            ini_set('session.name', 'PHPADMINSESSID');
            // Set the session cookie's attributes: expires - path - domain - secure - httpOnly
            session_set_cookie_params(3 * 24 * 60 * 60, "/admin", null, false, false);
            // Start session
            session_start();
            // Set session variables for this $id
            $_SESSION['id'] = $id;
      }

      function endAdminSession($id) // Destroy a specific session
      {
            ini_set('session.use_cookies', 0);
            session_id($id);
            session_start();
            session_unset();
            session_destroy();
      }
      ?>