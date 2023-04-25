<?php
require_once(__DIR__ . '\\..\\model\\admin\\Admin_Customer_Model.php');
require_once(__DIR__ . '\\..\\model\\admin\\Admin_Game_Model.php');
require_once(__DIR__ . '\\..\\model\\admin\\Admin_Model.php');
require_once(__DIR__ . '\\..\\model\\admin\\Admin_Session.php');

class AdminController
{
      private $customer_model;
      private $game_model;
      private $admin_model;

      public function __construct()
      {
            $this->customer_model = new CustomerModel();
            $this->game_model = new GameModel();
            $this->admin_model = new AdminModel();
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
            $email = $_POST["email"];
            $phone = $_POST["phone"];
            $result = $this->customer_model->edit($id, $rank, $discount, $email, $phone);
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

      public function getCategories()
      {
            $arr = $this->game_model->getCategories();
            echo json_encode($arr);
      }

      public function createGame()
      {
            $picture1 = null;
            $picture2 = null;
            $picture3 = null;
            $picture4 = null;
            if (isset($_FILES["picture1"])) {
                  move_uploaded_file($_FILES["picture1"]["tmp_name"], $_FILES["picture1"]["tmp_name"]);
                  $picture1 = $_FILES["picture1"]["tmp_name"];
                  $picture1 = str_replace("\\", "/", $picture1);
            }
            if (isset($_FILES["picture2"])) {
                  move_uploaded_file($_FILES["picture2"]["tmp_name"], $_FILES["picture2"]["tmp_name"]);
                  $picture2 = $_FILES["picture2"]["tmp_name"];
                  $picture2 = str_replace("\\", "/", $picture2);
            }
            if (isset($_FILES["picture3"])) {
                  move_uploaded_file($_FILES["picture3"]["tmp_name"], $_FILES["picture3"]["tmp_name"]);
                  $picture3 = $_FILES["picture3"]["tmp_name"];
                  $picture3 = str_replace("\\", "/", $picture3);
            }
            if (isset($_FILES["picture4"])) {
                  move_uploaded_file($_FILES["picture4"]["tmp_name"], $_FILES["picture4"]["tmp_name"]);
                  $picture4 = $_FILES["picture4"]["tmp_name"];
                  $picture4 = str_replace("\\", "/", $picture4);
            }

            $description = null;
            $minSpec = null;
            $recSpec = null;
            if (isset($_FILES["description"])) {
                  move_uploaded_file($_FILES["description"]["tmp_name"], $_FILES["description"]["tmp_name"]);
                  $description = file_get_contents($_FILES["description"]["tmp_name"]) === "" ? null : file_get_contents($_FILES["description"]["tmp_name"]);
            }
            if (isset($_FILES["minSpec"])) {
                  move_uploaded_file($_FILES["minSpec"]["tmp_name"], $_FILES["minSpec"]["tmp_name"]);
                  $minSpec = file_get_contents($_FILES["minSpec"]["tmp_name"]) === "" ? null : file_get_contents($_FILES["minSpec"]["tmp_name"]);
            }
            if (isset($_FILES["recSpec"])) {
                  move_uploaded_file($_FILES["recSpec"]["tmp_name"], $_FILES["recSpec"]["tmp_name"]);
                  $recSpec = file_get_contents($_FILES["recSpec"]["tmp_name"]) === "" ? null : file_get_contents($_FILES["recSpec"]["tmp_name"]);
            }

            $name = $_POST['name'];
            $price = $_POST['price'] === "null" ? null : floatval($_POST['price']);
            $discount = $_POST['discount'] === "null" ? null : floatval($_POST['discount']);

            $result = $this->game_model->create($name, $price, $discount, $description, $minSpec, $recSpec, $picture1, $picture2, $picture3, $picture4);
            echo json_encode($result);

            unlink($_FILES["picture1"]["tmp_name"]);
            if (isset($_FILES["picture2"])) unlink($_FILES["picture2"]["tmp_name"]);
            if (isset($_FILES["picture3"])) unlink($_FILES["picture3"]["tmp_name"]);
            if (isset($_FILES["picture4"])) unlink($_FILES["picture4"]["tmp_name"]);

            if (isset($_FILES["description"])) unlink($_FILES["description"]["tmp_name"]);
            if (isset($_FILES["minSpec"])) unlink($_FILES["minSpec"]["tmp_name"]);
            if (isset($_FILES["recSpec"])) unlink($_FILES["recSpec"]["tmp_name"]);
      }

      public function addCode()
      {
            $code = null;
            if (isset($_FILES["codes"])) {
                  move_uploaded_file($_FILES["codes"]["tmp_name"], $_FILES["codes"]["tmp_name"]);
                  $code = explode(", ", file_get_contents($_FILES["codes"]["tmp_name"]));
            }
            $result = $this->game_model->addCode($_POST['id'], $code);
            echo json_encode(array("message" => $result ? "success" : "failed"));
            if (isset($_FILES["codes"])) unlink($_FILES["codes"]["tmp_name"]);
      }

      public function addTag()
      {
            $tag = ($_POST['tag'] === "" || $_POST['tag'] === "null") ? null : explode(",", $_POST['tag']);
            $result = $this->game_model->addTag($_POST['id'], $tag);
            echo json_encode(array("message" => $result ? "success" : "failed"));
      }

      public function updateGetGameDetail()
      {
            $result = $this->game_model->updateGetGameDetail($_POST['id']);
            echo json_encode($result);
      }

      public function getGameCategory()
      {
            $result = $this->game_model->getGameCategory($_POST['id']);
            echo json_encode($result);
      }

      public function updateGame()
      {
            $id = $_POST['id'];

            $picture1 = null;
            $picture2 = null;
            $picture3 = null;
            $picture4 = null;
            if (isset($_FILES["picture1"])) {
                  move_uploaded_file($_FILES["picture1"]["tmp_name"], $_FILES["picture1"]["tmp_name"]);
                  $picture1 = $_FILES["picture1"]["tmp_name"];
                  $picture1 = str_replace("\\", "/", $picture1);
            }
            if (isset($_FILES["picture2"])) {
                  move_uploaded_file($_FILES["picture2"]["tmp_name"], $_FILES["picture2"]["tmp_name"]);
                  $picture2 = $_FILES["picture2"]["tmp_name"];
                  $picture2 = str_replace("\\", "/", $picture2);
            }
            if (isset($_FILES["picture3"])) {
                  move_uploaded_file($_FILES["picture3"]["tmp_name"], $_FILES["picture3"]["tmp_name"]);
                  $picture3 = $_FILES["picture3"]["tmp_name"];
                  $picture3 = str_replace("\\", "/", $picture3);
            }
            if (isset($_FILES["picture4"])) {
                  move_uploaded_file($_FILES["picture4"]["tmp_name"], $_FILES["picture4"]["tmp_name"]);
                  $picture4 = $_FILES["picture4"]["tmp_name"];
                  $picture4 = str_replace("\\", "/", $picture4);
            }

            $description = null;
            $minSpec = null;
            $recSpec = null;
            if (isset($_FILES["description"])) {
                  move_uploaded_file($_FILES["description"]["tmp_name"], $_FILES["description"]["tmp_name"]);
                  $description = file_get_contents($_FILES["description"]["tmp_name"]) === "" ? null : file_get_contents($_FILES["description"]["tmp_name"]);
            } else
                  $description = $_POST['description'] === "null" ? null : $_POST['description'];
            if (isset($_FILES["minSpec"])) {
                  move_uploaded_file($_FILES["minSpec"]["tmp_name"], $_FILES["minSpec"]["tmp_name"]);
                  $minSpec = file_get_contents($_FILES["minSpec"]["tmp_name"]) === "" ? null : file_get_contents($_FILES["minSpec"]["tmp_name"]);
            } else
                  $minSpec = $_POST['minSpec'] === "null" ? null : $_POST['minSpec'];
            if (isset($_FILES["recSpec"])) {
                  move_uploaded_file($_FILES["recSpec"]["tmp_name"], $_FILES["recSpec"]["tmp_name"]);
                  $recSpec = file_get_contents($_FILES["recSpec"]["tmp_name"]) === "" ? null : file_get_contents($_FILES["recSpec"]["tmp_name"]);
            } else
                  $recSpec = $_POST['recSpec'] === "null" ? null : $_POST['recSpec'];

            $name = $_POST['name'];
            $price = $_POST['price'] === "null" ? null : floatval($_POST['price']);
            $discount = $_POST['discount'] === "null" ? null : floatval($_POST['discount']);

            $result = $this->game_model->update($id, $name, $price, $discount, $description, $minSpec, $recSpec, $picture1, $picture2, $picture3, $picture4);
            echo json_encode(array("message" => $result ? "success" : "failed"));

            if (isset($_FILES["picture1"])) unlink($_FILES["picture1"]["tmp_name"]);
            if (isset($_FILES["picture2"])) unlink($_FILES["picture2"]["tmp_name"]);
            if (isset($_FILES["picture3"])) unlink($_FILES["picture3"]["tmp_name"]);
            if (isset($_FILES["picture4"])) unlink($_FILES["picture4"]["tmp_name"]);

            if (isset($_FILES["description"])) unlink($_FILES["description"]["tmp_name"]);
            if (isset($_FILES["minSpec"])) unlink($_FILES["minSpec"]["tmp_name"]);
            if (isset($_FILES["recSpec"])) unlink($_FILES["recSpec"]["tmp_name"]);
      }

      public function getGameDetail()
      {
            $id = $_POST['id'];
            $arr = $this->game_model->getAllInfo($id);
            echo json_encode($arr);
      }

      public function getBestSeller()
      {
            $arr = $this->game_model->getBestSeller();
            echo json_encode($arr);
      }

      public function getGameStatus()
      {
            $id = $_POST['id'];
            $arr = $this->game_model->getGameStatus($id);
            echo json_encode($arr);
      }

      public function login()
      {
            $username = $_POST['username'];
            $password = $_POST['password'];
            $arr = $this->admin_model->login($username, $password);
            if ($arr) {
                  startAdminSession($arr['id']);
            } else
                  echo json_encode(false);
      }

      public function logout()
      {
            foreach ($_COOKIE as $name => $value) {
                  if ($name === "PHPSESSID") {
                        echo json_encode(killAdminSession($value));
                        break;
                  }
            }
      }

      public function recovery()
      {
            $username = $_POST['username'];
            $arr = $this->admin_model->recovery($username);
            echo json_encode($arr ? true : false);
      }

      public function newPassword()
      {
            $username = $_POST['username'];
            $password = $_POST['password'];
            $this->admin_model->newPassword($username, $password);
            echo json_encode(array("message" => "success"));
      }
}
