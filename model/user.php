<?php

function insert($user, $password)
{
        $Conexion = include("conexion.php");

        $cadena = "INSERT INTO usuario(usuario, clave) VALUES ('$user','$password')";

        try {
            $resultado = mysqli_query($Conexion, $cadena);

            if ($resultado) {
                return true;
            }
        } catch (Exception $e) {
            return substr($e, 22, 41);
        }
}
// Función para validar usuario y contraseña
function validateUser($user, $password)
{
    $Conexion = include("conexion.php");

    // Consulta segura usando prepare
    $stmt = $Conexion->prepare("SELECT clave FROM usuario WHERE usuario = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($dbPassword);
        $stmt->fetch();

        // Si las contraseñas están en texto plano
        if ($password === $dbPassword) {
            return true;
        }

        // Si usas hash (opcional)
        // if (password_verify($password, $dbPassword)) return true;

        return "USUARIO O CONTRASEÑA INCORRECTO";
    } else {
        return "USUARIO O CONTRASEÑA INCORRECTO";
    }

    $stmt->close();
}
function changePassword($currentPassword, $newPassword)
{
    // Conexión a la base de datos
    $Conexion = include("conexion.php");

    // Verificamos si existe la cookie con el usuario
    if (!isset($_COOKIE['user'])) {
        return "No hay sesión activa. Inicia sesión primero.";
    }

    $user = $_COOKIE['user']; // Usuario desde la cookie

    // Buscamos la contraseña actual en la base de datos
    $stmt = $Conexion->prepare("SELECT clave FROM usuario WHERE usuario = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        return "Usuario no encontrado.";
    }

    $stmt->bind_result($dbPassword);
    $stmt->fetch();

    // Comprobamos si la contraseña actual ingresada coincide
    if ($currentPassword !== $dbPassword) {
        return "La contraseña actual es incorrecta.";
    }

    // Si todo está bien, actualizamos la contraseña
    $update = $Conexion->prepare("UPDATE usuario SET clave = ? WHERE usuario = ?");
    $update->bind_param("ss", $newPassword, $user);

    if ($update->execute()) {
        // También actualizamos la cookie de contraseña
        setcookie('password', $newPassword, time() + 3600, '/');
        return "Contraseña modificada correctamente.";
    } else {
        return "Error al modificar la contraseña.";
    }

    // Cerramos conexiones
    $stmt->close();
    $update->close();
}


?>
<?php

