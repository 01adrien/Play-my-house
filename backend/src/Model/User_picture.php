<?php 

    namespace Model;

    include_once('../Autoloader.php');
    \Autoloader::register();

    class User_picture extends \Model\Table {

        protected static $table = "users_pictures";
       
        public static function get_picture_from_FS($post) {

            /*
            $path_image = __DIR__.'/default.png';

            $imgPng = imageCreateFromPng($path_image);

            header("Content-type: image/png");
            imagePng($imgPng); 
            */
            // Set the vertices of polygon
            $image = imagecreatetruecolor(400, 400);
        $white = imagecolorallocate($image, 255, 255, 255);
        $black = imagecolorallocate($image, 68, 68, 68);
        imagefill($image, 0, 0, $black);

        // imagettftext($image, 12, 0, 20, 200, $black, DIR_FONTS."arial.ttf", "TEST IMAGE"); 
        header("Content-Type: image/png");
        imagepng($image);


        }
}

?>
