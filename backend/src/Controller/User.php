<?php

    namespace Controller;

    include_once('../Autoloader.php');
    \Autoloader::register();

    class User {
        
        public static function get_all() {
            return \Model\User::get_all();
        }

        public static function get_one($post) {
            return \Model\User::get_one($post);
        }

        public static function delete($post) {
            return \Model\User::delete($post);
        }

        public static function create_update($post, $action) {
            return \Model\User::create_update($post, $action);
        }
}

?>