<?php 

    namespace Model;

    abstract class Table {

        protected static $table;

        const  P_NULL = 0; 
	    const  P_INT = 1;  
	    const  P_LOB = 3; 
	    const  P_STRING = 2;
	    const  P_BOOL = 5; 

        public static function get_table() {
            return static::$table;
        }

        public static function get_all() {
            $query = "SELECT * FROM `". static::get_table() ."`";
            return \My_class\App::get_DB()->query($query);
        }

        public static function get_by_ID($post) {
            $query = "SELECT * FROM `". static::get_table() ."`WHERE id = :id";
            $stmt =  \My_class\App::get_DB()->prepare($query, $post, null, true);
            echo json_encode($stmt); exit();
            if($stmt) return $stmt;
            return 'ID incorrect';
        }

        public static function delete($post) {
            $query = "DELETE FROM `". static::get_table() ."`WHERE id = :id";
            $stmt =  \My_class\App::get_DB()->prepare($query, $post);
            if ($stmt) return true;
            return 'ID incorrect';
        }

        public static function create_update($post, $action) {
            $params = '';
            foreach ($post as $key => $value) {
                $params .= $key.' = :'.$key.', ';
            }
            $params = rtrim($params, ', ');
            $query = "INSERT INTO " . static::get_table() . " SET " . $params;
            if ($action === "UPDATE") {
                $query = "UPDATE " . static::get_table() . " SET " . $params . " WHERE id = :id";
            }
            $stmt = \My_class\App::get_DB()->prepare($query, (array)$post);
            if ($stmt) return $stmt;
            return 'erreur';
        }

        public static function find_by(array $post, $uniq) {
            $params = array_keys($post)[0];
            $query = "SELECT * FROM `". static::get_table() ."` WHERE `".$params."` = :".$params;
            $stmt = \My_class\App::get_DB()->prepare($query, $post, null, $uniq);
            return $stmt;
        }
    }

?>
