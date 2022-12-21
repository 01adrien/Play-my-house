<?php
    namespace My_class;

    class App 
    {
        private static $database;

        public static function get_DB() 
        {
            $config = \My_class\Config::get_instance();
            self::$database = new \My_class\Database($config->get('db_name'), $config->get('db_user'), $config->get('db_pass'), $config->get('db_host'));
            return self::$database;
        }
    }
?>