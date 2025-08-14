<?php
require_once "db.php";
require_once "functions.php";

$errors = [];
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $price = $_POST['price'] ?? 0;
    $location = $_POST['location'] ?? '';

    // handle image upload
    $image_url = '';
    if (!empty($_FILES['image']['name'])) {
        $upload_dir = __DIR__ . '/uploads/';
        if (!is_dir($upload_dir)) mkdir($upload_dir, 0755, true);

        $ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
        $allowed = ['jpg','jpeg','png','webp'];
        if (!in_array($ext, $allowed)) {
            $errors[] = "Invalid image type.";
        } else {
            $fname = uniqid('p_') . '.' . $ext;
            $target = $upload_dir . $fname;
            if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
                $image_url = 'uploads/' . $fname;
            } else {
                $errors[] = "Upload failed.";
            }
        }
    }

    if (empty($title)) $errors[] = "Title required.";
    if (empty($errors)) {
        $stmt = $mysqli->prepare("INSERT INTO properties (title, description, price, location, image_url) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdss", $title, $description, $price, $location, $image_url);
        if ($stmt->execute()) {
            $success = true;
        } else {
            $errors[] = $stmt->error;
        }
        $stmt->close();
    }
}
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Add Property</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <div class="container">
    <h2>Add new property</h2>

    <?php if ($success): ?>
      <div class="notice success">Property added successfully. <a href="view_properties.php">View all</a></div>
    <?php endif; ?>

    <?php if (!empty($errors)): ?>
      <div class="notice error">
        <ul><?= "<li>" . implode("</li><li>", array_map('esc', $errors)) . "</li>" ?></ul>
      </div>
    <?php endif; ?>

    <form method="post" enctype="multipart/form-data">
      <label>Title <input name="title" required></label>
      <label>Location <input name="location"></label>
      <label>Price <input name="price" type="number" step="0.01"></label>
      <label>Description <textarea name="description"></textarea></label>
      <label>Image <input name="image" type="file" accept="image/*"></label>
      <button class="btn primary" type="submit">Save</button>
    </form>

    <p><a href="index.php">← Back</a></p>
  </div>
</body>
</html>
