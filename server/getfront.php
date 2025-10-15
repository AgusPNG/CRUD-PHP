<?php
header("Content-Type: application/json; charset=UTF-8");
include("../model/books.php");

// 1. Decodificamos el cuerpo JSON en un array asociativo
$data = json_decode(file_get_contents("php://input"), true);

// 2. 💡 CORRECTO: Accedemos al ID usando la clave "id"
$id = $data["id"]; 

// 3. Ahora $id es el entero y se pasa correctamente a las funciones
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