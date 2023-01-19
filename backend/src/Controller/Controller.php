<?php

    namespace Controller;

    Abstract class Controller 
    {
        public static function formatdata($post, $champ, $typeval) 
        {
            if (array_key_exists($champ,$post)) {
            return ["value" => $post[$champ], "typeval" => (int)$typeval];
            }
            else return ["value" => null, "typeval" => \Model\Table::P_NULL];
        }

        public static function translate($data)
        {
            $toFrench = [
                'monday' => 'lundi', 'tuesday' => 'mardi', 'wednesday' => 'mercredi', 'thursday' => 'jeudi',
                'friday' => 'vendredi', 'saturday' => 'samedi', 'sunday' => 'dimanche'
            ];

            return $toFrench[$data];
        }
        
        public static function sanitize_input($post) 
        {
            foreach ($post as $key => $value) 
            {
                $post[$key] = trim($post[$key]);
                $post[$key] = stripslashes($post[$key]);
                $post[$key] = htmlspecialchars($post[$key], ENT_QUOTES, 'UTF-8');
                $post[$key] = strip_tags($post[$key]);
            }
            return $post;
        }

        public static function regenerate_session()
        {
            if($_SESSION['timeout'])
            {
                $diff = $_SESSION['timeout']->diff(new \DateTime());
                $sec = $diff->s;
                if ($sec > 120) session_regenerate_id();
            }
        }

    }

?>