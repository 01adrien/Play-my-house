<?php

    namespace Controller;

    class Picto extends \Controller\Controller {

        const USER_PATH = CONFIG_PATH . "/public/pictures/users/";
        const INSTRUMENT_PATH = CONFIG_PATH . "/public/pictures/instruments/";

        public static function get_picture($post, $type)
        {
           $file_info = pathinfo($post['fileName']);
           $file_name = $post['fileName'];
           if ($type === 'INSTRUMENT') $path = self::INSTRUMENT_PATH . $file_name;
           if ($type === 'USER') $path = self::USER_PATH . $file_name;
           $data = file_get_contents($path);
           $base64 = 'data:image/' . $file_info['extension'] . ';base64,' . base64_encode($data);
           return $base64;
        }

        public static function upload_picture() 
        {   
            $post = [];
            $file_name = \uniqid().'_'.$_POST['name'].'_'.$_FILES["file"]["name"];
            
            if ($_FILES['file']['error'] == 0 && $_FILES['file']['size'] < 10485760) 
            {
                if (move_uploaded_file($_FILES["file"]["tmp_name"], $_FILES["file"]["name"])) 
                {
                    $old_picture['id'] = self::formatdata($_POST, 'picture_id', \Model\Table::P_INT);
                    $old_name = \Model\User_picture::find_by($old_picture, true);
                    if ($old_name->URI !== 'default.png') unlink(self::USER_PATH.'/'.$old_name->URI);
                    rename($_FILES["file"]["name"], self::USER_PATH.'/'.$file_name);
                } 
               else return false; 
            } 
            else return false;
            $post['URI'] = $file_name;
            $post['ext'] = pathinfo($file_name, PATHINFO_EXTENSION);
            $post['id'] = $_POST['picture_id'];
            return \Controller\User_picture::update_picture($post);
        }

        public static function upload_picture_instrument()
        {
            $file_name = \uniqid().'_'.$_POST['name'].'_'.$_FILES["file"]["name"];
            $post['URI'] = $file_name;
            $post['ext'] = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
            $post['instrument_id'] = $_POST['instrumentId'];
            $post['main_picture'] = $_POST['mainPicture'];
            if ($_FILES['file']['error'] == 0) 
            {
                if (move_uploaded_file($_FILES["file"]["tmp_name"], $_FILES["file"]["name"])) 
                {
                    rename($_FILES["file"]["name"], self::INSTRUMENT_PATH.'/'.$file_name);
                    $attr['URI'] = self::formatdata($post, 'URI', \Model\Table::P_STRING); 
                    $attr['ext'] = self::formatdata($post, 'ext', \Model\Table::P_STRING); 
                    $attr['instrument_id'] = self::formatdata($post, 'instrument_id', \Model\Table::P_INT); 
                    $attr['main_picture'] = self::formatdata($post, 'main_picture', \Model\Table::P_INT); 
                    return \Model\Instrument_picture::create_update($attr, 'CREATE');
                } 
               else return 'erreur upload'; 
            }
            else return 'erreur upload'; 
        }
    }