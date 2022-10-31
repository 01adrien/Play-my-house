<?php

    namespace My_class;

    class Config {

        private static $db;

        public static function get_DB_config() {
            self::$db['name'] = "crudPhp";
            self::$db['host'] = "127.0.0.1";
            self::$db['user'] = "adrienG";
            self::$db['password'] = "LeoetAdrien1989*";
            return self::$db;
        }
}

?>