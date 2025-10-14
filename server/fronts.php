<?php
header("Content-Type: application/json; charset=UTF-8");
include("../model/books.php");

$count = bookcount();
$imgs = [];
$names = [];

for ($i = 1; $i <= $count; $i++) {
    $imgs[] = bookurls($i);
    $names[] = booknames($i);
}

echo json_encode([
    "status" => "ok",
    "url" => $imgs,
    "name" => $names,
    "count" => $count
]);
?>