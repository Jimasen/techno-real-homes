<?php
$servername = "127.0.0.1";
$username = "root";
$password = "Gaivinesac@12";
$dbname = "techno_real_homes";

// Connect to MySQL
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// Fetch latest 9 properties
$sql = "SELECT id, title, description, price, location, image_url, created_at
        FROM properties
        ORDER BY created_at DESC
        LIMIT 9";

$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Techno Real Homes - Properties</title>
<style>
  body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f0f0f0; }
  h1 { text-align: center; padding: 20px 0; }
  .container { max-width: 1000px; margin: 0 auto; padding: 10px; display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; }
  .card { background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); width: 300px; overflow: hidden; display: flex; flex-direction: column; }
  .card img { width: 100%; height: 180px; object-fit: cover; }
  .card-content { padding: 15px; flex-grow: 1; display: flex; flex-direction: column; }
  .card-content h2 { margin: 0 0 10px; font-size: 1.2rem; }
  .card-content p { flex-grow: 1; font-size: 0.9rem; color: #555; }
  .card-content .price { font-weight: bold; margin-top: 10px; font-size: 1.1rem; color: #0a74da; }
  @media(max-width: 650px) {
    .container { flex-direction: column; align-items: center; }
    .card { width: 90%; }
  }
</style>
</head>
<body>
<h1>Latest Properties</h1>
<div class="container">
<?php if ($result && $result->num_rows > 0): ?>
    <?php while($row = $result->fetch_assoc()): ?>
      <div class="card">
        <?php if(!empty($row['image_url'])): ?>
          <img src="<?= htmlspecialchars($row['image_url']) ?>" alt="<?= htmlspecialchars($row['title']) ?>" />
        <?php else: ?>
          <img src="https://via.placeholder.com/300x180?text=No+Image" alt="No Image Available" />
        <?php endif; ?>
        <div class="card-content">
          <h2><?= htmlspecialchars($row['title']) ?></h2>
          <p><?= htmlspecialchars(substr($row['description'], 0, 120)) ?>...</p>
          <div class="price">$<?= number_format($row['price'], 2) ?></div>
          <small><?= htmlspecialchars($row['location']) ?></small>
        </div>
      </div>
    <?php endwhile; ?>
<?php else: ?>
    <p>No properties found.</p>
<?php endif; ?>
</div>
</body>
</html>
<?php $conn->close(); ?>
