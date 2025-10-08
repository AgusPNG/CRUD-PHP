<?php

$servername = "localhost";
$dbname = "2t";

$conn = new mysqli($servername, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Error en la conexión a la base de datos']);
    exit();
}

// Consulta para obtener el link de la imagen (ejemplo con id=1)
$sql = "SELECT IMG FROM libros WHERE id = 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(['imageUrl' => $row['image_url']]);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'No se encontró el registro']);
}
$conn->close();