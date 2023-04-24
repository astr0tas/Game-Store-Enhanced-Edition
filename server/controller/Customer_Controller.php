<?php
require_once(__DIR__ . '\\..\\model\\customer\\Customer_Game_Model.php');
require_once(__DIR__ . '\\..\\model\\customer\\Customer_Model.php');

class CustomerController
{
      private $game_model;
      private $customer_model;

      public function __construct()
      {
            $this->game_model = new CustomerGameModel();
            $this->customer_model = new CustomerSelfModel();
      }

      public function getBestSeller()
      {
            $arr = $this->game_model->getBestSeller();
            echo json_encode($arr);
      }

      public function login()
      {
            $username = $_POST['username'];
            $password = $_POST['password'];
            $arr = $this->customer_model->login($username, $password);
            echo json_encode($arr ? true : false);
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
            $phone = $_POST['phone'];
            echo json_encode($this->customer_model->signUp($name, $email, $username, $password, $phone));
      }
}
