<?php 

    namespace Controller;

    class Instrument extends \Controller\Controller
    {
        public static function get_ten_newest()
        {
            return \Model\Instrument::get_instrument(0, 10);
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
            $family_name['name'] = \Controller\Controller::formatdata($post, 'name', \Model\Table::P_STRING);
            $family = \Model\Instrument_family::find_by($family_name, true);
            $family_id['id'] = \Controller\Controller::formatdata((array)$family, 'id', \Model\Table::P_INT);
            if ($post['data'] === 'TYPE')
            { 
                $types =  (array)\Model\Instrument_type::get_types_by_family_id($family_id);
                foreach ($types as $type) 
                {   
                    $post = [];
                    $post['id'] =  \Controller\Controller::formatdata((array)$type, 'id', \Model\Table::P_INT);
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
                    $post['brand_id'] = \Controller\Controller::formatdata((array)$brand, 'id', \Model\Table::P_INT);
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
            $type_name['name'] = \Controller\Controller::formatdata($post, 'name', \Model\Table::P_STRING);
            $type = \Model\Instrument_type::find_by($type_name, true);
            $type_id['id'] = \Controller\Controller::formatdata((array)$type, 'id', \Model\Table::P_INT);
            if ($post['data'] === 'BRAND')
            {
                $brands =  (array)\Model\Instrument::get_brands_by_type_id($type_id);
                foreach ($brands as $brand)
                {
                    $post = [];
                    $post['brand_id'] = \Controller\Controller::formatdata((array)$brand, 'id', \Model\Table::P_INT);
                    $post['type_id'] = $type_id['id'];
                    $count = \Model\Instrument::get_count_by($post, 'BRAND');
                    $brand->count = $count;
                }
                return $brands;
            }
            if ($post['data'] === 'INSTRUMENT')return \Model\Instrument::get_instrument($post['offset'], $post['limit'], 'TYPE', $type_id);
        }
    }

?>