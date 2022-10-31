<?php

namespace App\Entity\Product;

use App\MyClass\App;

class Promo extends \App\Entity\Table
{

	protected static $table = "promo";

	 public $DT_RowClass = null;
	 public $data = null;


	function __construct()
	{

		$now       = new \DateTime('now');
		$start = new \DateTime($this->start);
		$end   = new \DateTime($this->end);

		if ($start<=$now AND $end>$now ) $this->DT_RowClass='bg-teal';
		$this->data=$now->format('Y-m-d');
	}

	public function get_all() {
		$attr = []; 
		$prepared = App::getDb()->prepare("SELECT * FROM `promo`", $attr, __CLASS__, false);
		return $prepared;
	}

	public function get_promo() {
		return  App::getDb()->prepare("SELECT `id` FROM `promo` WHERE `actif` IS NOT NULL AND NOW() BETWEEN `start` AND `end` ",[], null, true);
	}


	
	
}

