<?php

header("Content-Type: application/json");
include("../model/user.php");

$user = $_POST['usuario'];
$password = $_POST['contraseña'];

$result = insert($user, $password);

if (strlen($result) > 5) {
    echo '<div class="Rcontainer">
    <div class="Rbox">
        <h2 class="Rtitulo">Esta es una respuesta del servidor</h2>
        <h3 class="Rcuerpo">' . $result . '</h3>
        <a href="../php/register.html" class="cerrar">Cerrar</a>
    </div>
</div>';
} else {
    header("Location: ../php/index.html");
}
    
?>
