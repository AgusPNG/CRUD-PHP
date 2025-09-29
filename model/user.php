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