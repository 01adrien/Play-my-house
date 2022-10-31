<?php

namespace App\Controller\Product;

use App\MyClass\App;
use App\Controller\Admin\Configurator;

/**
 *  
 */
class Promo extends \App\Controller\Controller
{
	function __construct()
	{
		# code... 
	}

	/** page de gestion des produits
	*/
	public static function home($page, $twig)
	{
		$config = \App\MyClass\Config::getInstance();
		$twig->addGlobal('current_page', $page);
		$option = [];
		$option["keytime"] = ['time' => time(), "pass" => md5($config->get('keyMd5') . time())];
		$option["vendorjs"] = $config->get('vendorjs');
		$option["assets"]=$config->get('assets');
		$option["currency"]['title']['title'] = 'Catalogue : Produits';
		$option["currency"]['title']['compte'] = $config->get('compte_name');
		$option["twig"] = $config->get('data');
		return $twig->render('Product/Promo.twig', $option);
	}

	public static function get_all(array $post){
		 $data=\App\Entity\Product\Promo::get_all();
		 return ['data'=> $data];
	}

	public static function get_product(array $post) {
	 	return \App\Entity\Product\Promo_products::get_product($post['id']);	
	}

	public static function post(array $post)
	{
		$attr=[];
		$attr['actif']=self::formatdata($post,'actif',\App\Entity\Table::P_BOOL);
		$attr['name']=self::formatdata($post,'name',\App\Entity\Table::P_STRING);
		$attr['start']=self::formatdata($post,'start',\App\Entity\Table::P_DATEPICKER);
		$attr['end']=self::formatdata($post,'end',\App\Entity\Table::P_DATEPICKER);
		return \App\Entity\Product\Promo::update_id($attr,$post['id']);
	}

	public static function delete_light(array $post)
	{
		\App\Entity\Product\Promo_products::delete($post['id']);
		return \App\Entity\Product\Promo::delete_id($post['id']);
	}

	public function add_reference(array $post) 
	{	
		if (is_uploaded_file($_FILES['file']['tmp_name'])){
			$reader = \PHPExcel_IOFactory::createReaderForFile($_FILES['file']['tmp_name']);
			$reader->setReadDataOnly(true);
			$PHPExcel_IOFactory = $reader->load($_FILES['file']['tmp_name']);
			$sheetData = $PHPExcel_IOFactory->getActiveSheet()->toArray(); 
			$return = []; 
			\App\Entity\Product\Promo_products::delete($post['id']);
			$return =[];
			foreach ($sheetData as $key => $row) {
				$ref=trim($row[0]) ?? null; 
				$ref = str_replace('~','', $ref);
				$price_sold =$row[1] ?? null; 
				$price_pc=$row[2] ?? null;
				$product = \App\Entity\Product\Product::search_refex($ref);
				$attr=[];
				if (strlen($ref)>4) {
					$attr['ref']=self::formatvalue($ref,\App\Entity\Table::P_STRING);
					$attr['promo_id']=self::formatvalue($post['id'],\App\Entity\Table::P_INT);
					if ($product) $attr['product_id']=self::formatvalue($product->id,\App\Entity\Table::P_INT);
					$attr['price_sold']=self::formatvalue($price_sold,\App\Entity\Table::P_FLOAT);
					$attr['price_pc']=self::formatvalue($price_pc,\App\Entity\Table::P_FLOAT);
					\App\Entity\Product\Promo_products::update_id($attr);
					}
			}	
			return \App\Entity\Product\Promo_products::get_product($post['id']);
		}
	}

}

