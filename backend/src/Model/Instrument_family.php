<?php 

    namespace Model;

    class Instrument_family extends \Model\Table 
    {
        protected static $table = "instruments_family";

        public static function get_family_and_type()
        {
            $sql = "SELECT
                    instruF.*,
                    instruT.`name` `type`
                    FROM `".self::$table."` instruF
                    LEFT JOIN `instruments_type` instruT ON instruT.`family_id` = instruF.`id`";
            
            return \My_class\App::get_DB()->prepare($sql, [], null, false);
        }
    }
?>