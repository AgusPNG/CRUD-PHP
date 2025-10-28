<?php
header("Content-Type: application/json; charset=UTF-8");

// 💡 Incluimos las nuevas funciones del modelo
include("../model/registros_inventarios.php"); 

// Recibir los datos JSON de la solicitud POST
$data = json_decode(file_get_contents("php://input"), true);

// Verificar si se recibieron los datos esperados
if (!isset($data['book_id'], $data['username'], $data['type'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Faltan datos requeridos (ID del libro, usuario o tipo de operación)."
    ]);
    exit;
}

$book_id = (int)$data['book_id'];
$username = $data['username'];
$type = strtoupper($data['type']); // Aseguramos que sea 'COMPRA' o 'ALQUILER'

// 1. Obtener el ID numérico del usuario
$user_id = get_user_id_by_username($username);

if (!$user_id) {
    echo json_encode([
        "status" => "error",
        "message" => "Usuario no encontrado en la base de datos."
    ]);
    exit;
}

// 2. Registrar la transacción en el historial
$result = historial($user_id, $book_id, $type);
$book_name = booknames($book_id); // Obtener el nombre del libro para el mensaje de respuesta

if ($result['success']) {
    // La inserción fue exitosa y los triggers de MySQL ya actualizaron el stock
    echo json_encode([
        "status" => "ok",
        "book_name" => $book_name,
        "message" => "Transacción registrada con éxito."
    ]);
} else {
    // Hubo un error al insertar (ej: clave foránea, error de DB)
    echo json_encode([
        "status" => "error",
        "book_name" => $book_name,
        "message" => $result['message']
    ]);
}


?>