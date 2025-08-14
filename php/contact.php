<?php
require_once "db.php";
require_once "functions.php";

$success = false;
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (!$name) $errors[] = "Name required.";
    if (!$message) $errors[] = "Message required.";

    if (empty($errors)) {
        $stmt = $mysqli->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $message);
        $success = $stmt->execute();
        if (!$success) $errors[] = $stmt->error;
        $stmt->close();
    }
}
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Contact Us</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <div class="container">
    <h2>Contact Us</h2>

    <?php if ($success): ?>
      <div class="notice success">Thanks — your message has been sent.</div>
    <?php endif; ?>

    <?php if ($errors): ?>
      <div class="notice error"><ul><?= "<li>" . implode("</li><li>", array_map('esc', $errors)) . "</li>" ?></ul></div>
    <?php endif; ?>

    <form method="post">
      <label>Name <input name="name" required></label>
      <label>Email <input name="email" type="email"></label>
      <label>Message <textarea name="message" required></textarea></label>
      <button class="btn primary" type="submit">Send</button>
    </form>

    <p><a href="index.php">← Back</a></p>
  </div>
</body>
</html>
