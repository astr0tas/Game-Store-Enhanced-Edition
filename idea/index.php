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
      $router->get("/customer/getList","AdminCustomerController@getList");
      $router->post("/customer/find","AdminCustomerController@find");


      // $router->get('/', 'HomeController@index');
      // $router->get('/users', 'UserController@index');
      // $router->post('/users', 'UserController@store');
      // $router->put('/users/:id', 'UserController@update');
      // $router->delete('/users/:id', 'UserController@destroy');

      // run router
      $router->run();
      ?>
