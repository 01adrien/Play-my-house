<?php 

    namespace Model;

    class Timeline_day extends \Model\Table 
    {
        protected static $table = "timeline_day";
        // SELECT td.`id` FROM `timeline_day` td WHERE td.`_9` = NULL AND td.`_10` = NULL AND td.`_11` = NULL AND td.`_12` = NULL AND td.`_13` = NULL AND td.`_14` = NULL AND td.`_15` = NULL AND td.`_16` = NULL AND td.`_17` = NULL AND td.`_18` = NULL AND td.`_19` = NULL AND td.`_20` = NULL AND td.`_21` = 1 AND td.`_22` = NULL AND td.`_23` = NULL AND td.`_total_hours` = 1 
        public static function find_timeline($post)
        {   
            $sql = "SELECT DISTINCT
                    td.`id`
                    FROM `".self::$table."` td
                    WHERE td.`_9` =:_9 AND td.`_10` =:_10
                    AND td.`_11` =:_11 AND td.`_12` =:_12
                    AND td.`_13` =:_13 AND td.`_14` =:_14
                    AND td.`_15` =:_15 AND td.`_16` =:_16
                    AND td.`_17` =:_17 AND td.`_18` =:_18
                    AND td.`_19` =:_19 AND td.`_20` =:_20
                    AND td.`_21` =:_21 AND td.`_22` =:_22
                    AND td.`_23` =:_23
                    AND td.`_total_hours` =:_total_hours";

            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }

    }

?>

