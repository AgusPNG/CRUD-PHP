<?php
date_default_timezone_set('America/Buenos_Aires');

// ✅ Obtener ID de usuario por nombre
function get_user_id_by_username($username) {
    include("conexion.php");
    $stmt = $Conexion->prepare("SELECT ID FROM usuario WHERE usuario = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($user_id);
    $stmt->fetch();
    $stmt->close();
    $Conexion->close();

    return $user_id ?: null;
}

// ✅ Registrar operación en historial y descontar stock
function historial($userId, $bookId, $type) {
    include("conexion.php");

    // Fecha de devolución solo para alquiler
    $dev_date = ($type === 'ALQUILER') ? date('Y-m-d H:i:s', strtotime('+1 minute')) : null;

    // Insertar en historial
    $stmt = $Conexion->prepare("
        INSERT INTO historial (ID_USUARIO, ID_LIBRO, TIPO, FECHA_DEVOLUCION)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->bind_param("iiss", $userId, $bookId, $type, $dev_date);
    if (!$stmt->execute()) {
        $error = $stmt->error;
        $stmt->close();
        $Conexion->close();
        return ["success" => false, "message" => "Error al registrar historial: $error"];
    }
    $stmt->close();

    // Descontar stock inmediatamente
    $Conexion->query("UPDATE libros SET STOCK = STOCK - 1 WHERE ID=$bookId AND STOCK > 0");
    $Conexion->query("UPDATE inventario SET STOCK = STOCK - 1 WHERE ID_LIBRO=$bookId AND STOCK > 0");

    $Conexion->close();
    return ["success" => true];
}

// ✅ Obtener nombre del libro
function booknames($id) {
    include("conexion.php"); 
    $stmt = $Conexion->prepare("SELECT NOMBRE FROM libros WHERE ID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($name);
    $stmt->fetch();

    $stmt->close();
    $Conexion->close();

    return $name ?: "Libro desconocido";
}
?>

