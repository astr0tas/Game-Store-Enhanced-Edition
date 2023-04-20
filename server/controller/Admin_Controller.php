<?php
require_once(__DIR__ . '\\..\\model\\admin\\Admin_Customer_Model.php');
require_once(__DIR__ . '\\..\\model\\admin\\Admin_Game_Model.php');

class AdminController
{
      private $customer_model;
      private $game_model;

      public function __construct()
      {
            $this->customer_model = new CustomerModel();
            $this->game_model = new GameModel();
      }

      public function getCustomerList()
      {
            $arr = $this->customer_model->getList();
            echo json_encode($arr);
      }

      public function findCustomer()
      {
            $data = $_POST["data"];
            $arr = $this->customer_model->find($data);
            echo json_encode($arr);
      }

      public function deleteCustomer()
      {
            $data = $_POST["id"];
            $result = $this->customer_model->delete($data);
            echo json_encode(array("message" => $result ? "success" : "failed"));
      }

      public function customerDetail()
      {
            $data = $_POST["data"];
            $arr = $this->customer_model->detail($data);
            echo json_encode($arr);
      }

      public function customerHistory()
      {
            $data = $_POST["data"];
            $arr = $this->customer_model->history($data);
            echo json_encode($arr);
      }

      public function editCustomer()
      {
            $id = $_POST["id"];
            $rank = $_POST["rank"];
            $discount = $_POST["discount"];
            $result = $this->customer_model->edit($id, $rank, $discount);
            echo json_encode(array("message" => $result ? "success" : "failed"));
      }

      public function getGameList()
      {
            $arr = $this->game_model->getList();
            echo json_encode($arr);
      }

      public function deleteGame()
      {
            $data = $_POST["id"];
            $result = $this->game_model->delete($data);
            echo json_encode(array("message" => $result ? "success" : "failed"));
      }

      public function findGame()
      {
            $data = $_POST["data"];
            $arr = $this->game_model->find($data);
            echo json_encode($arr);
      }
}
