<?php
header("Content-Type: application/json; charset=UTF-8");
include("../model/user.php");

// Decodificar datos enviados desde el fetch del frontend
$data = json_decode(file_get_contents("php://input"), true);

// Validar datos obligatorios
if (!isset($data["user"]) || !isset($data["password"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Faltan datos obligatorios"
    ]);
    exit;
}

$user = trim($data["user"]);
$password = trim($data["password"]);

// Verificar usuario y contraseña (usa password_verify dentro de user.php)
$result = validateUser($user, $password);

if ($result === true) {
    // ✅ Login correcto
    echo json_encode([
        "status" => "ok",
        "message" => "Usuario logueado correctamente"
    ]);
} else {
    // ❌ Login incorrecto o usuario no encontrado
    echo json_encode([
        "status" => "error",
        "message" => "Usuario o contraseña incorrectos"
    ]);
}
?>
