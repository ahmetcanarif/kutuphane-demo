<?php 
include 'baglan.php';

$data = [];
$row = json_decode(file_get_contents("php://input"),true);
$id = $row["id"];
if($id){
		$books = $db->prepare("SELECT * FROM kitaplar INNER JOIN tur ON kitaplar.tur = tur.tur_id WHERE id=?");
	$books->execute([$id]);
	$book = $books->fetch(PDO::FETCH_ASSOC);
}
$data["book"] = $book;
echo json_encode($data);