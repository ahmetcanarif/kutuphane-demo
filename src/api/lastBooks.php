<?php 
require 'baglan.php';
$data = [];
$books = $db->prepare("SELECT * FROM kitaplar ORDER BY id DESC LIMIT 6");
$books->execute([]);
$book = $books->fetchAll(PDO::FETCH_ASSOC);
$data["lastBooks"] = $book;
echo json_encode($data,JSON_UNESCAPED_UNICODE);

?>
