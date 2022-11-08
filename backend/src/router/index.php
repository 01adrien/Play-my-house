<?php
    require '../../vendor/autoload.php';
    include_once('../Autoloader.php');
    \Autoloader::register();


    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, origin");

    

    Flight::route('POST /auth/signin', function() {
        $post = json_decode(file_get_contents("php://input"));
        echo json_encode(\Controller\User::signin((array)$post));
    });

    Flight::route('POST /auth/login', function() {
        $post = json_decode(file_get_contents("php://input"));
        echo json_encode(\Controller\User::login((array)$post));
    });

    Flight::route('GET /users/picture/@id', function($id){
        // if (!\Controller\Controller::check_for_valid_user()) return false;
        echo json_encode(\Controller\User_picture::get_picture(['id' => $id]));
    });

    Flight::route('POST /users/upload', function(){
        $ext = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
        if ($ext === 'jpeg' || $ext == 'jpg') {
            echo json_encode(\Controller\User_picture::upload_picture());
        }
        
    });
    

    Flight::start();
    
    ?>