<?php 

    namespace Controller;

    class Instrument extends \Controller\Controller
    {

        public static function delete($post)
        {
            $attr['id'] = self::formatdata($post, 'id', \Model\Table::P_INT);
            return \Model\Instrument::delete($attr);
        }

        public static function get_count() 
        {
            return \Model\Instrument::get_count();
        }

        public static function get_ten_newest()
        {
            return \Model\Instrument::get_instrument(0, 10);
        }


        public static function get_all($post)
        {
            return \Model\Instrument::get_instrument($post['offset'], $post['limit']);    
        }

        public static function get_all_pictures_for_one($post) 
        {   
            $post['id'] = self::formatdata($post, 'id', \Model\Table::P_INT);
            $pictures = \Model\Instrument_picture::get_all_pictures_for_one($post);
            $data = [];
            if (count($pictures) > 1 )
            {
                for($i = 0; $i < count($pictures); $i++)
                {
                    $post['fileName'] = $pictures[$i]->URI;
                    $data[]= self::get_picture($post);
                }
                return $data;
            } 
    
            $post['fileName'] = $pictures[0]->URI;
            $data[]= self::get_picture($post);
            return $data;
        }

        public static function get_menu_items()
        {   
            $menu = [];
            $items = \Model\Instrument_family::get_family_and_type();
            foreach ($items as $item)
            {
                if (!isset($menu[$item->name])) $menu[$item->name] = [$item->type];
                else $menu[$item->name][] = $item->type;
            }
            return $menu;
        }

        public static function get_picture($post)
        {
            return \Controller\Picto::get_picture($post, 'INSTRUMENT');
        }

        public static function get_by_family_name($post) 
        {
            $family_name['name'] = self::formatdata($post, 'name', \Model\Table::P_STRING);
            $family = \Model\Instrument_family::find_by($family_name, true);
            $family_id['id'] = \Controller\Controller::formatdata((array)$family, 'id', \Model\Table::P_INT);
            if ($post['data'] === 'TYPE')
            { 
                $types =  (array)\Model\Instrument_type::get_types_by_family_id($family_id);
                foreach ($types as $type) 
                {   
                    $post = [];
                    $post['id'] =  self::formatdata((array)$type, 'id', \Model\Table::P_INT);
                    $count = \Model\Instrument::get_count_by($post, 'TYPE');
                    $type->count = $count;
                }
                return $types;
            };
            if ($post['data'] === 'BRAND')
            {
                $brands = (array)\Model\Instrument::get_brands_by_family_id($family_id);
                foreach ($brands as $brand)
                {
                    $post = [];
                    $post['brand_id'] = self::formatdata((array)$brand, 'id', \Model\Table::P_INT);
                    $post['family_id'] = $family_id['id'];
                    $count = \Model\Instrument::get_count_by($post, 'FAMILY_&_BRAND');
                    $brand->count = $count;
                }
                return $brands;
            } 
            if ($post['data'] === 'INSTRUMENT') return \Model\Instrument::get_instrument($post['offset'], $post['limit'], 'FAMILY', $family_id);
            
        }

        public static function get_by_type_name($post)
        {
            $type_name['name'] = self::formatdata($post, 'name', \Model\Table::P_STRING);
            $type = \Model\Instrument_type::find_by($type_name, true);
            $type_id['id'] = self::formatdata((array)$type, 'id', \Model\Table::P_INT);
            if ($post['data'] === 'BRAND')
            {
                $brands =  (array)\Model\Instrument::get_brands_by_type_id($type_id);
                foreach ($brands as $brand)
                {
                    $post = [];
                    $post['brand_id'] = self::formatdata((array)$brand, 'id', \Model\Table::P_INT);
                    $post['type_id'] = $type_id['id'];
                    $count = \Model\Instrument::get_count_by($post, 'BRAND');
                    $brand->count = $count;
                }
                return $brands;
            }
            if ($post['data'] === 'INSTRUMENT')return \Model\Instrument::get_instrument($post['offset'], $post['limit'], 'TYPE', $type_id);
        }

        public static function get_count_by_family_name($post) 
        {   
            $family_name['name'] = self::formatdata($post, 'name', \Model\Table::P_STRING);
            $family = \Model\Instrument_family::find_by($family_name, true);
            $family_id['id'] = self::formatdata((array)$family, 'id', \Model\Table::P_INT);

            return \Model\Instrument::get_count_by($family_id, 'FAMILY');
        }

        public static function get_count_by_type_name($post)
        {
            $type_name['name'] = self::formatdata($post, 'name', \Model\Table::P_STRING);
            $type = \Model\Instrument_type::find_by($type_name, true);
            $type_id['id'] = self::formatdata((array)$type, 'id', \Model\Table::P_INT);

            return \Model\Instrument::get_count_by($type_id, 'TYPE');
        }

        public static function get_all_brand() 
        {
            $brands =  (array)\Model\Instrument_brand::get_all();
            for ($i = 0; $i <= count($brands); $i++)
            {   
                if ($brands[$i] !== null) 
                {
                    $attr['brand_id'] = self::formatdata($brands[$i], 'id', \Model\Table::P_INT);
                    $brands[$i]['count'] = \Model\Instrument::get_count_by($attr, 'ALL_BRAND');
                }

            }
            return $brands;
        }

        public static function get_all_type() 
        {
            $types =  \Model\Instrument_type::get_all();
            for ($i = 0; $i <= count($types); $i++)
            {   
                if ($types[$i] !== null) 
                {
                    $attr['id'] = self::formatdata($types[$i], 'id', \Model\Table::P_INT);
                    $types[$i]['count'] = \Model\Instrument::get_count_by($attr, 'TYPE');
                }

            }
            return $types;
        }

        public static function get_admin_data($post)
        {
            return \Model\Instrument::get_admin_data($post['offset'], $post['limit']);
        }

        public static function get_owner_instrument($post)
        {   
            $attr['id'] = self::formatdata($post, 'id', \Model\Table::P_INT);
            return \Model\Instrument::get_owner_instrument($attr, $post['offset'], $post['limit']);
        }

        public static function get_count_by_owner($post)
        {
            $attr['id'] = self::formatdata($post, 'id', \Model\Table::P_INT);
            return \Model\Instrument::get_count_by_owner($attr);
        }
    }

?>