<?php
function bookcount() {
    include("conexion.php");

    // Preparamos la consulta sin parámetros
    $stmt = $Conexion->prepare("SELECT img FROM libros;");
    $stmt->execute();
    $stmt->store_result(); // Necesario para obtener num_rows

    $count = $stmt->num_rows;

    $stmt->close(); // Cerramos la sentencia
    $Conexion->close(); // Cerramos la conexión

    return $count;
}
function bookurls($id) {
    include("conexion.php");

    $stmt = $Conexion->prepare("SELECT img FROM libros WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    // Vinculamos el resultado
    $stmt->bind_result($img);
    $stmt->fetch();

    // Cerramos recursos
    $stmt->close();
    $Conexion->close();

    return $img; // devuelve el valor real, no null
}

function bookstocks($id) {
    include("conexion.php");

    $stmt = $Conexion->prepare("SELECT stock FROM libros WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    // Vinculamos el resultado
    $stmt->bind_result($stock);
    $stmt->fetch();

    // Cerramos recursos
    $stmt->close();
    $Conexion->close();

    return $stock;
}

function bookgenders($id) {
    include("conexion.php");

    $stmt = $Conexion->prepare("SELECT genero FROM libros WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    // Vinculamos el resultado
    $stmt->bind_result($gender);
    $stmt->fetch();

    // Cerramos recursos
    $stmt->close();
    $Conexion->close();

    return $gender; // devuelve el valor real, no null
}
function booknames($id) {
    include("conexion.php");

    $stmt = $Conexion->prepare("SELECT nombre FROM libros WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    // Vinculamos el resultado
    $stmt->bind_result($name);
    $stmt->fetch();

    // Cerramos recursos
    $stmt->close();
    $Conexion->close();

    return $name; // devuelve el valor real, no null
}

?>