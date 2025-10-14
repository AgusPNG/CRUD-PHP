<?php
header("Content-Type: application/json; charset=UTF-8");
include("../model/books.php");

$id = json_decode(file_get_contents("php://input"), true);

//$id = $data["id"];

$img = bookurls($id);
$name = booknames($id);
$gender = bookgenders($id);

echo json_encode([
    "status" => "ok",
    "url" => $img,
    "gender" => $gender,
    "name" => $name
]);
?>