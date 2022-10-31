<?php

namespace App\Entity;
 
use App\MyClass\App;

abstract  class  Table
{

	protected static $table;

	 const  P_NULL = 0; // PARAM_NULL
	 const  P_INT = 1;  // PARAM_INT 
	 const  P_LOB = 3;  // PARAM_LOB
	 const  P_STRING = 2; // PARAM_STR
	 const  P_BOOL = 5; //PARAM_NULL 
	 


	 const  P_DATEPICKER = 100; 
	 const  P_YEAR = 101; 
	 const  P_FLOAT= 102; 
	 const  P_COLOR= 103; 
	 const  P_CHECKBOX= 104; 
	 const  P_RADIO= 105; 
	 const  P_TIMER= 106; 
	 const  P_TAUXTVA= 107;  

	private static  function getTable()
	{
		if (static::$table === null) {
			$class_name = explode('\\', get_called_class());
			static::$table = strtolower(end($class_name));
		}
		return static::$table;
	}

	
	protected static function formatvalue($data,string $typeval) : array {
		return ["value"=>$data,"typeval"=>(int)$typeval];
	} 

	protected static function formatdata(array $post,string $champ,string $typeval) : array {
		if (array_key_exists($champ,$post)) return ["value"=>$post[$champ],"typeval"=>(int)$typeval];
		else  return ["value"=>null,"typeval"=>\App\Entity\Table::P_NULL];
	} 



	protected static function PREPA_bool($data=null){
		if ($data=='true' OR $data==1) 	return ['value'=>true,"param"=>\PDO::PARAM_BOOL];
		 return ['value'=>null,"param"=>\PDO::PARAM_NULL];
	}

	protected static function PREPA_string($data=null){
		if ($data=='Null' OR $data=='' OR empty($data)) return ['value'=>null,"param"=>\PDO::PARAM_NULL];
		return ['value'=>trim($data) ?? null,"param"=>\PDO::PARAM_STR]; 
	}
	protected static function PREPA_int($int=null){
		$int=(int)intval(str_replace([' ','€',',','%'],'',$int));
		if (empty($int)) return ['value'=>null,"param"=>\PDO::PARAM_NULL];
		return ['value'=>$int,"param"=>\PDO::PARAM_INT];
	}

	protected static function PREPA_datepicker($date=null){
		if (empty($date) OR $date=="__/__/____") return ['value'=>null,"param"=>\PDO::PARAM_NULL];
		$date = date('Y-m-d',strtotime(str_replace('/', '-',$date)));
		$date = new \DateTime($date);
		$date_min = new \DateTime('1970-01-01');	
		$date_max = new \DateTime('2050-01-01 00:00:00');			
		if($date < $date_min) return ['value'=>null,"param"=>\PDO::PARAM_NULL];
		if($date > $date_max) return ['value'=>null,"param"=>\PDO::PARAM_NULL];
		return ['value'=>$date->format('Y-m-d'),"param"=>\PDO::PARAM_STR]; 
	}
	protected static function PREPA_float($float=null){
		$float=floatval(str_replace([' ','€',','],'',$float));
		if (empty($float)) return ['value'=>null,"param"=>\PDO::PARAM_NULL];
		return ['value'=>$float,"param"=>\PDO::PARAM_STR];
	}

	protected static function PREPA_color($color=null){
		if ($color=='#ffffff' OR $color=='white' OR $color=='') return ['value'=>null,"param"=>\PDO::PARAM_NULL];
		return ['value'=>trim($color) ?? null,"param"=>\PDO::PARAM_STR];  
	}
	
	protected static function PREPA_year($year=null){
		if ($year>1900 AND $year<2500)  return ['value'=>(int)$year,"param"=>\PDO::PARAM_INT]; 
		return ['value'=>null,"param"=>\PDO::PARAM_NULL];
	}


	protected static function PREPA_checkbox($box=null){
		if ($box=='' OR $box=='null'OR $box=='Null' OR empty($box)) return ['value'=>null,"param"=>\PDO::PARAM_NULL];
		$r=[]; foreach ($box as $key => $value) array_push($r,$key);
		if (count($r)==0) return null;
		return ['value'=>implode(",",$r),"param"=>\PDO::PARAM_STR]; 
	}

