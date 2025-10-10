<?php
include("../model/user.php");

$user = $_POST['usuario'] ?? '';
$password = $_POST['contrasena'] ?? '';

$result = validateUser($user, $password);

if ($result === true) {
    // ✅ Login correcto → redirige al menú
    header("Location: ../php/menu.html");
    exit();
} else {
    // ❌ Login incorrecto → muestra mensaje con estilo
    echo '
    <style>
        body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background-color: rgba(0, 0, 0, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .Rbox {
            background: #fff;
            border-radius: 15px;
            padding: 30px 40px;
            text-align: center;
            box-shadow: 0 0 20px rgba(0,0,0,0.3);
            max-width: 400px;
        }
        .Rtitulo {
            font-size: 1.6em;
            margin-bottom: 15px;
            color: #2c3e50;
        }
        .Ralerta {
            background-color: #ffecec;
            border: 2px solid #ff7b7b;
            color: #c0392b;
            padding: 12px;
            border-radius: 10px;
            margin-top: 10px;
            font-weight: 600;
        }
        .cerrar {
            display: inline-block;
            margin-top: 20px;
            background-color: #3498db;
            color: #fff;
            padding: 10px 20px;
            border-radius: 8px;
            text-decoration: none;
            transition: 0.3s;
        }
        .cerrar:hover {
            background-color: #2980b9;
        }
    </style>

    <div class="Rbox">
        <h2 class="Rtitulo">💬 Respuesta del Servidor</h2>
        <div class="Ralerta">⚠️ Usuario o contraseña incorrectos</div>
        <a href="../php/index.html" class="cerrar">Volver</a>
    </div>
    ';
    exit();
}
?>
