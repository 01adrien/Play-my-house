<?php 

    namespace Model;

    class instrument_brand extends \Model\Table 
    {
        protected static $table = "instruments_brand";
        
        public static function get_count_by_brand()
        {
            $brands =  \Model\Instrument_brand::get_all();
            foreach ($brands as $brand)
            {   
                $brand = (object)$brand;
                $attr['brand_id'] = \Controller\Controller::formatdata((array)$brand, 'id', \Model\Table::P_INT);
                $brand->count = \Model\Instrument::get_count_by($attr, 'ALL_BRAND');
            }
            return $brands;

        }
    }


?>