<?php 

    namespace Model;

    class Reservation extends \Model\Table 
    {
        protected static $table = "reservations";

        public static function get_reservation_for_one_instrument($post, $type)
        {   
            $where = '';
            if ($type === 'MONTH')
            {
                $where = "LEFT JOIN `instruments` instru ON instru.`id` =:id
                        WHERE resa.`active` = 1 AND resa.`instrument_id` =:id 
                        AND MONTH(resa.`start`) =:month AND YEAR(resa.`start`) =:year";
            }
            if ($type === 'DAY') 
            {
                $where = "LEFT JOIN `instruments` instru ON instru.`id` =:id
                        WHERE resa.`active` = 1 AND resa.`instrument_id` =:id
                        AND DATE(resa.`start`) =:day
                        ORDER BY resa.`id` DESC";
            }

            $sql = "SELECT
                    resa.`id` id,
                    DATE(resa.`start`) `date`,
                    LOWER(DAYNAME(resa.`start`)) `day`,
                    HOUR(resa.`start`) `start`,
                    HOUR(resa.`end`) `end`,
                    resa.`instrument_id` instruId,
                    instru.`timeline_id_monday` monday,
                    instru.`timeline_id_tuesday` tuesday,
                    instru.`timeline_id_wednesday` wednesday,
                    instru.`timeline_id_thursday` thursday,
                    instru.`timeline_id_friday` friday,
                    instru.`timeline_id_saturday` saturday,
                    instru.`timeline_id_sunday` sunday
                    FROM `".self::$table."` resa
                    ".$where."";

            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }

    }

?>
