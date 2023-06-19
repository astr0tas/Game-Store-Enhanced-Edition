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
            $phone = $_POST['phone'] === 'null' ? null : $_POST['phone'];
            $dob=$_POST['dob']==='null'?null:$_POST['dob'];
            echo json_encode($this->customer_model->signUp($name, $email, $username, $password, $phone, $dob));
      }

      /* Info */
      public function getInfo()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            echo json_encode($this->customer_model->getInfo($id));
      }

      public function getHistory()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            echo json_encode($this->customer_model->getHistory($id));
      }

      public function updateInfo()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];

            $name = $_POST['name'];
            $email = $_POST['email'];
            $phone = $_POST['phone'] === 'null' ? null : $_POST['phone'];
            $dob = $_POST['dob'] === 'null' ? null : $_POST['dob'];
            $password = $_POST['password'] === 'null' ? null : $_POST['password'];

            $image = null;
            $path = dirname(__FILE__);
            $path = dirname($path);
            $path = str_replace("\\", "/", $path);
            $path .= "/model/data/customers/$id";
            if (!is_dir($path)) {
                  mkdir($path, 0777);
                  chmod($path, 0777);
            }
            if (isset($_FILES["image"])) {
                  $image = $id . '/' . $_FILES["image"]['name'];
                  move_uploaded_file($_FILES["image"]["tmp_name"], $path . '/' . $_FILES["image"]['name']);
            }
            $result = $this->customer_model->updateInfo($id, $name, $email, $phone, $password, $image, $dob);
            echo json_encode(array("message" => $result ? "success" : "failed"));
      }

      public function getDiscount()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];

            $result = $this->customer_model->getDiscount($id);
            echo json_encode($result);
      }

      /* Home */
      public function getBestSeller()
      {
            $arr = $this->game_model->getBestSeller();
            echo json_encode($arr);
      }

      /* Games */
      public function getGames()
      {
            $name = $_POST['name'] === 'null' ? null : $_POST['name'];
            if ($name)
                  $result = $this->game_model->getGames($name);
            else
                  $result = $this->game_model->getGames();
            echo json_encode($result);
      }

      public function getGameCategory()
      {
            $id = $_POST['id'];
            $result = $this->game_model->getGameCategory($id);
            echo json_encode($result);
      }

      public function getGameStatus()
      {
            $id = $_POST['id'];
            $arr = $this->game_model->getGameStatus($id);
            echo json_encode($arr ? true : false);
      }

      public function getGameDetail()
      {
            $id = $_POST['id'];
            $arr = $this->game_model->getAllInfo($id);
            echo json_encode($arr);
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
            echo json_encode($result);
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

      public function getWishlist()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $name = $_POST['name'] === 'null' ? null : $_POST['name'];
            $result = $this->game_model->getWishlist($id, $name);
            echo json_encode($result);
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
            echo json_encode($result);
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

      public function getCart()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $result = $this->game_model->getCart($id);
            echo json_encode($result);
      }

      public function adjustAmount()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $gameID = $_POST['id'];
            $result = $this->game_model->adjustAmount($id, $gameID, $_POST['mode'], $_POST['mode'] === '3' ? $_POST['amount'] : null);
            echo json_encode($result);
      }

      public function buyGame()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $total = floatval($_POST['total']);
            $method = $_POST['method'];
            $result = $this->game_model->buyGame($id, $total, $method);
            echo json_encode($result);
      }

      public function getReceipt()
      {
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            $id = $_SESSION['id'];
            $result = $this->game_model->getReceipt($id);
            echo json_encode($result);
      }
}
