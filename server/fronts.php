<?php
header("Content-Type: application/json; charset=UTF-8");
include("../model/books.php");

$count = bookcount();
$imgs = [];
$names = [];
$id = [];
$genders = [];

for ($i = 1; $i <= $count; $i++) {
    $imgs[] = bookurls($i);
    $names[] = booknames($i);
    $genders[] = bookgenders($i);
    $id[] = $i;
}

echo json_encode([
    "status" => "ok",
    "url" => $imgs,
    "name" => $names,
    "count" => $count,
    "gender" => $genders,
    "id" => $id
]);
?>