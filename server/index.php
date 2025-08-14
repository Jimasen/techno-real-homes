<?php
// Database credentials
$host = "localhost";
$user = "root";
$pass = "Gaivinesac@12";
$db   = "techno_real_homes";

// Connect to MySQL
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch estates
$sql = "SELECT * FROM estates ORDER BY created_at DESC";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Techno Real Homes</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        h1 {
            background: #333;
            color: #fff;
            padding: 15px;
            text-align: center;
        }
        .estate {
            background: #fff;
            margin: 15px auto;
            padding: 15px;
            border-radius: 5px;
            max-width: 800px;
            box-shadow: 0px 2px 6px rgba(0,0,0,0.1);
        }
        .estate h2 {
            margin-top: 0;
            color: #333;
        }
        .estate p {
            color: #555;
        }
    </style>
</head>
<body>
    <h1>Techno Real Homes</h1>

    <?php if ($result->num_rows > 0): ?>
        <?php while ($row = $result->fetch_assoc()): ?>
            <div class="estate">
                <h2><?= htmlspecialchars($row['name']) ?></h2>
                <p><?= htmlspecialchars($row['description']) ?></p>
                <small>Posted on: <?= $row['created_at'] ?></small>
            </div>
        <?php endwhile; ?>
    <?php else: ?>
        <p style="text-align:center;">No estates found.</p>
    <?php endif; ?>

</body>
</html>

<?php $conn->close(); ?>
