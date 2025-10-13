<?php
function bookcount() {
    $Conexion = include("conexion.php");

    // Preparamos la consulta sin parámetros
    $stmt = $Conexion->prepare("SELECT img FROM libros;");
    $stmt->execute();
    $stmt->store_result(); // Necesario para obtener num_rows

    $count = $stmt->num_rows;

    $stmt->close(); // Cerramos la sentencia
    $Conexion->close(); // Cerramos la conexión

    return $count;
}
function bookdates($id){
    $Conexion = include("conexion.php");

    $stmt = $Conexion->prepare("SELECT img FROM libros WHERE id = ?;");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->store_result();
}
?>