<?php


    require __DIR__. '/vendor/autoload.php';
    include_once(__DIR__ . '/src/Autoloader.php');
    \Autoloader::register();
    define('CONFIG_PATH', __DIR__);
    
    if (session_status() !== PHP_SESSION_ACTIVE) session_start();
    \Controller\Controller::regenerate_session();

    $router = new AltoRouter();
    
    $router->map('GET', '/', function () { echo "server is running"; });
    
    $router->map('GET', '/[*:controller]/[*:fn]', function ($controller, $fn) {
        $cls = '\Controller\\' . ucfirst($controller);
        if (class_exists($cls) && method_exists($cls, $fn))
        {
            $instance = new $cls();
             return \My_class\Config::send_JSON($instance->$fn());
        } 
        else require("forbidden.html");
    });
    
    
    $router->map('POST', '/[*:controller]/[*:fn]', function ($controller, $fn) {
        $cls = '\Controller\\' . ucfirst($controller);
        if (class_exists($cls) && method_exists($cls, $fn))
        {
            $instance = new $cls();
             return \My_class\Config::send_JSON($instance->$fn($_POST));
        } 
        else require("forbidden.html");
    });

    $match = $router->match();
    if ($match && is_callable($match['target'])) {
        call_user_func_array($match['target'], $match['params']);
    } else {
        header("HTTP/1.0 404 Not Found");
    }

