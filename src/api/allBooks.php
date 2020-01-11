<?php 
	require 'baglan.php';
	$data = [];
	$books = $db->prepare("SELECT * FROM kitaplar INNER JOIN tur ON kitaplar.tur = tur.tur_id ");
	$books->execute([]);
	$book = $books->fetchAll(PDO::FETCH_ASSOC);
	$data["books"] = $book;
	echo json_encode($data,JSON_UNESCAPED_UNICODE);

 ?>
