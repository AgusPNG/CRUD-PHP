<?php
header("Content-Type: application/json; charset=UTF-8");
include("../model/registros_inventarios.php");

$data = json_decode(file_get_contents("php://input"), true);

$user = $data["user"];

$id = get_user_id_by_username($user);
$bookids = getBookIds($id);

echo json_encode([
    "status" => "ok",
    "book" => $bookids
]);
?>