<?php 

    namespace Model;

    class Timeline_day extends \Model\Table 
    {
        protected static $table = "timeline_day";

        public static function get_by_id($post)
        {
            $timeline = self::get_by_ID($post);
            foreach (range(9, 23) as $h) if ($timeline->$h === null) unset($timeline->$h);
            return $timeline;
        }
    }

?>
