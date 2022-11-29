<?php 

    namespace Model;

    class Instrument extends \Model\Table 
    {
        protected static $table = "instruments";

        public static function get_count()
        {
            $sql = "SELECT COUNT(*)
                    FROM `".self::$table."` instru";

            return \My_class\App::get_DB()->prepare($sql, [], null, true);
        }

        public static function get_instrument($offset, $limit, $filter = 'ALL', $post = []) 
        {   
            if ($filter === 'FAMILY') $where = "WHERE instru.`family_id` =:id";
            if ($filter === 'TYPE') $where = "WHERE instru.`type_id` =:id";
            if ($filter === 'ALL') $where = "WHERE instru.`id` IS NOT NULL";
            
            $sql = "SELECT
                    instru.`id`,
                    instru.`created`,
                    instru.`owner_id`,
                    instru.`name` `instrumentName`,
                    family.`name` `family`,
                    picture.`URI` `picture`,
                    type.`name` `type`,
                    brand.`name` `brand`
                    FROM `".self::$table."` instru
                    LEFT JOIN `instruments_family` family ON family.`id` = instru.`family_id`
                    LEFT JOIN `instruments_type` type ON type.`id` = instru.`type_id`
                    LEFT JOIN `instruments_brand` brand ON brand.`id` = instru.`brand_id`
                    LEFT JOIN `instruments_pictures` picture ON  picture.`instrument_id` = instru.`id` AND picture.`main_picture` = 1
                    ".$where."
                    ORDER BY instru.`created` DESC LIMIT ".$limit." OFFSET ".$offset."";

            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }

        public static function get_brands_by_family_id($post)
        {
            $sql = "SELECT DISTINCT
                    instru_br.`name`,
                    instru_br.`id`
                    FROM `".self::$table."` instru
                    LEFT JOIN `instruments_brand` instru_br ON instru_br.`id` = instru.`brand_id`
                    WHERE instru.`family_id` =:id";

            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }

        public static function get_brands_by_type_id($post)
        {   
            $sql = "SELECT DISTINCT
                    instru_br.`name`,
                    instru_br.`id`
                    FROM `".self::$table."` instru
                    LEFT JOIN `instruments_brand` instru_br ON instru_br.`id` = instru.`brand_id`
                    WHERE instru.`type_id` =:id";

            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }

        public static function get_count_by($post, $data)
        {   
            if ($data === 'FAMILY') $where = "WHERE instru.`family_id` =:id";
            if ($data === 'TYPE') $where = "WHERE instru.`type_id` =:id";
            if ($data === 'BRAND') $where = "WHERE instru.`brand_id` =:brand_id AND instru.`type_id` =:type_id";
            if ($data === 'FAMILY_&_BRAND') $where = "WHERE instru.`family_id` =:family_id AND instru.`brand_id` =:brand_id";
            if ($data === 'ALL_BRAND') $where = "WHERE instru.`brand_id` =:brand_id";

            $sql = "SELECT COUNT(*)
                    FROM `".self::$table."` instru
                    ".$where."";

            return \My_class\App::get_DB()->prepare($sql, $post, null, true);
        }

        public static function get_instrument_disponibility($post)
        {
            $sql = "SELECT
                    instru.`timeline_id_monday` monday,
                    instru.`timeline_id_tuesday` tuesday,
                    instru.`timeline_id_wednesday` wednesday,
                    instru.`timeline_id_thursday` thursday,
                    instru.`timeline_id_friday` friday,
                    instru.`timeline_id_saturday` saturday,
                    instru.`timeline_id_sunday` sunday
                    FROM `".self::$table."` instru
                    WHERE instru.`id` =:id";

            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }
    }

?>