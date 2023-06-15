<?php
require_once(__DIR__ . '\\..\\model\\customer\\Customer_Game_Model.php');
require_once(__DIR__ . '\\..\\model\\customer\\Customer_Model.php');
require_once(__DIR__ . '\\..\\model\\customer\\Customer_Session.php');

class CustomerController
{
      private $game_model;
      private $customer_model;

      public function __construct()
      {
            $this->game_model = new CustomerGameModel();
            $this->customer_model = new CustomerSelfModel();
      }

      /* Authentication */
      public function login()
      {
            $username = $_POST['username'];
            $password = $_POST['password'];
            $arr = $this->customer_model->login($username, $password);
            if ($arr) {
                  startSession($arr['id']);
            } else
                  echo json_encode(false);
      }

      public function logout()
      {
            endSession($_COOKIE['PHPSESSID']);
            json_encode(array("message" => "success"));
      }

      public function recovery()
      {
            $username = $_POST['username'];
            $arr = $this->customer_model->recovery($username);
            echo json_encode($arr ? true : false);
      }

      public function newPassword()
      {
            $username = $_POST['username'];
            $password = $_POST['password'];
            $this->customer_model->newPassword($username, $password);
            echo json_encode(array("message" => "success"));
      }

      public function signUp()
      {
            $name = $_POST['name'];
            $email = $_POST['email'];
            $username = $_POST['username'];
            $password = $_POST['password'];
            $phone = $_POST['phone']==='null'?null:$_POST['phone'];
            echo json_encode($this->customer_model->signUp($name, $email, $username, $password, $phone));
      }

      /* Home */

      /* Game List */
      public function getGames()
      {
            $name=$_POST['name']==='null'?null:$_POST['name'];
            if($name)
                  $result = $this->game_model->getGames($name);
            else
                  $result = $this->game_model->getGames();
            echo json_encode($result);
      }

      /* Wish List */
      public function isAddedToWishlist()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $game_id = $_POST['id'];
            $result = $this->game_model->isAddedToWishlist($id, $game_id);
            echo json_encode($result ? true : false);
      }

      public function addToWishlist()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $game_id = $_POST['id'];
            $result = $this->game_model->addToWishlist($id, $game_id);
            echo json_encode(array("message" => $result ? "success" : "failed"));
      }

      public function removeFromWishlist()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $game_id = $_POST['id'];
            $result = $this->game_model->removeFromWishlist($id, $game_id);
            echo json_encode(array("message" => $result ? "success" : "failed"));
      }

      /* Shopping cart */
      public function isAddedToCart()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $game_id = $_POST['id'];
            $result = $this->game_model->isAddedToCart($id, $game_id);
            echo json_encode($result ? true : false);
      }

      public function addToCart()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $game_id = $_POST['id'];
            $result = $this->game_model->addToCart($id, $game_id);
            echo json_encode(array("message" => $result ? "success" : "failed"));
      }

      public function removeFromCart()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $game_id = $_POST['id'];
            $result = $this->game_model->removeFromCart($id, $game_id);
            echo json_encode(array("message" => $result ? "success" : "failed"));
      }





      public function getBestSeller()
      {
            $arr = $this->game_model->getBestSeller();
            echo json_encode($arr);
      }

      public function myself()
      {
            echo json_encode($this->customer_model->myself());
      }

      public function myHistory()
      {
            echo json_encode($this->customer_model->myHistory());
      }

      public function updateMySelf()
      {
            $name = $_POST['name'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $password = $_POST['password'];
            $result = $this->customer_model->updateMySelf($name, $email, $phone, $password);
            echo json_encode(array("message" => $result ? "success" : "failed"));
      }

      public function gameStatus()
      {
            $id = $_POST['id'];
            $arr = $this->game_model->gameStatus($id);
            echo json_encode($arr ? true : false);
      }

      public function getWishlist()
      {
            $limit = $_POST['limit'];
            $offset = $_POST['offset'];
            $result = $this->game_model->getWishlist($limit, $offset);
            echo json_encode($result);
      }

      public function findWishlist()
      {
            $name = $_POST['name'];
            $limit = $_POST['limit'];
            $offset = $_POST['offset'];
            $result = $this->game_model->findWishlist($name, $limit, $offset);
            echo json_encode($result);
      }

      public function getCart()
      {
            $result = $this->game_model->getCart();
            echo json_encode($result);
      }

      public function displayCart()
      {
            $offset = $_POST['offset'];
            $result = $this->game_model->displayCart($offset);
            echo json_encode($result);
      }

      public function getCategory()
      {
            $id=$_POST['id'];
            $result = $this->game_model->getCategory($id);
            echo json_encode($result);
      }

      public function buyGame()
      {
            $games=$_POST['games'];
            $method=$_POST['method'];
            $result = $this->game_model->buyGame($games,$method);
            echo json_encode(array("message"=>$result?"success":"failed"));
      }

      public function product()
      {
            $offset = $_POST['offset'];
            $result = $this->game_model->product($offset);
            echo json_encode($result);
      }
}
