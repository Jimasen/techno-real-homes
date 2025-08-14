<?php
header('Content-Type: application/json');

$prompt = $_POST['prompt'] ?? 'Hello AI';
$url = 'http://localhost:5000/ai/generate';

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['prompt' => $prompt]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);
if (curl_errno($ch)) {
    echo json_encode(['success' => false, 'error' => curl_error($ch)]);
    exit;
}
curl_close($ch);

echo $response;
