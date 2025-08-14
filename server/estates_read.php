<?php
// estates_read.php
header("Content-Type: application/json");
require_once "db_connect.php";

$sql = "SELECT id, name, location, price, created_at FROM estates ORDER BY created_at DESC";
$result = $conn->query($sql);

$estates = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $estates[] = $row;
    }
}

echo json_encode($estates);

$conn->close();
?>
