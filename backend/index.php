<?php

// Autoload files using composer
require_once __DIR__ . '/vendor/autoload.php';

include_once(__DIR__ . '/src/Autoloader.php');
\Autoloader::register();

// Use this namespace
use Steampixel\Route;

// Add your first route
Route::add('/about', function() {
    $hfhfhf = \Controller\User_picture::get_picture(['id' => 7]);
    $path_image = "/home/adrien/Bureau/titre_pro/projet/backend/public/pictures/users/default.png";
    $img = imagecreatefrompng($path_image);
    header("Content-Type: image/png");
    imagepng($img);
});

// Run the router
Route::run('/');

?>