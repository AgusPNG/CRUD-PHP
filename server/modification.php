<?php
include("../model/user.php");

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $currentPassword = $_POST['contraseñaActual'] ?? '';
    $newPassword = $_POST['nuevaContraseña'] ?? '';

    if (empty($currentPassword) || empty($newPassword)) {
        echo json_encode(['mensaje' => 'Debes completar todos los campos.', 'exito' => false]);
        exit;
    }

    $resultado = changePassword($currentPassword, $newPassword);

    // Definir éxito si el mensaje contiene ciertas palabras
    $exito = stripos($resultado, 'correcta') !== false || stripos($resultado, 'éxito') !== false;

    echo json_encode(['mensaje' => $resultado, 'exito' => $exito]);

} else {
    echo json_encode(['mensaje' => 'Acceso denegado.', 'exito' => false]);
}
?>
