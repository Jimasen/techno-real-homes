<?php
// backend/config.php

// Database Settings
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'techno_real_homes');

// API Settings
define('SITE_NAME', 'Techno Real Homes');
define('BASE_URL', 'http://localhost/techno-real-homes/');

// Connect to MySQL
function db_connect() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        die("Database Connection Failed: " . $conn->connect_error);
    }
    return $conn;
}
?>
