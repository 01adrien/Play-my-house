<?php 

    namespace Controller;

    class Reservation extends \Controller\Controller
    {
        public static function get_instrument_disponibility($post)
        {   
            $attr['id'] = self::formatdata($post, 'id', \Model\Table::P_INT);
            $timeline_id_by_day = \Model\Instrument::get_instrument_disponibility($attr);
            $data = [];
            $final_data = [];
            foreach($timeline_id_by_day[0] as $day => $val)
            {
                if (!$val) '';
                else 
                {
                    $id['id'] = self::formatdata(['id' => $val], 'id', \model\Table::P_INT);
                    $timeLine = \Model\Timeline_day::get_by_ID($id);
                    unset($timeLine->id);
                    $i = 1;
                    foreach($timeLine as $k => $v)
                    {   
                        if ((int)$v > 0){
                            $data[$day][$v][] = $k ;
                        }
                    }
                }                
                if (gettype($day) === string) 
                {   
                    foreach ($data[$day] as $key => $value)
                    {   
                        if (count($value) === 2) 
                        {
                            if (!isset($final_data[$day])) {
                                $final_data[$day] = $value[0].'h-'.$value[1] . "h | ";
                            } else {
                                $final_data[$day] .= $value[0].'h-'.$value[1] . "h | ";
                            }
                        } 
                        if (count($value) > 2)
                        {   
                            if (!isset($final_data[$day])) {
                                $final_data[$day] = $value[0] .'h-'.$value[count($value)-1] . "h | ";
                            } else {
                                $final_data[$day] .= $value[0].'h-'.$value[count($value)-1] . "h | ";
                            }
                        }
                    }
                }
            }
            return $final_data;
        }
    }
?>