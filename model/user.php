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
?>


<?php

