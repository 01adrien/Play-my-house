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
                    resa.`slot_num`,
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
        
        public static function get_user_reservation($post, $offset, $limit, $active)
        {   
            if ($active == 1) $and = "AND resa.`start` >= CURRENT_TIMESTAMP()"; 
            if ($active == 0) $and = "AND resa.`start` < CURRENT_TIMESTAMP()"; 

            $sql = "SELECT
                    resa.`id`,
                    DATE(resa.`start`) `date`,
                    LOWER(DAYNAME(resa.`start`)) `day`,
                    HOUR(resa.`start`) `start`,
                    HOUR(resa.`end`) `end`,
                    resa.`instrument_id`
                    FROM `".self::$table."` resa
                    WHERE resa.`user_id` =:id ".$and."
                    ORDER BY DATE(resa.`start`) ASC LIMIT ".$limit." OFFSET ".$offset."";

            
            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }

        public static function get_count_by_user($post, $active)
        {
            if ($active == 1) $and = "AND resa.`start` >= CURRENT_TIMESTAMP()";
            if ($active == 0) $and = "AND resa.`start` < CURRENT_TIMESTAMP()";

            $sql = "SELECT COUNT(*) 
                    FROM `".self::$table."` resa
                    WHERE resa.`user_id` =:id ".$and."";

            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }

        public static function get_owner_reservation($post, $offset, $limit, $active)
        {
            if ($active == 1) $where = "WHERE resa.`start` >= CURRENT_TIMESTAMP() AND resa.`owner_id` =:id "; 
            if ($active == 0) $where = "WHERE resa.`start` < CURRENT_TIMESTAMP() AND resa.`owner_id` =:id"; 


            $sql = "SELECT
                    resa.`id`,
                    DATE(resa.`start`) `date`,
                    LOWER(DAYNAME(resa.`start`)) `day`,
                    HOUR(resa.`start`) `start`,
                    HOUR(resa.`end`) `end`,
                    resa.`instrument_id`,
                    users.`name` `user`
                    FROM `".self::$table."` resa
                    LEFT JOIN `users` ON users.`id` = resa.`user_id`
                    ".$where."
                    ORDER BY DATE(resa.`start`) ASC LIMIT ".$limit." OFFSET ".$offset."";
            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }


        public static function get_count_by_owner($post, $active)
        {   
            if ($active == 1) $and = "AND resa.`start` >= CURRENT_TIMESTAMP()";
            if ($active == 0) $and = "AND resa.`start` < CURRENT_TIMESTAMP()";

            $sql = "SELECT COUNT(*)
                    FROM `".self::$table."` resa
                    LEFT JOIN `instruments` instru ON instru.`id` = resa.`instrument_id`
                    WHERE instru.`owner_id` =:id ".$and."";

            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }


    }   

?>
