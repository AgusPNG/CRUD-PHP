<?php
header("Content-Type: application/json; charset=UTF-8");
include("../model/registros_inventarios.php");

$data = json_decode(file_get_contents("php://input"), true);

$historicId = $data["historicId"];
$bookId = $data["bookId"];

returnStock($historicId, $bookId);
?>