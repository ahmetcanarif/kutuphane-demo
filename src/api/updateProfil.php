<?php
require 'baglan.php';
$ad = "";
$email = "";
$sifre = "";
$row = json_decode(file_get_contents("php://input"),true);
$data = [];
if ($row["token"]) {
	$user = $db->prepare("SELECT * FROM uyeler WHERE user_token=?");
	$user->execute([$row['token']]);
	$users = $user->fetch(PDO::FETCH_ASSOC);
	
	$row['ad'] ? $ad = $row['ad'] : $ad = $users['ad_soyad'];

	$data["ad"] = $ad;
}
echo json_encode($data);