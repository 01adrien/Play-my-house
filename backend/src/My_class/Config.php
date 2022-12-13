<?php

    namespace My_class;

    class Config 
    {

        private static $db;
        private static $_instance;
	    private $config = [];
        private $PHP_ENV;

        public function __construct() 
        {            
            $servers_address = [
                'https://no-idea-web.fr' => 'production',
                'http://127.0.0.1:1234' => 'development',
                'http://localhost:1234' => 'development',
            ];
           $this->PHP_ENV = $servers_address[$_SERVER['HTTP_ORIGIN']];
           if ($this->PHP_ENV) $this->config = require CONFIG_PATH . '/config/config.'.$this->PHP_ENV.'.php';
           
        }
        
        public static function get_instance() 
        {
            if (self::$_instance === null) self::$_instance = new Config();
            return self::$_instance;
        }

        public function get($key) 
        {
            return $this->config[$key];
        }

        public static function send_JSON($info) 
        {
            echo (json_encode($info, JSON_INVALID_UTF8_SUBSTITUTE));
        }
}

?>



	

	