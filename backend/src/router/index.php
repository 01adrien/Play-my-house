<?php
    require '../../vendor/autoload.php';
    include_once('../Autoloader.php');
    \Autoloader::register();
    
    Flight::route('GET /users', function(){
        echo json_encode(\Controller\User::get_all());
    });

    Flight::route('GET /users/@id', function($id){
        echo json_encode(\Controller\User::get_one(['id' => $id]));
    });
    
    Flight::start();
    
    ?>