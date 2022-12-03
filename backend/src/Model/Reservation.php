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

            $reservations =  \My_class\App::get_DB()->prepare($sql, $post, null, false);

            foreach ($reservations as $r)
            {
                $r->reservation_slot = count(range($r->start, $r->end)) - 1;
            }
            return $reservations;
        }

        public static function get_active_user_reservation($post, $offset, $limit)
        {
            $sql = "SELECT
                    DATE(resa.`start`) `date`,
                    LOWER(DAYNAME(resa.`start`)) `day`,
                    HOUR(resa.`start`) `start`,
                    HOUR(resa.`end`) `end`,
                    resa.`instrument_id`
                    FROM `".self::$table."` resa
                    WHERE resa.`user_id` =:id AND resa.`active` = 1
                    ORDER BY resa.`start` DESC LIMIT ".$limit." OFFSET ".$offset."";

            
            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }

        public static function get_active_count_by_user($post)
        {
            $sql = "SELECT COUNT(*) FROM `".self::$table."` resa
                    WHERE resa.`user_id` =:id AND resa.`active` = 1";

            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }

        public static function get_inactive_user_reservation($post, $offset, $limit)
        {
            $sql = "SELECT
                    DATE(resa.`start`) `date`,
                    LOWER(DAYNAME(resa.`start`)) `day`,
                    HOUR(resa.`start`) `start`,
                    HOUR(resa.`end`) `end`,
                    resa.`instrument_id`
                    FROM `".self::$table."` resa
                    WHERE resa.`user_id` =:id AND resa.`active` = 0
                    ORDER BY resa.`start` DESC LIMIT ".$limit." OFFSET ".$offset."";

            
            return \My_class\App::get_DB()->prepare($sql, $post, null, false);

        }

        public static function get_inactive_count_by_user($post)
        {
            $sql = "SELECT COUNT(*) FROM `".self::$table."` resa
                    WHERE resa.`user_id` =:id AND resa.`active` = 0";

            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }

    }   

?>
