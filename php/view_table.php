<?php
$host = "localhost"; 
$user = "root";      
$pass = "";          
$dbname = "your_database_name"; // Change to your DB name

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

$table = $_GET['name'] ?? '';
if ($table) {
    $result = $conn->query("SELECT * FROM `$table`");
    echo "<h2>Table: $table</h2>";
    if ($result && $result->num_rows > 0) {
        echo "<table border='1' cellpadding='8'><tr>";
        while ($field = $result->fetch_field()) {
            echo "<th>{$field->name}</th>";
        }
        echo "</tr>";
        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            foreach ($row as $value) {
                echo "<td>" . htmlspecialchars($value) . "</td>";
            }
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "No data found in $table.";
    }
} else {
    echo "No table selected.";
}
?>
