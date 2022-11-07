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
        $post = (array)$post;
        echo json_encode(\Controller\User::signin($post));
    });

    Flight::route('POST /auth/login', function() {
        $post = json_decode(file_get_contents("php://input"));
        $post = (array)$post;
        echo json_encode(\Controller\User::login($post));
    });

    Flight::route('POST /users', function() {
        $post = json_decode(file_get_contents("php://input"));
        $post = (array)$post;
        echo json_encode(\Controller\User::create_update($post, "UPDATE"));
    });

    Flight::route('GET /users/picture-name/@id', function($id){
        
        $URI = \Controller\User_picture::get_picture_URI(['id' => $id]);
        $name = pathinfo($URI->URI);
        echo json_encode($name['filename']);
    
    });

    Flight::route('GET /user/picture/@name', function($name) {
        
        $path = "/home/adrien/Bureau/titre_pro/projet/backend/public/pictures/users/" . $name . ".png";
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        /*
        $img = imagecreatefrompng($path_image);
        header("Content-Type: image/png");
        imagepng($img);
        imagedestroy($img);
        */
        echo $base64;
    });

    Flight::start();
    
    ?>