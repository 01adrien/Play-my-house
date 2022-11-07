<?php

    namespace Controller;

    include_once('../Autoloader.php');
    \Autoloader::register();

    Abstract class Controller {
        
        public static function formatdata(array $post,string $champ,string $typeval) {
            if (array_key_exists($champ,$post)) return ["value"=>$post[$champ],"typeval"=>(int)$typeval];
            else return ["value"=>null,"typeval"=>\Model\Table::P_NULL];
        } 

    }

?>