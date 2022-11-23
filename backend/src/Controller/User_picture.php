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
            return \Model\User_picture::create_update($post, 'UPDATE');
        }
    }   