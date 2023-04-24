<?php
require_once(__DIR__ . '\\..\\model\\customer\\Customer_Game_Model.php');

class CustomerController
{
      private $game_model;

      public function __construct()
      {
            $this->game_model = new CustomerGameModel();
      }

      public function getBestSeller()
      {
            $arr = $this->game_model->getBestSeller();
            echo json_encode($arr);
      }
}
