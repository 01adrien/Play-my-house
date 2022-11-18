<?php
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Accept, Accept-Language, X-Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$http_origin = $_SERVER['HTTP_ORIGIN']??null;
if ($http_origin === "http://127.0.0.1:1234" ) {
    header("Access-Control-Allow-Origin: $http_origin");
}

session_start();

require __DIR__. '../vendor/autoload.php';
include_once(__DIR__ . '../src/Autoloader.php');
\Autoloader::register();

define('CONFIG_PATH', __DIR__);

$router = new AltoRouter();

$router->map('GET', '/', function () { echo json_encode($_SESSION);});


$router->map('GET', '/[*:controller]/[*:function]', function ($controller, $function) {
    $contr = '\Controller\\' . ucfirst($controller);
    $instance = new $contr();
    \My_class\Config::send_JSON($instance->$function());
    
});


$router->map('POST', '/[*:controller]/[*:function]', function ($controller, $function) {
    $contr = '\Controller\\' . ucfirst($controller);
    $instance = new $contr();
    \My_class\Config::send_JSON($instance->$function($_POST));
});
 

$match = $router->match();
if ($match && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
} else {
    header("HTTP/1.0 404 Not Found");
}

