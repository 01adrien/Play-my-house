<?php

namespace App\Entity\Product;

use App\MyClass\App;

class Promo_products extends \App\Entity\Table
{
	protected static $table = "promo_product";

	public $info_price;
	public $info_promo;

	function __construct()
	{
		if ($this->promo_sold AND $this->price_sold) $this->promo_pc=($this->price_sold-$this->promo_sold)/$this->price_sold*100;
	}
	
	public function get_product($promo_id) {
		$attr = []; 
		$attr["promo_id"] = ["value" =>$promo_id, "param" => \PDO::PARAM_INT];
		return App::getDb()->prepare("SELECT `product`.*
				,`promo_product`.`ref` AS `promo_ref` 
				,`promo_product`.`price_sold` AS `promo_sold` 
				,`promo_product`.`price_pc`  AS `promo_pc` 
				FROM `promo_product` 
				LEFT JOIN `product` ON `product`.`id` = `promo_product`.`product_id` 
				WHERE `promo_id` =:promo_id", $attr, __CLASS__, false);
	}		
	

	public function findpromo($promo_id,$product_id) {
		$attr = []; 
		$attr["product_id"] = ["value" =>$product_id, "param" => \PDO::PARAM_INT];
		$attr["promo_id"] = ["value" =>$promo_id, "param" => \PDO::PARAM_INT];
		return App::getDb()->prepare("SELECT `price_pc`,`price_sold`
				FROM `promo_product` 
				WHERE `promo_id` =:promo_id AND `product_id`=:product_id", $attr, null,true);
	}	
	public function delete($id) {
		$attr = []; 
		$attr["id"] = ["value" =>$id, "param" => \PDO::PARAM_INT];
		return App::getDb()->prepare("DELETE FROM `promo_product` WHERE `promo_id` =:id", $attr);
	}
}