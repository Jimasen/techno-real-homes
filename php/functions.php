<?php
// functions.php
function esc($s) {
    return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
}

function base_url() {
    // update if you serve under a different host/path
    return "/";
}
