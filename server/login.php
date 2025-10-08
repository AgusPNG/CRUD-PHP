<?php
// Incluimos las funciones de usuario
include("../model/user.php");

// Inicializamos variable de error
$error = "";

// Revisamos si se envió el formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $user = $_POST['usuario'] ?? '';
    $password = $_POST['contraseña'] ?? '';

    // Validamos usuario y contraseña
    $result = validateUser($user, $password);

    if ($result === true) {
        // Login correcto → redirige a index.html
        header("Location: /CRUD-PHP/php/index.html");
        exit();
    } else {
        // Login incorrecto → guardamos mensaje de error
        $error = "USUARIO O CONTRASEÑA INCORRECTO";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="/CRUD-PHP/php/css/login.css">
</head>
<body>

    <?php if (!empty($error)): ?>
        <div class="Rcontainer">
            <div class="Rbox">
                <h2 class="Rtitulo">Error de login</h2>
                <h3 class="Rcuerpo"><?= $error ?></h3>
                <a href="#" onclick="this.parentElement.parentElement.style.display='none'" class="cerrar">Cerrar</a>
            </div>
        </div>
    <?php endif; ?>

    <!-- Formulario de login -->
    <form method="POST" action="">
        <input type="text" name="usuario" placeholder="Usuario" required><br>
        <input type="password" name="contraseña" placeholder="Contraseña" required><br>
        <button type="submit">Ingresar</button>
    </form>

</body>
</html>