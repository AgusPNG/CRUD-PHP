<?php
header("Content-Type: application/json; charset=UTF-8");
include("../model/books.php");

$result = bookcount();
echo json_encode([
        "status" => "ok",
        "message" => "$result"
    ]);
?>