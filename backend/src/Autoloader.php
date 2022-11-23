<?php

class Autoloader 
{

    static function register()
    {
        spl_autoload_register(array(__CLASS__, 'autoload'));
    }

    static function autoload($class)
    {
            $class = str_replace('\\', '/', $class);
            $file = __DIR__ . '/' . $class . '.php';
            if (file_exists($file)) include_once($file);
    }
}

?>