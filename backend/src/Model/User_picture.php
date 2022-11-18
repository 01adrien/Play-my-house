<?php 

    namespace Model;

    include_once('/home/adrien/Bureau/titre_pro/projet/backend/src/Autoloader.php');
    \Autoloader::register();

    class User_picture extends \Model\Table {

        protected static $table = "users_pictures";
        
    }

?>
