<?php

    namespace Controller;

    include_once('/home/adrien/Bureau/titre_pro/projet/backend/src/Autoloader.php');
    \Autoloader::register();

    class Picto extends \Controller\Controller {

        const USER_PATH = "/home/adrien/Bureau/titre_pro/projet/backend/public/pictures/users/";

        public static function get_picture($post) {
            $post = (array)$post;
            $post['id'] = self::formatdata($post, 'id', \Model\Table::P_STRING);
            $post['URI'] = \Model\User_picture::find_by($post, true);
            $file_name  = pathinfo($post['URI']->URI, PATHINFO_FILENAME);
            $ext  = pathinfo($post['URI']->URI, PATHINFO_EXTENSION);
            $path = self::USER_PATH . $file_name . "." . $ext;
            $data = file_get_contents($path);
            $base64 = 'data:image/' . $ext . ';base64,' . base64_encode($data);
            return $base64;
        }

        public static function upload_picture() {
            $post = [];
            $file_name = \uniqid().'_'.$_POST['name'].'_'.$_FILES["file"]["name"];
            if ($_FILES['file']['error'] == 0) {
                if (move_uploaded_file($_FILES["file"]["tmp_name"], $_FILES["file"]["name"])) {
                    $old_picture['id'] = self::formatdata($_POST, 'picture_id', \Model\Table::P_INT);
                    $old_name = \Model\User_picture::find_by($old_picture, true);
                    if ($old_name->URI !== 'default.png') unlink(self::USER_PATH.'/'.$old_name->URI);
                    rename($_FILES["file"]["name"], self::USER_PATH.'/'.$file_name);
                }
            }
            $post['URI'] = $file_name;
            $post['ext'] = pathinfo($file_name, PATHINFO_EXTENSION);
            $post['id'] = $_POST['picture_id'];
            return \Controller\User_picture::update_picture($post);
        }
    }