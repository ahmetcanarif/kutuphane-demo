<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header('Access-Control-Allow-Methods: *');

	try {
		$db = new PDO("mysql:host=localhost;dbname=kutuphane;charset=utf8","root","");
	} catch (Exception $e) {
		echo $e->getMessage();
	}
 ?>