<?php
require_once 'baglan.php';
$data = [];
$row = json_decode(file_get_contents("php://input"),true);
if (isset($row["username"])) {
	$username = $row["username"];
}
if (isset($row["password"])) {
	$password = $row["password"];
}
if (isset($row["token"])) {
	$token = $row["token"];
}
if(isset($token)){
$query = $db->prepare("SELECT * FROM uyeler  INNER JOIN yetki ON uyeler.yetki_id = yetki.yetki_id   WHERE user_token=?");
		$query->execute([$token]);
		$user = $query->fetch(PDO::FETCH_ASSOC);
		if (!$user) {
			$data["message"]["status"] = "error";
			$data["message"]["message"] = "Böyle bir kullanıcı bulunamadı.";
		}else{
			$data["user"] = $user;
		}
}else{
	if ($username && $password) {
		$query = $db->prepare("SELECT * FROM uyeler  WHERE email=? and sifre=?");
		$query->execute([$username,md5($password)]);
		$user = $query->fetch(PDO::FETCH_ASSOC);
		if (!$user) {
			$data["message"]["status"] = "error";
			$data["message"]["message"] = "Böyle bir kullanıcı bulunamadı";
		}else{	
			$sorgu = $db->prepare("SELECT * FROM uyeler INNER JOIN yetki ON uyeler.yetki_id = yetki.yetki_id  where uyeler.id=?");
			$sorgu->execute([$user['id']]);
			$rows = $sorgu->fetch(PDO::FETCH_ASSOC);
			$data["user"] = $rows;
			$data["message"]["status"] = "success";
			$data["message"]["message"] = "Giriş işlemi başarıyla tamamlandı. Yönlendiriliyorsunuz";
		}
	}else{
		$data["error"]["status"] = "error";
		$data["error"]["message"] = "Lütfen gerekli alanları doldurunuz.";
	}	
}

echo json_encode($data);