<?php 

    namespace Model;

    include_once('../Autoloader.php');
    \Autoloader::register();

    class User extends \Model\Table {

        protected static $table = "users";

        public static function get_all() {
            $stmt = self::all_items();
            $users = [];
            while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)){
                extract($row);
                $e = array(
                    "id" => $id,
                    "name" => $name,
                    "telephone" => $telephone,
                    "email" => $email
                );
                array_push($users, $e);
        }
            return $users;
        }

        public static function get_one($post) {
            return self::one_item($post);
        }

        public static function delete($post) {
            return self::delete_item($post);
        }

        public static function create_update($post, $action) {
            return self::create_update_item($post, $action);
        }
}

?>