      <?php
      // Include required files
      require_once('router.php');
      require_once('cors.php');

      // Instantiate router
      $router = new Router();

      ################################## Customer routes ##################################
      /* Authentication */
      $router->post("/login", "CustomerController@login");
      $router->post("/recovery", "CustomerController@recovery");
      $router->post("/newPassword", "CustomerController@newPassword");
      $router->post("/signUp", "CustomerController@signUp");
      $router->get("/logout", "CustomerController@logout");
      /* Info */
      $router->get("/info", "CustomerController@getInfo");
      $router->get("/info/history", "CustomerController@getHistory");
      $router->post("/info/update", "CustomerController@updateInfo");
      $router->get("/info/discount", "CustomerController@getDiscount");
      /* Home */
      $router->get("/getBestSeller", "CustomerController@getBestSeller");
      /* Games */
      $router->post("/getGames", "CustomerController@getGames");
      $router->post("/game/status", "CustomerController@getGameStatus");
      $router->post("/game/gameCategory", "CustomerController@getGameCategory");
      $router->post("/game/detail", "CustomerController@getGameDetail");
      $router->post("/getWishlist", "CustomerController@getWishlist");
      /* Wish List */
      $router->post("/isAddedToWishlist", "CustomerController@isAddedToWishlist");
      $router->post("/addToWishlist", "CustomerController@addToWishlist");
      $router->post("/removeFromWishlist", "CustomerController@removeFromWishlist");
      $router->post("/getWishlist", "CustomerController@getWishlist");
      /* Shopping cart */
      $router->post("/isAddedToCart", "CustomerController@isAddedToCart");
      $router->post("/addToCart", "CustomerController@addToCart");
      $router->post("/removeFromCart", "CustomerController@removeFromCart");
      $router->get("/getCart", "CustomerController@getCart");
      $router->post("/adjustAmount", "CustomerController@adjustAmount");
      $router->post("/buyGame", "CustomerController@buyGame");
      $router->get("/getReceipt", "CustomerController@getReceipt");

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
      $router->get("/getDailySolds","AdminController@getDailySolds");
      $router->get("/getWeeklySolds","AdminController@getWeeklySolds");
      $router->get("/getMonthlySolds","AdminController@getMonthlySolds");
      $router->post("/latestTransaction","AdminController@latestTransaction");
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
      $router->post("/getOverall", "AdminController@getOverall");
      // Run router
      $router->run();
      ?>