	protected static function PREPA_radio($radio=null){
		if (empty($radio)) return ['value'=>null,"param"=>\PDO::PARAM_NULL];
		return ['value'=>$radio,"param"=>\PDO::PARAM_STR]; 
	}

	protected static function PREPA_timer($timer=null){
		if ($timer=="00:00" OR empty($timer) OR $timer=="false" OR $timer=="__:__") return ['value'=>null,"param"=>\PDO::PARAM_NULL];
		return ['value'=>$timer,"param"=>\PDO::PARAM_STR]; 
	}

	protected static function PREPA_tauxtva($taux_tva=null){
		$taux_tva=floatval(str_replace([' ','€'],'',$taux_tva));
		return ['value'=>$taux_tva,"param"=>\PDO::PARAM_STR]; 
	}
	protected static function PREPA_lobsql($query=null){
		return ['value'=>$query,"param"=>\PDO::PARAM_LOB]; 
	}



	protected static function floatval($data=null){
		if (!empty($data)) $d=floatval(str_replace([' ','€',',','%'],'',$data));
		if (!empty($d)) return $d;
		return null;
	}
	protected static function float($data=null){
		if (!empty($data)) $d=floatval(str_replace([' ','€',',','%'],'',$data));
		if (!empty($d)) return $d;
		return null;
	}
	protected static function int($data=null){
		if (!empty($data)) return (int)intval(str_replace([' ','€'],'',$data));
		return null;
	}
	protected static function color($data=null){
		if ($data=='#ffffff' OR $data=='white' OR $data=='') return null;
		return trim($data) ?? null;
	}




	/**	Array : SQL all table
	 */
	public static  function all()
	{
		return App::getDb()->query("SELECT *,`id` AS `DT_RowId` FROM `" . static::getTable() . "` ORDER BY `id` DESC", get_called_class());
	}



	/**	Rien */
	public function __get($key)
	{
		// $methode = 'get'.ucfirst($key);
		// $this->$key = $this->$methode;
		// return $methode;
	}

	/**	Object : SQL SELECT PDO  ( ID) */
	public static  function find($id,bool $getclass = true )
	{
		$at = ['id' => ['value' => (int)$id, 'param' => \PDO::PARAM_INT]];
		if ($getclass) return App::getDb()->prepare("SELECT * FROM `" . static::getTable() . "` WHERE `id`= :id ", $at, get_called_class(), true);
		return App::getDb()->prepare("SELECT * FROM `" . static::getTable() . "` WHERE `id`= :id ", $at, null, true);
	}

	/**	Object : SQL Update PDO  (INSERT)
	 */
	public static  function update_transfere(array $attr)
	{
		$t = "`" . implode('`,`', array_keys($attr)) . "`"; 
		$a = ":" . implode(',:', array_keys($attr)); 
		$statement = "INSERT INTO `" . static::getTable() . "` (" . $t . ") VALUES (" . $a . ")";
		$prepared = App::getDb()->prepare($statement,$attr,static::getTable(),false);
		return (object)['result' => $prepared];
	}

	// /**	Retourn la clef
	//  */
	// public static  function hash(array $arg, $HashKey, $HashAlgo): string
	// {
	// 	$config=\App\MyClass\Config::getInstance();
	// 	$HashKey=$config->get('HashKey'); 
	// 	$data=implode(string $separator, $arg);
	// 	return hash_hmac($HashAlgo, $data, $HashKey);
	// }

