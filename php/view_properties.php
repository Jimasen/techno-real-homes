<?php
require_once "db.php";
require_once "functions.php";

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id) {
    $stmt = $mysqli->prepare("SELECT * FROM properties WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $res = $stmt->get_result();
    $property = $res->fetch_assoc();
    $stmt->close();
} else {
    $res = $mysqli->query("SELECT id, title, price, location, image_url FROM properties ORDER BY created_at DESC");
    $all = $res->fetch_all(MYSQLI_ASSOC);
}
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Properties</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <div class="container">
    <h2><?= $id ? esc($property['title']) : 'All Properties' ?></h2>

    <?php if ($id): ?>
      <?php if ($property): ?>
        <div class="detail">
          <img src="<?= esc($property['image_url'] ?: 'uploads/placeholder.jpg') ?>" alt="">
          <h3><?= esc($property['title']) ?></h3>
          <p><?= nl2br(esc($property['description'])) ?></p>
          <p><b>Location:</b> <?= esc($property['location']) ?></p>
          <p class="price">₦<?= number_format((float)$property['price'],2) ?></p>
        </div>
      <?php else: ?>
        <p>Property not found.</p>
      <?php endif; ?>
    <?php else: ?>
      <div class="grid">
        <?php if (!empty($all)): foreach($all as $p): ?>
          <article class="card">
            <a href="view_properties.php?id=<?= (int)$p['id'] ?>">
              <div class="thumb"><img src="<?= esc($p['image_url'] ?: 'uploads/placeholder.jpg') ?>" alt="<?= esc($p['title']) ?>"></div>
              <div class="meta">
                <h4><?= esc($p['title']) ?></h4>
                <p class="loc"><?= esc($p['location']) ?></p>
                <p class="price">₦<?= number_format((float)$p['price'],2) ?></p>
              </div>
            </a>
          </article>
        <?php endforeach; else: ?>
          <p>No properties yet.</p>
        <?php endif; ?>
      </div>
    <?php endif; ?>
    <p><a href="index.php">← Back</a></p>
  </div>
</body>
</html>
