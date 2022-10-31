<?php 

namespace Model;

include('../Autoloader.php');
\Autoloader::register();

class Product extends \Model\Table {

    protected static $table = "products";

    public static function get_all() {
        $stmt = self::all_items();
        $products = [];
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                "id" => $id,
                "name" => $name,
                "price" => $price,
                "description" => $description,
                "category" => $category,
                "picture" => $picture,
                "rate" => $rate
            );
             array_push($products, $e);
        }
        return $products;
    }

    public static function get_one($post) {
        return self::one_item($post);
    }

    public static function delete($post) {
        return self::delete_item($post);
    }

    public static function create_update($post, $action) {
        return self::create_update_item($post, $action);
    }
}

?>