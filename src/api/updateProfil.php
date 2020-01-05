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
	if($row["sifre"] != ""){
		$sifre = $row["sifre"];
	}else{
		$sifre = $users["sifre"];
	}
	if($row["ad"] != ""){
		$ad = $row["ad"];
	}else{
		$ad = $users["ad_soyad"];
	}
	



	$data["sifre"] = $sifre;
	$data["ad"] = $ad_soyad;
}
echo json_encode($data);