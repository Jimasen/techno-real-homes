<?php
header('Content-Type: application/json');

// Database connection
$host = "localhost";
$user = "root"; // Change if different
$pass = "";     // Change if you have a password
$dbname = "techno_real_homes";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Database connection failed"]));
}

// Handle different actions
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case "add":
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['name']) || empty(trim($data['name']))) {
            echo json_encode(["success" => false, "error" => "Name is required"]);
            exit;
        }

        $name = $conn->real_escape_string($data['name']);
        $description = isset($data['description']) ? $conn->real_escape_string($data['description']) : '';

        $sql = "INSERT INTO estates (name, description) VALUES ('$name', '$description')";
        if ($conn->query($sql)) {
            echo json_encode(["success" => true, "id" => $conn->insert_id]);
        } else {
            echo json_encode(["success" => false, "error" => $conn->error]);
        }
        break;

    case "list":
        $sql = "SELECT * FROM estates ORDER BY id DESC";
        $result = $conn->query($sql);
        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        echo json_encode($rows);
        break;

    default:
        echo json_encode(["success" => false, "error" => "Invalid action"]);
}

$conn->close();
?>
