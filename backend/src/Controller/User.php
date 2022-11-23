<?php

    namespace Controller;

    class User extends \Controller\Controller 
    {
        const DEFAULT_AVATAR = "default.png";
        
        public static function get_all() 
        {
            return \Model\User::get_all();
        }

        public static function get_by_ID($post) 
        {
            $post['id'] = self::formatdata($post, 'id', \Model\Table::P_INT);
            return \Model\User::get_by_ID($post);
        }

        public static function delete($post) 
        {
            $post['id'] = self::formatdata($post, 'id', \Model\Table::P_INT);
            return \Model\User::delete($post);
        }

        public static function create_update($post, $action) 
        {
            $post['email'] = self::formatdata($post, 'email', \Model\Table::P_STRING);
            $post['picture_id'] = self::formatdata($post, 'picture_id', \Model\Table::P_STRING);
            $post['name'] = self::formatdata($post, 'name', \Model\Table::P_STRING);
            $post['password'] = self::formatdata($post, 'password', \Model\Table::P_STRING);
            if ([isset($post['id'])]) $post['id'] = self::formatdata($post, 'id', \Model\Table::P_INT);
            return \Model\User::create_update($post, $action);
        }

        public static function validate_credentials($post) 
        {
            $errors = [];
            if (!$post['name'] || !$post['email'] || !$post['password']) 
            {
                $errors['missing_err'] = true;
            }
            $post = \My_class\String_format::sanitize_input($post);
            $passwordRegex = "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/";
            $nameRegex = "/^[a-zA-Z-' ]*$/";
            if (!preg_match($passwordRegex, $post['password'])) $errors['password_err'] = true;
            if (!preg_match($nameRegex, $post['name'])) $errors['name_err'] = true;
            if (!filter_var($post['email'], FILTER_VALIDATE_EMAIL)) $errors['email_err'] = true;
            if ($errors) return $errors;
            return $post;
        } 

        public static function signin($post) {
            $valid_user = self::validate_credentials($post);
            if (array_key_exists('name_err', $valid_user) || array_key_exists('missing_err', $valid_user) || array_key_exists('email_err', $valid_user) || array_key_exists('password_err', $valid_user)) 
            {
                return $valid_user;
            }
            $valid_user['password'] = password_hash($valid_user['password'], PASSWORD_DEFAULT);
            $email['email'] = self::formatdata($post, 'email', \Model\Table::P_STRING);
            $is_exists = \Model\User::email_check($email);
            if ($is_exists) return ['user_exists_err' => true];
            $picture_id = \Controller\User_picture::create(['URI' => self::DEFAULT_AVATAR]);
            $valid_user['picture_id'] = $picture_id->id;
            if ($user = \Controller\User::create_update($valid_user, 'CREATE')) 
            {
                $_SESSION['user_id'] = $user->id;
                return ['granted' => true];
            };
        }

        public static function login($post) 
        {
            $post = \My_class\String_format::sanitize_input($post);
            if ($is_register = \Model\User::is_register((array)$post)) 
            {
                $_SESSION['user_id'] = $is_register['id'];
                return ['granted' => true];
            }
            return ['login_err' => true];
        }

        public static function get_profil() 
        {
            if ($_SESSION && $_SESSION['user_id']) 
            {
                $id['id'] = \Controller\Controller::formatdata($_SESSION, 'user_id', \Model\Table::P_INT);
                $user = \Model\User::find_by($id, true);
                $picture_id['id'] = \Controller\Controller::formatdata((array)$user, 'picture_id', \Model\Table::P_INT);
                $picture = \Model\User_picture::find_by($picture_id, true);
                return ['email' => $user->email, 'name' => $user->name, 'role' => $user->role, 'id' => $user->id, 'picture_name' => $picture->URI, ];
            }   
        }

        public static function logout() 
        {   
            session_destroy();
		    unset($_SESSION);
		    setcookie("userId", null, -1, '/');
        }
}

?>