<?php 

    namespace Model;

    class Instrument_type extends \Model\Table 
    {
        protected static $table = "instruments_type";

        public static function get_types_by_family_id($post)
        {   
            $sql = "SELECT 
                    type.`id`,
                    type.`name`
                    FROM `".self::$table."` type
                    WHERE
                    type.`family_id` =:id";

            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }
    }
?>