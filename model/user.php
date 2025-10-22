<?php
function insert($user, $password)
{
    $Conexion = include("conexion.php");

    // ✅ Cifrar contraseña con Bcrypt
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Usamos prepared statement para evitar inyección SQL
    $stmt = $Conexion->prepare("INSERT INTO usuario(usuario, clave) VALUES (?, ?)");
    $stmt->bind_param("ss", $user, $hashedPassword);

    try {
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    } catch (Exception $e) {
        return substr($e, 22, 41);
    }

    $stmt->close();
}

function verifyUser($user) {
    $Conexion = include("conexion.php");

    $stmt = $Conexion->prepare("SELECT usuario FROM usuario WHERE usuario = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $stmt->store_result();

    return $stmt->num_rows > 0;
}

// ✅ Validar usuario con password_verify
function validateUser($user, $password){
    $Conexion = include("conexion.php");

    $stmt = $Conexion->prepare("SELECT clave FROM usuario WHERE usuario = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($dbPassword);
        $stmt->fetch();

        // ✅ Verifica el hash Bcrypt
        if (password_verify($password, $dbPassword)) {
            return true;
        } else {
            return "USUARIO O CONTRASEÑA INCORRECTO";
        }
    } else {
        return "USUARIO O CONTRASEÑA INCORRECTO";
    }

    $stmt->close();
}

function changePassword($currentPassword, $newPassword)
{
    $Conexion = include("conexion.php");

    if (!isset($_COOKIE['user'])) {
        return "No hay sesión activa. Inicia sesión primero.";
    }

    $user = $_COOKIE['user'];

    // Obtenemos el hash actual
    $stmt = $Conexion->prepare("SELECT clave FROM usuario WHERE usuario = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        return "Usuario no encontrado.";
    }

    $stmt->bind_result($dbPassword);
    $stmt->fetch();

    // ✅ Comparamos con password_verify()
    if (!password_verify($currentPassword, $dbPassword)) {
        return "La contraseña actual es incorrecta.";
    }

    // ✅ Ciframos la nueva contraseña
    $newHashed = password_hash($newPassword, PASSWORD_BCRYPT);

    $update = $Conexion->prepare("UPDATE usuario SET clave = ? WHERE usuario = ?");
    $update->bind_param("ss", $newHashed, $user);

    if ($update->execute()) {
        // ⚠️ No guardes contraseñas en cookies nunca
        setcookie('password', '', time() - 3600, '/'); // la eliminamos por seguridad
        return "Contraseña modificada correctamente.";
    } else {
        return "Error al modificar la contraseña.";
    }

    $stmt->close();
    $update->close();
}

function deleteAccount(){
    $Conexion = include("conexion.php");

    if (!isset($_COOKIE['user'])) {
        return "No hay sesión activa. Inicia sesión primero.";
    }

    $user = $_COOKIE['user'];

    $stmt = $Conexion->prepare("DELETE FROM usuario WHERE usuario = ?");
    $stmt->bind_param("s", $user);

    if ($stmt->execute()) {
        // Borramos cookies inseguras
        setcookie('user', '', time() - 3600, '/');
        setcookie('password', '', time() - 3600, '/');
        return "Cuenta eliminada correctamente.";
    } else {
        return "Error al eliminar la cuenta.";
    }

    $stmt->close();
}
?>
