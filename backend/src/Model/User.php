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

        public static function get_all_users_safe($offset, $limit)
        {
            $sql = "SELECT
                    users.`id`,
                    users.`name`,
                    users.`email`,
                    users.`address`,
                    users.`role`,
                    city.`CP` postalCode,
                    city.`name` cityName
                    FROM `".self::$table."`
                    LEFT JOIN `city` ON city.`id` = users.`city_id`
                    WHERE users.`role` != 'admin'
                    ORDER BY users.`name` DESC LIMIT ".$limit." OFFSET ".$offset."";

            return \My_class\App::get_DB()->prepare($sql, [], null, false);
        }

}   

?>

