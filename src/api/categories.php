<?php 
	require 'baglan.php';
	$data = [];
	$books = $db->prepare("SELECT * FROM tur");
	$books->execute([]);
	$book = $books->fetchAll(PDO::FETCH_ASSOC);
	$data["category"] = $book;
	echo json_encode($data,JSON_UNESCAPED_UNICODE);

 ?>
