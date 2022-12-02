<?php

    namespace Controller;

    class User_picture extends \Controller\Controller{

        public static function create($post) 
        {
            $post['URI'] = self::formatdata($post, 'URI', \Model\Table::P_STRING);
            return \Model\User_picture::create_update($post, 'CREATE');
        }

        public static function get_picture($post) 
        {
            return \Controller\Picto::get_picture($post, 'USER');
        }

        public static function get_picture_by_user_id($post) 
        {   
            $attr = [];
            $attr['id'] = self::formatdata($post, 'id', \Model\Table::P_INT);
            $user = \Model\User::get_by_ID($attr);
            $attr['id'] = self::formatdata((array)$user, 'picture_id', \Model\Table::P_INT);
            $picture = \Model\User_picture::get_by_ID($attr);
            $post['fileName'] = $picture->URI;
            return \Controller\Picto::get_picture($post, 'USER');
        }

        public static function upload_picture($post) 
        {
            $ext = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
            if ($ext === 'jpeg' || $ext == 'jpg') 
            {
                return \Controller\Picto::upload_picture();
            }
            
        }

        public static function update_picture($post) 
        {
            $post['URI'] = self::formatdata($post, 'URI', \Model\Table::P_STRING);
            $post['ext'] = self::formatdata($post, 'ext', \Model\Table::P_STRING);
            $post['id'] = self::formatdata($post, 'id', \Model\Table::P_INT);
            \Model\User_picture::create_update($post, 'UPDATE');
            return ['picture_id' => $post['id']['value'], 'picture_name' => $post['URI']['value']];
        }
    }   