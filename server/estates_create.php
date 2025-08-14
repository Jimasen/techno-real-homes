<?php
// estates_create.php
header("Content-Type: application/json");
require_once "db_connect.php";

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name']) || !isset($data['location']) || !isset($data['price'])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$name = $conn->real_escape_string($data['name']);
$location = $conn->real_escape_string($data['location']);
$price = $conn->real_escape_string($data['price']);

$sql = "INSERT INTO estates (name, location, price) VALUES ('$name', '$location', '$price')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Estate added successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
?>

