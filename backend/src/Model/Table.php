<?php 

    namespace Model;

    abstract class Table {

        protected static $table;

        private static function get_table() {
            return static::$table;
        }

        public static function all_items() {
            $query = "SELECT * FROM `". static::get_table() ."`";
            return \My_class\Database::getDB()->query($query);
        }

        public static function one_item($post) {
            $query = "SELECT * FROM `". static::get_table() ."`WHERE id = ?";
            $stmt =  \My_class\Database::getDB()->prepare($query);
            $stmt->bindParam(1, $post['id']);
            $stmt->execute();
            $item =  $stmt->fetch(\PDO::FETCH_ASSOC);
            if($item) return $item;
            return 'ID incorrect';
        }

        public static function delete_item($post) {
            $query = "DELETE FROM `". static::get_table() ."`WHERE id = ?";
            $stmt =  \My_class\Database::getDB()->prepare($query);
            $stmt->bindParam(1, $post['id']);
            if ($stmt->execute()) return true;
            return 'ID incorrect';
        }

        public static function create_update_item($post, $action) {
            $params = '';
            foreach ($post as $key => $value) {
                $params .= $key.' =:'.$key.', ';
            }
            $params = rtrim($params, ', ');
            $query = "INSERT INTO " . static::get_table() . " SET " . $params;
            if ($action === "UPDATE") {
                $query = "UPDATE " . static::get_table() . " SET " . $params . " WHERE id = :id";
            }
            $stmt = \My_class\Database::getDB()->prepare($query);

            foreach ($post as $key => $value) {
                $stmt->bindValue(':'.$key, $value);
            }
            if ($stmt->execute()) return true;
            return 'erreur';
        }
    }

?>
