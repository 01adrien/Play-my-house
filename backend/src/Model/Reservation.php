<?php 

    namespace Model;

    class Reservation extends \Model\Table 
    {
        protected static $table = "reservations";

        public static function get_reservation_for_one_by_month($post)
        {   
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
                    LEFT JOIN `instruments` instru ON instru.`id` =:id
                    WHERE resa.`active` = 1 AND resa.`instrument_id` =:id 
                    AND MONTH(resa.`start`) =:month AND YEAR(resa.`start`) =:year";

            $all_resa =  \My_class\App::get_DB()->prepare($sql, $post, null, false);
            $reservations = [];
            foreach ($all_resa as $resa)    
            {   
                $resa = (array)$resa;
                $attr = [];
                $attr['id'] = \Controller\Controller::formatdata($resa, $resa['day'], \Model\Table::P_INT );
                $timeline = \Model\Timeline_day::get_by_id($attr);
                echo json_encode($timeline); exit();
                // foreach (range(9, 23) as $h) if ($timeline->$h === null) unset($timeline->$h);
                foreach (range($resa['start'], $resa['end']) as $h) unset($timeline->$h);
                unset($timeline->id);
                $reservations[$resa['id']] = ['date' => $resa['date'], 'start' => $resa['start'], 'end' => $resa['end'], 'dispo' => $timeline];
            }
            return $reservations;
        }
    }

?>
