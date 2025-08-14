<?php
// db.php
$DB_HOST = "127.0.0.1";
$DB_USER = "root";
$DB_PASS = "Gaivinesac@12";
$DB_NAME = "techno_real_homes";
$DB_PORT = 3306;

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, $DB_PORT);
if ($mysqli->connect_errno) {
    http_response_code(500);
    die("Database connection failed: " . $mysqli->connect_error);
}
$mysqli->set_charset("utf8mb4");
