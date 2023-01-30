<?php 

    namespace Model;

    class User extends \Model\Table 
    {

        protected static $table = "users";

        public static function email_check($post) 
        {
            return self::find_by($post, true);
        }

        public static function is_register($post) 
        {
            $email['email'] = \Controller\Controller::formatdata($post, 'email', \Model\Table::P_STRING);
            $matched_user = self::find_by($email, true);
            if (password_verify($post['password'],$matched_user->password)) return (array)$matched_user;
            return false;
        }

        public static function get_admin_data($offset, $limit)
        {
            $sql = "SELECT
                    users.`id`,
                    users.`name` name,
                    users.`email` email,
                    users.`telephone`,
                    users.`address` address,
                    users.`role`,
                    city.`name` ville
                    FROM `".self::$table."`
                    LEFT JOIN `city` ON city.`id` = users.`city_id`
                    ORDER BY users.`id` DESC LIMIT ".$limit." OFFSET ".$offset."";

            return \My_class\App::get_DB()->prepare($sql, [], null, false);
        }

        public static function get_owner($post) 
        {
            $sql = "SELECT
                    users.`id`,
                    users.`name`,
                    users.`email`,
                    users.`address`,
                    users.`telephone`,
                    users.`role`,
                    city.`name` city
                    FROM `".self::$table."`
                    LEFT JOIN `city` ON city.`id` = users.`city_id`
                    WHERE users.`id` =:id ";

            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }

}   

?>

