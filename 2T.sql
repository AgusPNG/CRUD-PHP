-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-09-2025 a las 19:07:20
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `libros`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `NOMBRE` varchar(50) NOT NULL,
  `ID` int(11) NOT NULL,
  `GENERO` varchar(60) NOT NULL,
  `IMG` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`NOMBRE`, `ID`, `GENERO`, `IMG`) VALUES
('LA BIBLIA', 1, 'RELIGIÓN', 'https://drive.google.com/file/d/14v2grMYhdbgRPbgBMLTcatC39r1ws0Y8/view'),
('LAS AVENTURAS DE LOS TRES CERDITOS', 2, 'INFANTIL', 'https://drive.google.com/file/d/1D_6TcOtkyF2_QbNDeoelG-uT2PBsU67o/view'),
('DE LO PEOR, LO MEJOR: AURON PLAY', 3, 'BIOGRAFÍA', 'https://drive.google.com/file/d/1xVSmNlgUhmAUqOWNI9IUjr7WhMRoPhTZ/view'),
('EL BOSQUE MÁGICO', 4, 'FANTASÍA', 'https://drive.google.com/file/d/1bDRal_horN-qoK6_WPsP8a-t9ZZe-tdG/view'),
('EL JARDÍN DE BRONCE', 5, 'TERROR', 'https://drive.google.com/file/d/1B_rCkgHP2_cpRF5MsC0wtklabHdEmQV_/view'),
('EL BUEN CIRUJANO', 6, 'MEDICINA', 'https://drive.google.com/file/d/1z1DB3Gh-sP_73M4TI3Fu_Vw-fjIFt3ss/view'),
('EL COLOR PERDIDO DEL BOSQUE', 7, 'FANTASÍA', 'https://drive.google.com/file/d/1J81B1x2ERGIDfqV5uxmwPNSr4qdbhjhV/view'),
('EL CORÁN', 8, 'RELIGIÓN', 'https://drive.google.com/file/d/1bTAUdZfIco4r4jhE3q2HOXQ6LOhwgoAt/view'),
('EL PROCESO', 9, 'NOVELA', 'https://drive.google.com/file/d/1HarlK8nkQUqoICW1-tW3wz5iW7RitFNP/view'),
('EL ETERNAUTA', 10, 'CIENCIA FICCIÓN', 'https://drive.google.com/file/d/1FRrp9n_rp08p9jWTqbwHur2ZrncsBTi4/view'),
('HARRY POTTER AND THE DEATHLY HALLOWS', 11, 'FANTASÍA', 'https://drive.google.com/file/d/1XV5Vkud8tNU2uIMhUtgB0GTDmap0-7_f/view'),
('LA NARANJA MECÁNICA', 12, 'NOVELA', 'https://drive.google.com/file/d/1v3VHGJo28nMnOdl8I1S1gKjOZR1TNJtj/view'),
('PATAPIM', 13, 'FANTASÍA', 'https://drive.google.com/file/d/11-MxgUIrdg7Nqbvn5CGvA9EgA3yXwlZy/view'),
('PEZ GLOBO', 14, 'INFANTIL', 'https://drive.google.com/file/d/1o0p6pdiUbdSniLB3s3o1OR-oSBw-XYwo/view'),
('TINTA  ROJA', 15, 'NOVELA', 'https://drive.google.com/file/d/197194gxnBzh4nsFerPPnD3qUmO-Te4kY/view'),
('PROHIBIDO SU NOMBRE', 16, 'TEROR', 'https://drive.google.com/file/d/1LvyyozHZ_7HSBPtYkowqy8fdOP94pq5m/view'),
('RUBIUS', 17, 'COMEDIA', 'https://drive.google.com/file/d/1CqcRnUm068l6Rk3_PhU6eOuqlIeZe3kg/view'),
('THENGRIS', 18, 'COMEDIA', 'https://drive.google.com/file/d/1cv4ZEnwUrq4SmSivsDku4TNdNi9_NC3e/view'),
('VENTANA', 19, 'NOVELA', 'https://drive.google.com/file/d/1Kygwg8IEfFB4-wPEArsZg7zJNWcW8Rjd/view'),
('TUNG', 20, 'COMEDIA', 'https://drive.google.com/file/d/1CzN5lWosUORoHN0BTuuZXuN0yYbUajhH/view'),
('LAS VIDAS DENTRO DE TU CABEZA', 21, 'NOVELA', 'https://drive.google.com/file/d/1tJ7HgT4gbnPgfWg2UNAlUQ-kYq-bPhb9/view'),
('LA VIDA DE PI', 22, 'NOVELA', 'https://drive.google.com/file/d/1XAIHMs1K1jcgFAsEUDvOMNtUQVx7_ziB/view'),
('ZORRO', 23, 'INFANTIL', 'https://drive.google.com/file/d/13Ex14ngUuaHRSahFpE1uTuNv_9xfQvU3/view'),
('WAITING', 24, 'DRAMA', 'https://drive.google.com/file/d/1ZTa0djaB0PPnUKMKUluwsNb_SPzpQCv9/view'),
('MINECRAFT', 25, 'INFANTIL', 'https://drive.google.com/file/d/1ZAbZonokWMNe0W0N7RmPZnCljnJ5HNDA/view');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(11) NOT NULL,
  `contraseña` varchar(25) NOT NULL,
  `usuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