	/**	Object : SQL Update PDO  (INSERT)
	 */
	public static  function update_id(array $attr,$id = null, bool $getfind=true) 
	{
		$COLUMN = App::getDb()->prepare("DESCRIBE `".static::getTable()."`", [], static::getTable(), false);
		$valparam=[];  // Tableau contenant les données a enregistrer
		if (is_array($attr)){
			foreach ($attr as $key => $v) {
			if (in_array($key,$COLUMN)) {  // verifie l'exitance dans la base de donnée
				if (array_key_exists('typeval',$v)){
					    if ($v['typeval']==self::P_BOOL)  $valparam[$key]=self::PREPA_bool($v['value']); 
					elseif ($v['typeval']==self::P_STRING)  $valparam[$key]=self::PREPA_string($v['value']); 
					elseif ($v['typeval']==self::P_INT)  $valparam[$key]=self::PREPA_int($v['value']); 
					elseif ($v['typeval']==self::P_YEAR)  $valparam[$key]=self::PREPA_year($v['value']);
					elseif ($v['typeval']==self::P_DATEPICKER)  $valparam[$key]=self::PREPA_datepicker($v['value']); 
					elseif ($v['typeval']==self::P_FLOAT)  $valparam[$key]=self::PREPA_float($v['value']); 
					elseif ($v['typeval']==self::P_COLOR)  $valparam[$key]=self::PREPA_color($v['value']); 
					elseif ($v['typeval']==self::P_CHECKBOX)  $valparam[$key]=self::PREPA_checkbox($v['value']); 
					elseif ($v['typeval']==self::P_RADIO)  $valparam[$key]=self::PREPA_radio($v['value']); 
					elseif ($v['typeval']==self::P_TIMER)  $valparam[$key]=self::PREPA_timer($v['value']); 
					elseif ($v['typeval']==self::P_TAUXTVA)  $valparam[$key]=self::PREPA_tauxtva($v['value']); 
					elseif ($v['typeval']==self::P_LOB)  $valparam[$key]=self::PREPA_lobsql($v['value']); 
					else  $valparam[$key]=['value'=>null,"param"=>\PDO::PARAM_NULL];
				} else $valparam[$key]=$v;
			} 
			}
		}

		$champsUpdate=[];
		$updatedata=true; // Contrôle des données si elle on changer
		if (!empty($id)) {
			$old=self::find($id,false);
			$updatedata=false;
			foreach ($valparam as $key => $v) {
				if (property_exists($old,$key) AND $old->$key!=$v['value']) { $updatedata=true; array_push($champsUpdate,$key); }
			 }
		} 

		if (!$updatedata) {
			$old=self::find($id);
			return (object)['result' => true, 'message' => "Aucune donnée mise a jour", 'data' => $old, 'prepared' =>(object)["id"=>$old->id,"result"=>true,"update"=>false,"champsUpdate"=>[]]];
			}
		
		$t = [];
		if (!empty($id)) {
			foreach ($valparam as $key => $v) array_push($t, " `$key` = :$key ");
			$c = implode(',', $t);
			$t = "`" . implode('`,`', array_keys($valparam)) . "`"; 
			$a = ":" . implode(',:', array_keys($valparam)); 
			$valparam["id"] = ["value" => $id, "param" => \PDO::PARAM_INT];
			if (in_array('updated_at', $COLUMN)) {$c .= ',`updated_at`=NOW() '; $t .= ',`updated_at`'; $a .= ',NOW() ';}
			$statement = "UPDATE `".static::getTable()."` SET " . $c . " WHERE `id`=:id";
			$nf525_type="UPDATE";
		} else {
			$t = "`" . implode('`,`', array_keys($valparam)) . "`";
			$a = ":" . implode(',:', array_keys($valparam)); 
			if (in_array('created_at', $COLUMN)) {$t .= ',`created_at`';$a .= ',NOW()';}
			if (in_array('updated_at', $COLUMN)) {$t .= ',`updated_at`';	$a .= ',NOW()';}
			$statement = "INSERT INTO `" . static::getTable() . "` (" . $t . ") VALUES (" . $a . ")";
			$nf525_type="INSERT";
		}
		$prepared = App::getDb()->prepare($statement,$valparam,static::getTable(),false);

		// return $prepared;
		$f525r=null;
		$last_id=null;
		$f525 = App::getDb()->query("SHOW TABLES LIKE 'nf525_".static::getTable()."'",null,true);
		if ($f525){
			unset($valparam['id']);
			$nf525_hashstring='';
			$last_id= App::getDb()->query("SELECT `nf525_hash` FROM `nf525_".static::getTable()."` ORDER BY `id` DESC LIMIT 1",null,true);
			$valparam['nf525_id']=['value'=>$prepared->id,"param"=>\PDO::PARAM_INT];$t .= ',`nf525_id`';	$a .= ",:nf525_id";
			$valparam['nf525_type']=['value'=>$nf525_type,"param"=>\PDO::PARAM_STR];$t .= ',`nf525_type`';	$a .= ",:nf525_type";
			$valparam['nf525_user']=['value'=>$_SESSION['user_id'],"param"=>\PDO::PARAM_INT]; $t .= ',`nf525_user`';	$a .= ",:nf525_user";
			foreach ($valparam as $key => $v) $nf525_hashstring.='|'.$v['value'];
			if ($last_id) $nf525_hashstring.='|'.$last_id->nf525_hash; else $nf525_hashstring.='|'.App::getDb()->HashKey();
			$nf525_hash= hash_hmac(App::getDb()->HashAlgo(),$nf525_hashstring, App::getDb()->HashKey());
			$valparam['nf525_hash']=['value'=>$nf525_hash,"param"=>\PDO::PARAM_STR];$t .= ',`nf525_hash`';	$a .= ",:nf525_hash";
			$fn525_stat = "INSERT INTO `nf525_". static::getTable()."` (" . $t . ") VALUES (" . $a . ")";
			App::getDb()->prepare($fn525_stat,$valparam,null,true);
		}

		$message = "Erreur d'enregistrement";
		$result= false;
		$update= false;
		$data = null;		
		if ($prepared !== null AND $prepared->result === true) {
			$message = "Données enregistrées";
			if ($getfind) $data = self::find($prepared->id);
			$result=true;
			$update=true;
			$prepared->message="Données enregistrées";
		}
		return (object)['result' => $result, 'message' => $message, 'data' => $data, 'prepared' => $prepared, 'valparam' => $valparam, 'champsUpdate' => $champsUpdate];
	}

