<?php

    namespace My_class;

    include_once('/home/adrien/Bureau/titre_pro/projet/backend/src/Autoloader.php');
    \Autoloader::register();

    class String_format {
        
        public static function sanitize_input($post) {
            foreach ($post as $key => $value) {
                $post[$key] = trim($post[$key]);
                $post[$key] = stripslashes($post[$key]);
                $post[$key] = htmlspecialchars($post[$key]);
                $post[$key] = strip_tags($post[$key]);
            }
            return $post;
        }
    }

?>