<?php

    namespace Controller;

    include_once('../Autoloader.php');
    \Autoloader::register();

    class User_picture extends \Controller\Controller{

        public function create($post) {
            $post['URI'] = self::formatdata($post, 'URI', \Model\Table::P_STRING);
            return \Model\User_picture::create_update($post, 'CREATE');
        }

        public function get_picture_URI($post) {
            $post = (array)$post;
            $post['id'] = self::formatdata($post, 'id', \Model\Table::P_STRING);
            $post['URI'] = \Model\User_picture::find_by($post, true);
            return $post['URI'];
        }
    }