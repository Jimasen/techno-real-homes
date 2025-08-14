<?php
$host = "localhost";
$user = "root";
$pass = "Gaivinesac@12";
$db   = "techno_real_homes";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST['name'];
    $desc = $_POST['description'];

    $stmt = $conn->prepare("INSERT INTO estates (name, description) VALUES (?, ?)");
    $stmt->bind_param("ss", $name, $desc);
    $stmt->execute();
    $stmt->close();

    echo "<p style='color:green;'>Estate added successfully!</p>";
}
?>

<form method="POST">
    <label>Estate Name:</label><br>
    <input type="text" name="name" required><br><br>

    <label>Description:</label><br>
    <textarea name="description" required></textarea><br><br>

    <button type="submit">Add Estate</button>
</form>
