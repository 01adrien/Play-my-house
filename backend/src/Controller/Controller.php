<?php

    namespace Controller;

    Abstract class Controller 
    {
        public static function formatdata(array $post,string $champ,string $typeval) 
        {
            if (array_key_exists($champ,$post)) return ["value"=>$post[$champ],"typeval"=>(int)$typeval];
            else return ["value"=>null,"typeval"=>\Model\Table::P_NULL];
        }

        public static function check_for_valid_user($id, $keypass, $name) 
        {
            if ($_SESSION['ID'] === $keypass && $_SESSION['user_ID'] === $id && $_SESSION['user_name'] == $name ) 
            {
                return true;
            }
            return false;
        }

        public static function translate($data)
        {
            $toFrench = [
                'monday' => 'lundi', 'tuesday' => 'mardi', 'wednesday' => 'mercredi', 'thursday' => 'jeudi',
                'friday' => 'vendredi', 'saturday' => 'samedi', 'sunday' => 'dimanche'
            ];

            return $toFrench[$data];
        }


    }

?>