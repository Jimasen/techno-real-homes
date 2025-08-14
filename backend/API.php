<?php
// backend/API.php
header('Content-Type: application/json');
require_once 'config.php';
require_once 'functions.php';

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'get_pages':
        echo json_encode(get_all_pages());
        break;

    case 'get_placeholders':
        echo json_encode(get_all_placeholders());
        break;

    case 'approve_popup':
        $userId = $_POST['user_id'] ?? null;
        if ($userId) {
            echo json_encode(['status' => 'success', 'message' => 'User approved notifications']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'User ID missing']);
        }
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
}
?>
