<?php 

    namespace Model;

    include_once('../Autoloader.php');
    \Autoloader::register();

    class User_picture extends \Model\Table {

        protected static $table = "users_pictures";
        
    }

?>
