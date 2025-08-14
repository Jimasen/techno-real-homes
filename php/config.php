<?php
// config.php
$host = "127.0.0.1";
$dbname = "techno_real_homes";
$username = "root";
$password = "Gaivinesac@12";
$port = 3306;

// Set up PDO connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["error" => "Database connection failed: " . $e->getMessage()]));
}
?>
