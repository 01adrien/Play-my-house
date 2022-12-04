<?php

    namespace My_class;

    class Config 
    {

        private static $db;
        private static $_instance;
	    private $settings = [];

        public function __construct() 
        {
            $this->settings = require CONFIG_PATH . "/config/config.php";
        }
        
        public static function get_instance() 
        {
            if (self::$_instance === null) self::$_instance = new Config();
            return self::$_instance;
        }

        public function get($key) 
        {
            return $this->settings[$key];
        }

        public static function send_JSON($info) 
        {
            echo (json_encode($info, JSON_INVALID_UTF8_SUBSTITUTE));
        }
}

?>



	

	