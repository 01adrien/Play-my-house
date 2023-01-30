<?php

    namespace Controller;

    class User extends \Controller\Controller 
    {
        const DEFAULT_AVATAR = "default.png";
        
        public static function get_count()
        {
            return \Model\User::get_count();
        }

        public static function get_admin_data($post)
        {
            return \Model\User::get_admin_data($post['offset'], $post['limit']);
        }
        
        public static function get_by_ID($post) 
        {
            $post['id'] = self::formatdata($post, 'id', \Model\Table::P_INT);
            $user = \Model\User::get_by_ID($post);
            unset($user->password);
            return $user;
        }

        public static function delete($post) 
        {
            $post['id'] = self::formatdata($post, 'id', \Model\Table::P_INT);
            return \Model\User::delete($post);
        }

        public static function create_update($post, $action) 
        {   
            $attr = [];
            if (isset($post['telephone'])) $attr['telephone'] = self::formatdata($post, 'telephone', \Model\Table::P_STRING);
            if (isset($post['address'])) $attr['address'] = self::formatdata($post, 'address', \Model\Table::P_STRING);
            if (isset($post['city'])) 
            {
                $city['name'] = self::formatdata($post, 'city', \Model\Table::P_STRING);
                if ($city_exist = \Model\City::find_by($city, true))
                {
                    $attr['city_id'] = self::formatdata((array)$city_exist, 'id', \Model\Table::P_STRING);
                } 
                else 
                { 
                   $new_city =  \Model\City::create_update($city, 'CREATE');
                   $attr['city_id'] = self::formatdata((array)$new_city, 'id', \Model\Table::P_STRING);
                }
                
            }
            $attr['role'] = self::formatdata($post, 'role', \Model\Table::P_STRING);
            $attr['email'] = self::formatdata($post, 'email', \Model\Table::P_STRING);
            $action === "create" && $attr['picture_id'] = self::formatdata($post, 'picture_id', \Model\Table::P_STRING);
            $attr['name'] = self::formatdata($post, 'name', \Model\Table::P_STRING);
            $attr['password'] = self::formatdata($post, 'password', \Model\Table::P_STRING);
            if (isset($post['id'])) $attr['id'] = self::formatdata($post, 'id', \Model\Table::P_INT);
            return \Model\User::create_update($attr, $action);
        }

        public static function validate_credentials($post) 
        {
            $errors = [];
            if (!$post['name'] || !$post['email'] || !$post['password']) 
            {
                $errors['missing_err'] = true;
            }
            $post = self::sanitize_input($post);
            $passwordRegex = "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/";
            $nameRegex = "/^[a-zA-Z-' ]*$/";
            if (!preg_match($passwordRegex, $post['password'])) $errors['password_err'] = true;
            if (!preg_match($nameRegex, $post['name'])) $errors['name_err'] = true;
            if (!filter_var($post['email'], FILTER_VALIDATE_EMAIL)) $errors['email_err'] = true;
            if ($errors) return $errors;
            return $post;
        } 

        public static function validate_credentials_modif($post, $role)
        {
            $errors = [];
            if ($role === "user" || $role === "admin")
            {
                if (!$post['name'] || !$post['email']) $errors['missing_err'] = true;
            }
            if ($role === "owner")
            {
                if (!$post['name'] || !$post['email'] || !$post["address"] || !$post["city"] || !$post["telephone"]) 
                {
                    $errors["errors"]['missing_err'] = true;
                }
            }
            $post = self::sanitize_input($post);
            $passwordRegex = "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/";
            $nameRegex = "/^[a-zA-Z-' ]*$/";

            if($post["newPassword"] && $post["newPasswordConfirm"])
            {
                if (!preg_match($passwordRegex, $post['newPassword']) || $post["newPassword"] != $post["newPasswordConfirm"])
                {
                    $errors["errors"]['password_err'] = true;
                } else 
                {
                    $matched_user['id'] = self::formatdata($post, 'id', \Model\Table::P_INT);
                    $match = \Model\User::get_by_ID($matched_user);
                    $verify = password_verify($post['password'],$match->password);
                    // return $verify;
                    if (!$verif) $errors["errors"]['password_err_2'] = true;
                }
            }

            if (!preg_match($nameRegex, $post['name'])) $errors["errors"]['name_err'] = true;
            if (!filter_var($post['email'], FILTER_VALIDATE_EMAIL)) $errors["errors"]['email_err'] = true;
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
            // $picture_id = \Controller\User_picture::create(['URI' => self::DEFAULT_AVATAR]);
            $valid_user['picture_id'] = 47;
            $valid_user['role'] = $post['role'];
            if ($user = \Controller\User::create_update($valid_user, 'CREATE')) 
            {   
                $_SESSION['user_id'] = $user->id;
                $_SESSION['timeout'] = new \DateTime();
                return ['granted' => true];
            };
        }
        
        public static function modify_profil($post)
        {   
            $valid_user = self::validate_credentials_modif($post, $post['role']);
            if (array_key_exists('name_err', $valid_user) || array_key_exists('missing_err', $valid_user) || array_key_exists('email_err', $valid_user) || array_key_exists('password_err', $valid_user)) 
            {
                return $valid_user;
            }
            $valid_user['password'] = password_hash($valid_user['newPassword'], PASSWORD_DEFAULT);
            $email['email'] = self::formatdata($post, 'email', \Model\Table::P_STRING);
            $is_exists = \Model\User::email_check($email);
            if ($is_exists && $is_exists->id !== $post["id"]) return ['user_exists_err' => true];
            if ($user = \Controller\User::create_update($valid_user, 'UPDATE')) 
            {
                return (object)["status" => "succes", 'user' => self::get_profil(), "msg" => "informations modifiees avec succes"];
            }
            return (object)["status" => "fail", "user" => self::get_profil(), "msg" => "probleme reessayez plus tard"];
        }

        public static function login($post) 
        {
            $post = self::sanitize_input($post);
            if ($is_register = \Model\User::is_register((array)$post)) 
            {
                $_SESSION['user_id'] = $is_register['id'];
                $_SESSION['timeout'] = new \DateTime();
                return ['granted' => true];
            }
            return ['login_err' => true];
        }

        public static function get_profil() 
        {   
            if ($_SESSION && $_SESSION['user_id']) 
            {
                $id['id'] = self::formatdata($_SESSION, 'user_id', \Model\Table::P_INT);
                $user = \Model\User::get_user_safe($id);
                $user = $user[0];
                $picture_id['id'] = self::formatdata((array)$user, 'picture_id', \Model\Table::P_INT);
                $picture = \Model\User_picture::find_by($picture_id, true); 
                return [
                    'email' => $user->email, 'name' => $user->name, 'role' => $user->role,
                     'id' => $user->id, 'picture_id' => $picture->id, 'picture_name' => $picture->URI,
                     'address' => $user->address, 'telephone' => $user->telephone, "city" => $user->city
                ];
            }   
        }

        public static function logout() 
        {   
            session_gc();
            session_destroy();
		    unset($_SESSION);
		    //setcookie("userId", null, -1, '/');
        }
}

?>