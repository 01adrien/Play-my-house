<?php
    namespace My_class;

    class App {
        private static $database;

        public static function get_DB() {
            $config = \My_class\Config::get_DB_config();
            self::$database = new \My_class\Database($config['name'], $config['user'], $config['password']);
            return self::$database;
        }
    }
?>