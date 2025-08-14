<?php
// backend/functions.php

function get_all_pages() {
    $conn = db_connect();
    $result = $conn->query("SELECT id, title, slug FROM pages");
    $pages = [];
    while ($row = $result->fetch_assoc()) {
        $pages[] = $row;
    }
    return $pages;
}

function get_all_placeholders() {
    $conn = db_connect();
    $result = $conn->query("SELECT id, name, content FROM placeholders");
    $placeholders = [];
    while ($row = $result->fetch_assoc()) {
        $placeholders[] = $row;
    }
    return $placeholders;
}
?>