	/**	Object : Supprime un enregistrement
	 */
	public static  function delete_id(int $id = null)
	{
		$valparam=[];
		$old=self::find($id,false);
		$attrs=[];
		$attrs['id']=['value'=>$id,"param"=>\PDO::PARAM_INT];
		$sql="DELETE FROM `".static::getTable()."` WHERE `id` = :id ";
		$delet=App::getDb()->prepare($sql,$attrs);
		if ($delet AND $delet->result){
		$delet->prepared->result=true;
		unset($old->id);
		unset($old->created_at);
		unset($old->updated_at);
		foreach ($old as $key => $value) $valparam[$key]=['value'=>$value,"param"=>\PDO::PARAM_STR];
		$t = "`" . implode('`,`',array_keys($valparam))."`"; 
		$a = ":" . implode(',:',array_keys($valparam)); 
		$f525 = App::getDb()->query("SHOW TABLES LIKE 'nf525_".static::getTable()."'",null,true);
		if ($f525){
			$nf525_hashstring='';
			$last_id= App::getDb()->query("SELECT `nf525_hash` FROM `nf525_".static::getTable()."` ORDER BY `id` DESC LIMIT 1",null,true);
			$valparam['nf525_id']=['value'=>$id,"param"=>\PDO::PARAM_INT];$t .= ',`nf525_id`';	$a .= ",:nf525_id";
			$valparam['nf525_type']=['value'=>'DELETE',"param"=>\PDO::PARAM_STR];$t .= ',`nf525_type`';	$a .= ",:nf525_type";
			$valparam['nf525_user']=['value'=>$_SESSION['user_id'],"param"=>\PDO::PARAM_INT]; $t .= ',`nf525_user`';	$a .= ",:nf525_user";
			$t .= ',`created_at`'; $a .= ',NOW() ';
			foreach ($valparam as $key => $v) $nf525_hashstring.='|'.$v['value'];
			if ($last_id) $nf525_hashstring.='|'.$last_id->nf525_hash; else $nf525_hashstring.='|'.App::getDb()->HashKey();
			$nf525_hash= hash_hmac(App::getDb()->HashAlgo(),$nf525_hashstring, App::getDb()->HashKey());
			$valparam['nf525_hash']=['value'=>$nf525_hash,"param"=>\PDO::PARAM_STR];$t .= ',`nf525_hash`';	$a .= ",:nf525_hash";
			$fn525_stat = "INSERT INTO `nf525_". static::getTable()."` (" . $t . ") VALUES (" . $a . ")";
			App::getDb()->prepare($fn525_stat,$valparam,null,true);
			}
		}
		return $delet;
	}

 
	/**	String : Date en -> fr
	 */
	public static  function time_fr($date): string
	{
		$d = explode(" ", $date);
		$d = explode("-", $d[0]);
		$d = array_reverse($d);
		$d = implode("-", $d);
		return $d;
	}

