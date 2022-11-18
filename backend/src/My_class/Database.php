<?php 
    namespace My_class;

    include_once('/home/adrien/Bureau/titre_pro/projet/backend/src/Autoloader.php');
    \Autoloader::register();

    class Database {
        private static $conn;
        private $db_name;
        private $db_user;
        private $db_pass;
        private $db_host;
        private $pdo;


        public function __construct($db_name='',$db_user='',$db_pass='',$db_host='localhost'){
            $this->db_name=$db_name;
            $this->db_user=$db_user;
            $this->db_pass=$db_pass;
            $this->db_host=$db_host;
        }

        public function getPDO(){ 
            if ($this->pdo === null){
                $pdo = new \PDO("mysql:host=".$this->db_host.";dbname=".$this->db_name,$this->db_user, $this->db_pass);	
                $this->pdo = $pdo;
            } else $pdo = $this->pdo;
            return $pdo;
        }

        public function query($statement, $class_name = null, $one = false){
            $req = $this->getPDO()->query($statement);
            if($class_name) $req->setFetchMode(\PDO::FETCH_CLASS, $class_name);
            else $req->setFetchMode(\PDO::FETCH_OBJ);
            if($one) return $req->fetch(\PDO::FETCH_ASSOC);
            else return $req->fetchAll(\PDO::FETCH_ASSOC);
        }

        public function last_insert_id(){
            return $this->getPDO()->lastInsertId();
        }

        public function prepare($statement, array $attributes, $class_name = null, $one = false){
            try {
                $req = $this->getPDO()->prepare($statement);
                
                foreach ($attributes as $key => $data) {
                    if ($data["value"] === null) $data["typeval"]=\PDO::PARAM_NULL;
                    $req->bindParam(':'.$key, $data["value"], $data["typeval"]);
                    }
                $result = $req->execute();
                $value=null;
                if (array_key_exists('id',$attributes)) $value=$attributes['id']['value'];
                if(strpos($statement,'INSERT') === 0) return (object)["result" => $result,"id" => (int)$this->getPDO()->lastInsertId()];
                elseif( strpos($statement,'UPDATE') === 0 ) return (object)["result"=>$result,"id" => (int)$value ?? null];
                elseif(strpos($statement,'DELETE') === 0 ) return (object)["result"=>$result, "id" => (int)$value];
            } 
            catch(\PDOException $e) { return "Error!: " . $e->getMessage();}

            if(strpos($statement, 'DESCRIBE') === 0 ) return $req->fetchAll(\PDO::FETCH_COLUMN);
            elseif($class_name === null)  $req->setFetchMode(\PDO::FETCH_OBJ);
            else  $req->setFetchMode(\PDO::FETCH_CLASS, $class_name);
            if($one) $datas = $req->fetch();
            else $datas = $req->fetchAll();
            $req->closeCursor();
            return $datas;
        }
    }

?>

