<?php 
    namespace My_class;

    include_once('../Autoloader.php');
    \Autoloader::register();

    class Database {
        private static $conn;
        
        public static function getDB(){
            $config = \My_class\Config::get_DB_config();
            try{
                self::$conn = new \PDO("mysql:host=".$config['host'].";dbname=".$config['name'], $config['user'], $config['password']);
                self::$conn->exec("set names utf8");
            }catch(PDOException $exception){
                echo "Database could not be connected: " . $exception->getMessage();
            }
            return self::$conn;
        }
    }

?>

