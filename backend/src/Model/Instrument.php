<?php 
    namespace Model;

    class Instrument extends \Model\Table 
    {
        protected static $table = "instruments";

        public static function build_filter_query($post)
        {
            $where = 'WHERE ';
            $filters_cat = json_decode($post['search'], true);
            if (isset($filters_cat['types']) && count($filters_cat['types']) > 0) 
            {   
                $sql_types = 'instru.`type_id` IN ('.implode(",", $filters_cat["types"]).') AND ';
                $where .= $sql_types;
            } 
            if (isset($filters_cat['brands']) && count($filters_cat['brands']) > 0)
            {
                $sql_brands = 'instru.`brand_id` IN ('.implode(",", $filters_cat["brands"]).') AND ';
                $where .= $sql_brands;
            }
            
            $where = substr($where, 0, -4);
            
            if ($filters_cat['page'] == "FAMILY") $where .= 'AND instru.`family_id` = '.$filters_cat["id"].'';
            if ($filters_cat['page'] == "TYPE") $where .= 'AND instru.`type_id` = '.$filters_cat["id"].'';
            if (isset($filters_cat['name']) && strlen($filters_cat['name']) > 0 && count($filters_cat['brands']) > 1 || count($filters_cat['types']) > 1)
            {
                $where .= 'AND LOWER(instru.`name`) LIKE LOWER('.'\''.'%'.$filters_cat['name'].'%'.'\''.')';
            } 
            if (isset($filters_cat['name']) && strlen($filters_cat['name']) > 0 && !count($filters_cat['brands']) > 0 && !count($filters_cat['types']) > 0)
            {
                $where .= 'ERE LOWER(instru.`name`) LIKE LOWER('.'\''.'%'.$filters_cat['name'].'%'.'\''.') OR LOWER(instru.`description`) LIKE LOWER('.'\''.'%'.$filters_cat['name'].'%'.'\''.')';
            } 
            return $where;
            
        }

        public static function get_instrument($offset, $limit, $filter = 'ALL', $post = []) 
        {   
            if ($filter === 'FAMILY') $where = "WHERE instru.`family_id` =:id AND instru.`statut` = 'V'";
            if ($filter === 'TYPE') $where = "WHERE instru.`type_id` =:id AND instru.`statut` = 'V'";
            if ($filter === 'ALL') $where = "WHERE instru.`id` IS NOT NULL AND instru.`statut` = 'V'";
            if ($filter === "SEARCH") $where = "WHERE LOWER(instru.`name`) LIKE CONCAT ('%', LOWER(:search), '%')";
            if ($filter === "SEARCH_FILTER") {
                $where = self::build_filter_query($post);
                // return $where;
                $post = [];
            };
            $sql = "SELECT
                    instru.`id`,
                    instru.`created`,
                    instru.`owner_id`,
                    instru.`name` `instrumentName`,
                    instru.`description`,
                    family.`name` `family`,
                    picture.`URI` `picture`,
                    type.`name` `type`,
                    brand.`name` `brand`
                    FROM `".self::$table."` instru
                    LEFT JOIN `instruments_family` family ON family.`id` = instru.`family_id`
                    LEFT JOIN `instruments_type` type ON type.`id` = instru.`type_id`
                    LEFT JOIN `instruments_brand` brand ON brand.`id` = instru.`brand_id`
                    LEFT JOIN `instruments_pictures` picture ON  picture.`instrument_id` = instru.`id`
                    AND picture.`main_picture` = 1
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
                    WHERE instru.`family_id` =:id AND instru.`statut` = 'V'";

            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }

        public static function get_brands_by_type_id($post)
        {   
            $sql = "SELECT DISTINCT
                    instru_br.`name`,
                    instru_br.`id`
                    FROM `".self::$table."` instru
                    LEFT JOIN `instruments_brand` instru_br ON instru_br.`id` = instru.`brand_id`
                    WHERE instru.`type_id` =:id AND instru.`statut` = 'V'";

            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }

        public static function get_count_by($post, $data)
        {   
            if ($data === 'FAMILY') $where = "WHERE instru.`family_id` =:id AND instru.`statut` = 'V'";
            if ($data === 'TYPE') $where = "WHERE instru.`type_id` =:id AND instru.`statut` = 'V'";
            if ($data === 'BRAND') $where = "WHERE instru.`brand_id` =:brand_id AND instru.`type_id` =:type_id AND instru.`statut` = 'V'";
            if ($data === 'FAMILY_&_BRAND') $where = "WHERE instru.`family_id` =:family_id AND instru.`brand_id` =:brand_id AND instru.`statut` = 'V'";
            if ($data === 'ALL_BRAND') $where = "WHERE instru.`brand_id` =:brand_id AND instru.`statut` = 'V'";
            if ($data === 'OWNER') $where = "WHERE instru.`owner_id` =:id AND instru.`statut` = 'V'" ;
            if ($data === 'TO_VALIDATE') $where = "WHERE instru.`statut` = 'NV'";
            if ($data === "SEARCH_FILTER") {
                $where = self::build_filter_query($post);
                $post = [];
            }

            $sql = "SELECT COUNT(*)
                    FROM `".self::$table."` instru
                    ".$where."";

            return \My_class\App::get_DB()->prepare($sql, $post, null, true);
        }

        public static function get_instrument_disponibility($post)
        {
            $sql = "SELECT
                    instru.`timeline_id_monday` mon,
                    instru.`timeline_id_tuesday` tue,
                    instru.`timeline_id_wednesday` wed,
                    instru.`timeline_id_thursday` thu,
                    instru.`timeline_id_friday` fri,
                    instru.`timeline_id_saturday` sat,
                    instru.`timeline_id_sunday` sun
                    FROM `".self::$table."` instru
                    WHERE instru.`id` =:id";

            return \My_class\App::get_DB()->prepare($sql, $post, null, false);
        }

        public static function get_admin_data($offset, $limit, $type)
        {
            if ($type === 'TO_VALIDATE') $where = "WHERE instru.`statut` = 'NV'";
            else $where = "WHERE 1";
            $sql = "SELECT
                    instru.`id`,
                    instru.`statut`,
                    users.`name` `proprietaire`,
                    DATE(instru.`created`) `date de creation`,
                    type.`name` `nom`,
                    brand.`name` `marque`,
                    family.`name` `famille`
                    FROM `".self::$table."` instru
                    LEFT JOIN `instruments_family` family ON family.`id` = instru.`family_id`
                    LEFT JOIN `instruments_type` type ON type.`id` = instru.`type_id`
                    LEFT JOIN `instruments_brand` brand ON brand.`id` = instru.`brand_id`
                    LEFT JOIN `users` ON users.`id` = instru.`owner_id`
                    ".$where."
                    ORDER BY instru.`id` DESC LIMIT ".$limit." OFFSET ".$offset."";
            
            return \My_class\App::get_DB()->prepare($sql, [], null, false);
        }

        public static function get_owner_instrument($post, $offset, $limit)
        {   
            $sql = "SELECT
                    instru.`id`,
                    instru.`statut`,
                    instru.`name` `nom`,
                    family.`name` `famille`,
                    brand.`name` `marque`,
                    DATE(instru.`created`) `ajoute le`
                    FROM `".self::$table."` instru
                    LEFT JOIN `instruments_family` family ON family.`id` = instru.`family_id`
                    LEFT JOIN `instruments_brand` brand ON brand.`id` = instru.`brand_id`
                    WHERE instru.`owner_id` =:id
                    ORDER BY instru.`id` DESC LIMIT ".$limit." OFFSET ".$offset."";
            
            return \My_class\App::get_DB()->prepare($sql, $post, null, false);   
        }

        public static function get_count_by_owner($post)
        {   
            return self::get_count_by($post, 'OWNER');
        }
        
    }

?>



