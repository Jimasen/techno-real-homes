<?php
require_once "db.php";
header('Content-Type: application/json');

$res = $mysqli->query("SELECT id, title, price, location, image_url FROM properties ORDER BY created_at DESC");
$data = $res ? $res->fetch_all(MYSQLI_ASSOC) : [];
echo json_encode(["status" => "success", "data" => $data]);
