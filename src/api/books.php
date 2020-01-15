<?php 
	require 'baglan.php';
	$row = json_decode(file_get_contents("php://input"),true);
	$data = [];
	if($row["action"] == "allbooks"){
		$books = $db->prepare("SELECT * FROM kitaplar INNER JOIN tur ON kitaplar.tur = tur.tur_id ");
		$books->execute([]);
		$book = $books->fetchAll(PDO::FETCH_ASSOC);
		$data["books"] = $book;
	}
	if($row["action"] == "popularbook"){
		$books = $db->prepare("SELECT * FROM kitaplar ORDER BY hit DESC LIMIT 6");
		$books->execute([]);
		$book = $books->fetchAll(PDO::FETCH_ASSOC);
		$data["popularBooks"] = $book;
	}
	if($row["action"] == "lastbook"){
		$books = $db->prepare("SELECT * FROM kitaplar ORDER BY id DESC LIMIT 6");
		$books->execute([]);
		$book = $books->fetchAll(PDO::FETCH_ASSOC);
		$data["lastBooks"] = $book;
	}
	echo json_encode($data,JSON_UNESCAPED_UNICODE);

 ?>
