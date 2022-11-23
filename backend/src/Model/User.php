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
}

?>

