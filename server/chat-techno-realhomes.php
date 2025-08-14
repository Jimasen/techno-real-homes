<?php
header('Content-Type: application/json');

$data = [
    "status" => "success",
    "message" => "Download script running for Techno Real Homes"
];

echo json_encode($data);
?>
