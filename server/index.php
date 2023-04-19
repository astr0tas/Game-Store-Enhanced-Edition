      <?php
      // include required files
      require_once('router.php');
      require_once('controller/Admin_Controller.php');
      require_once('controller/Customer_Controller.php');
      require_once('cors.php');

      // instantiate router
      $router = new Router();

      // define routes
      // customer routes


      // admin routes
      $router->get("/admin/customer/getList", "AdminCustomerController@getCustomerList");
      $router->post("/admin/customer/find", "AdminCustomerController@findCustomer");
      $router->post("/admin/customer/delete", "AdminCustomerController@deleteCustomer");
      $router->post("/admin/customer/detail", "AdminCustomerController@customerDetail");
      $router->post("/admin/customer/detail/history", "AdminCustomerController@customerHistory");
      $router->post("/admin/customer/detail/edit", "AdminCustomerController@editCustomer");
      $router->get("/admin/game/list", "AdminCustomerController@getGameList");
      $router->post("/admin/game/delete", "AdminCustomerController@deleteGame");
      $router->post("/admin/game/find", "AdminCustomerController@findGame");

      // run router
      $router->run();
      ?>
