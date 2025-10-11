<?php
include("../model/user.php");

$user = $_POST['usuario'] ?? '';
$password = $_POST['contrasena'] ?? '';

$result = validateUser($user, $password);


if ($result === true) {
    // ✅ Login correcto → redirige al menú
    header("Location: ../php/menu.html");
    exit();



 else {
    // ❌ Login incorrecto → muestra mensaje con estilos actualizados
    echo '
    <style>
        /* ========================================================== */
        /* 1. FONT Y FONDO GENERAL (Adaptado de tu diseño original) */
        /* ========================================================== */

        @font-face {
            font-family: \'KomikaAxis\';
            /* RUTA CRÍTICA: Ajusta la ruta a tu carpeta de fuentes */
            src: url(\'../php/css/fonts/KomikaAxis.ttf\') format(\'truetype\');
            font-weight: normal;
            font-style: normal;
        }

        body {
            /* Fuente de tu diseño */
            font-family: \'KomikaAxis\', sans-serif;
            
            /* Fondo de tu diseño */
            background-image: url("../php/css/img/bookshelf_bl.jpg"); 
            background-size: cover; 
            background-position: center center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            
            
            color: white; /* Color de texto general para tu fondo oscuro */
            
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }
        /* ========================================================== */
/* 2. ESTILOS DE TARJETA Y BOTÓN (Aplicando temática de madera)*/
/* ========================================================== */

/* Estilo de tarjeta (Mantiene el aspecto limpio y moderno) */
.Rbox {
    /* PROPIEDADES NUEVAS/MODIFICADAS para el aspecto de madera */
    /* RUTA CRÍTICA: Asegúrate de que esta ruta sea correcta para el archivo wood.jpg */
    background-image: url("../php/css/img/wood.jpg!w700wp"); 
    border: 3px solid white; /* Borde blanco de .mainbox */
    
    /* Propiedades mantenidas */
    border-radius: 20px;
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.5); 
    padding: 30px 40px;
    max-width: 420px;
    width: 90%;
    
    /* Cambiamos el color de texto a BLANCO para que contraste con el fondo de madera oscuro */
    color: white; 
}

/* Estilo de título (Aprovecha tu fuente con un color contrastante) */
.Rtitulo {
    font-family: \'KomikaAxis\', sans-serif;
    font-size: 1.8em;
    font-weight: 700;
    color: white; /* Cambiado a BLANCO para contraste con la madera */
    margin-bottom: 25px;
}

/* Estilo de Alerta de Error (Mantiene la coherencia de error) */
.Ralerta {
    /* Colores oscuros de alerta para el fondo de madera */
    background-color: rgba(255, 255, 255, 1); /* Fondo blanco casi sólido para la legibilidad */
    border: 3px solid #fa0000ff; /* Borde de alerta */
    color: #fa0606ff; /* Texto rojo oscuro */
    
    padding: 15px;
    border-radius: 10px;
    margin-top: 15px;
    font-weight: 600;
    font-size: 1.1em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

/* Estilo de botón (Mantenemos tu estilo de gradiente) */
.cerrar {
    display: inline-block;
    margin-top: 30px;
    
    /* Usamos el gradiente que habías elegido */
    background: linear-gradient(135deg, #505152ff, #505152ff);
    
    font-family: \'KomikaAxis\', sans-serif; 
    color: #fff;
    padding: 12px 25px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 600;
    transition: 0.3s;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

/* Hover del botón */
.cerrar:hover {
    background: linear-gradient(135deg, #5e5e5eff, #5e5e5eff);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}
    </style>

    <div class="Rbox">
        <h2 class="Rtitulo">  ❌ ACCESO DENEGADO ❌</h2>
        <div class="Ralerta">
            <i class="fas fa-times-circle"></i>
            Usuario o contraseña incorrectos.
        </div>
        <a href="../php/index.html" class="cerrar">VOLVER A LOGIN</a>
    </div>
    ';
    exit();
}
?>

