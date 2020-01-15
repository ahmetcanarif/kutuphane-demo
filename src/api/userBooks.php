<?php
require 'baglan.php';

$row = json_decode(file_get_contents("php://input"),true);
$data = [];
if(isset($row['token'])){
	$query = $db->prepare("SELECT * FROM uyeler WHERE user_token=?");
	$query->execute([$row['token']]);
	$user = $query->fetch(PDO::FETCH_ASSOC);
	if ($user) {
		$book = $db->prepare("SELECT * FROM islem INNER JOIN uyeler ON islem.uye_id = uyeler.id 
				INNER JOIN kitaplar ON islem.kitap_id = kitaplar.id 
				INNER JOIN tur ON kitaplar.tur = tur.tur_id WHERE uye_id=?
			");
		$book->execute([$user['id']]);
		$books = $book->fetchAll(PDO::FETCH_ASSOC);
		$bookss = [];
		foreach ($books as $value) {
			array_push($bookss, $value);
		}
		$data['readBook'] = $bookss;
	}
}
echo json_encode($data);