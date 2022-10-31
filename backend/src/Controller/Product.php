<?php

    namespace Controller;

    // include_once('../Model/Product.php');
    include_once('../Autoloader.php');
    \Autoloader::register();     

    class Product {
        
        public static function get_all() {
            return \Model\Product::get_all();
        }

        public static function get_one($post) {
            return \Model\Product::get_one($post);
        }

        public static function delete($post) {
            return \Model\Product::delete($post);
        }

        public static function create($post, $action) {
            return \Model\Product::create($post, $action);
        }

        public static function create_update($post, $action) {
            // echo __DIR__ . '/Model/Product'; exit();
            return \Model\Product::create_update($post, $action);
        }
}

?>