<?php
class Router
{
  private $routes = array();

  public function get($path, $action)
  {
    $this->routes['GET'][$path] = $action;
  }

  public function post($path, $action)
  {
    $this->routes['POST'][$path] = $action;
  }

  public function put($path, $action)
  {
    $this->routes['PUT'][$path] = $action;
  }

  public function delete($path, $action)
  {
    $this->routes['DELETE'][$path] = $action;
  }

  public function run()
  {
    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $action = $this->routes[$method][$path] ?? false;
    if ($action) {
      list($controller_name, $method_name) = explode('@', $action);
      $controller = new $controller_name();
      $controller->$method_name();
    } else {
      header('HTTP/1.1 404 Not Found');
      echo '404 Not Found';
    }
  }
}
