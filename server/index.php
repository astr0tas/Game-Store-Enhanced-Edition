      <?php
      // Include required files
      require_once('router.php');
      require_once('cors.php');

      // Instantiate router
      $router = new Router();

      // Define routes
      ################################## General routes ##################################


      ################################## Customer routes ##################################
      /* Authentication */
      $router->post("/login", "CustomerController@login");
      $router->post("/recovery", "CustomerController@recovery");
      $router->post("/newPassword", "CustomerController@newPassword");
      $router->post("/signUp", "CustomerController@signUp");

      /* Home */

      /* Game List */
      $router->post("/getGames", "CustomerController@getGames");

      /* Wish List */
      $router->post("/isAddedToWishlist", "CustomerController@isAddedToWishlist");
      $router->post("/addToWishlist", "CustomerController@addToWishlist");
      $router->post("/removeFromWishlist", "CustomerController@removeFromWishlist");

      /* Shopping cart */
      $router->post("/isAddedToCart", "CustomerController@isAddedToCart");
      $router->post("/addToCart", "CustomerController@addToCart");
      $router->post("/removeFromCart", "CustomerController@removeFromCart");


      $router->get("/getBestSeller", "CustomerController@getBestSeller");
      $router->get("/logout", "CustomerController@logout");
      $router->get("/myself", "CustomerController@myself");
      $router->get("/myself/history", "CustomerController@myHistory");
      $router->get("/getCart", "CustomerController@getCart");

      $router->post("/myself/edit", "CustomerController@updateMySelf");
      $router->post("/gameStatus", "CustomerController@gameStatus");
      $router->post("/getWishlist", "CustomerController@getWishlist");
      $router->post("/findWishlist", "CustomerController@findWishlist");
      $router->post("/displayCart", "CustomerController@displayCart");
      $router->post("/getCategory", "CustomerController@getCategory");
      $router->post("/buyGame", "CustomerController@buyGame");
      $router->post("/product", "CustomerController@product");

      ################################## Admin routes ##################################
      /* Authentication */
      $router->post("/admin/login", "AdminController@login");
      $router->post("/admin/recovery", "AdminController@recovery");
      $router->post("/admin/newPassword", "AdminController@newPassword");
      $router->get("/admin/logout", "AdminController@logout");

      /* Info */
      $router->get("/admin/info", "AdminController@personalInfo");
      $router->post("/admin/info/edit", "AdminController@updatePersonalInfo");

      /* Home */

      /* Customer */
      $router->get("/admin/customer/getList", "AdminController@getCustomerList");
      $router->post("/admin/customer/find", "AdminController@findCustomer");
      $router->post("/admin/customer/delete", "AdminController@deleteCustomer");
      $router->post("/admin/customer/detail", "AdminController@customerDetail");
      $router->post("/admin/customer/detail/history", "AdminController@customerHistory");
      $router->post("/admin/customer/detail/update", "AdminController@updateCustomer");

      /* Game */
      $router->get("/admin/game/getList", "AdminController@getGameList");
      $router->post("/admin/game/find", "AdminController@findGame");
      $router->post("/admin/game/getSales","AdminController@getGameSales");
      $router->post("/admin/game/gameCategory", "AdminController@getGameCategory");
      $router->post("/admin/game/delete", "AdminController@deleteGame");
      $router->post("/admin/game/deactivate", "AdminController@deactivateGame");
      $router->post("/admin/game/activate", "AdminController@activateGame");
      $router->post("/admin/game/detail", "AdminController@getGameDetail");
      $router->post("/admin/game/status", "AdminController@getGameStatus");
      $router->get("/admin/game/categories", "AdminController@getCategories");
      $router->post("/admin/game/create", "AdminController@createGame");
      $router->post("/admin/game/addCode", "AdminController@addCode");
      $router->post("/admin/game/addTag", "AdminController@addTag");
      $router->post("/admin/game/update", "AdminController@updateGame");

      /* Statistic */

      // Run router
      $router->run();
      ?>
