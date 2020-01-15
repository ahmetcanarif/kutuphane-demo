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
	
	isset($row['ad']) ? $ad = $row['ad'] : $ad = $users['ad_soyad'];

	if($row["action"] == "changePass"){
		if($row["payload"]["lastPass"]){
			$pass = md5($row["payload"]["lastPass"]);
			if($users["sifre"] == $pass){
				$data["lastPass"] = $users["sifre"];
				
			}
		}
	}
}
echo json_encode($data);