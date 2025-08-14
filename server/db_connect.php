<?php
// db_connect.php

$host = "localhost";      // Database server
$user = "root";           // MariaDB username
$pass = "Gaivinesac@12";  // Replace with your MariaDB root password
$dbname = "techno_real_homes"; // Database name

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Optional: Set character set to UTF-8
$conn->set_charset("utf8");

?>