	/**	String : Date en -> fr
	 */
	public static  function date_fr($date)
	{
		if ($date=='__/__/____') return null;
		$date = str_replace(['/', '.'], '-', $date);
		$d = explode("-", $date);
		$d = array_reverse($d);
		$d = implode("-", $d);
		return $d;
	}

	/**	String : Date en -> fr
	 */
	public static  function date_export($date = null)
	{
		if (isset($date)) {
			$datetime1 = new \DateTime($date); // Date dans le passé
			$datetime2 = new \DateTime('1900-01-01');
			$interval = $datetime1->diff($datetime2);
			return $interval->format('%a');
		}
		return null;
	}

 
	/**	String : rien
	 */
	protected static function checkbox($data)
	{
		

		// $r=[]; foreach ($data as $key => $value) array_push($r,$key);
		// return implode(",",$r);
		// if(strpos($data, ',') === 0) $data=substr($data, 1);
		return $data;
	} 
	/**	String : rien
	 */
	protected static function data_filtre($data)
	{
		if(strpos($data, ',') === 0) $data=substr($data, 1);
		return $data;
	}
	/**	String : rien
	 */
	protected static function data_filtre_tab($data)
	{
		if(strpos($data, ',') === 0) $data=substr($data, 1);
		$tab = explode(',', $data);
		foreach ($tab as $key => $value) {
			if ($value==-9999) return null;
			}
		$tab = array_unique($tab);
		return implode(",", $tab);
	}

	/**	String : ajoute 
	*/
	protected static function search_filtre_entity($data){
		if(strpos($data, ',') === 0) $data=substr($data, 1);
		$a = explode(',', $data);
		$t=App::getDb()->prepare("SELECT * FROM `entity` WHERE `id` IN (" . implode(',',$a)  . ") ",[],null,false);
		$tab = array_unique($tab);
		return implode(",", $tab);

	}
	protected static function search_entity($tab_entity)
	{
		$a=[];
		$entitys = self::data_filtre($tab_entity);
	    $entitys=explode(',',$tab_entity);
	    foreach ($entitys as $key => $entity) {
	        if (!empty($entity)) array_push($a,$entity);
	        }
		if (empty($a)) {
			$config=\App\MyClass\Config::getInstance();
			$entitys=$config->get('user_connect')->accord_entity_id;
		}
		$company=[];
		$fiscal=[];
		$attr = [];
		$t=App::getDb()->prepare("SELECT * FROM `entity` WHERE `id` IN (" . implode(',',$a)  . ") ",[],null,false);
	    foreach ($t as $key => $entity) {
	    	if ($entity->funct_company) array_push($company,$entity->id);
	    	if ($entity->funct_fiscal) array_push($fiscal,$entity->id);
			}
		$sql=" AND ( ";
		if (count($company)>0) { $sql.=" `vi_buy`.`company_id` IN (" . implode(',',$company). ") "; }
		// if (count($fiscal)>0) {
		// 	if (count($company)>0) $sql.=" OR ";
		// 	$sql.=" `vi_buy`.`fiscal_id` IN (" . implode(',',$fiscal). ") "; 
		// 	}
		$sql.=" )";
		return ['sql' =>$sql, 'attr' => []];
	}

}
