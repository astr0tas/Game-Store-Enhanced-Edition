<?php
require_once(__DIR__.'\\..\\model\\admin\\Admin_Customer_Model.php');
require_once(__DIR__.'\\..\\model\\admin\\Admin_Game_Model.php');
// require_once(__DIR__."\\..\\cors.php");

class AdminCustomerController
{
      private $customer_model;
      private $game_model;

      public function __construct()
      {
            $this->customer_model = new CustomerModel();
            $this->game_model=new GameModel();
      }

      public function getList() {
            $arr = $this->customer_model->getList();
            echo json_encode($arr);
      }

      public function find() {
            $data = $_POST["data"];
            $arr = $this->customer_model->find($data);
            echo json_encode($arr);
      }

      //   public function store() {
      //     $data = json_decode(file_get_contents('php://input'), true);
      //     $this->model->create($data);
      //     echo json_encode(['success' => true]);
      //   }

      //   public function update($id) {
      //     $data = json_decode(file_get_contents('php://input'), true);
      //     $this->model->update($id, $data);
      //     echo json_encode(['success' => true]);
      //   }

      //   public function destroy($id) {
      //     $this->model->delete($id);
      //     echo json_encode(['success' => true]);
      //   }
}
