<?php 

    namespace Model;

    class Instrument_picture extends \Model\Table 
    {
        protected static $table = "instruments_pictures";

        public static function get_all_pictures_for_one($post)
        {
            $sql = "SELECT
                    picture.`URI`
                    FROM `".self::$table."` picture
                    WHERE instrument_id =:id";

            return  \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }
    }

?>