<?php
namespace App\MyClass;

class App
{
    private static $database;
    public static function getDb()
    {
        if (is_null(self::$database)) {
            $config = Config::getInstance();
            self::$database = new Database($config->get('db_name'), $config->get('db_user'), $config->get('db_pass'), $config->get('db_host'), $config->get('HashKey'), $config->get('HashAlgo'));
        }
        return self::$database;
    }
}
