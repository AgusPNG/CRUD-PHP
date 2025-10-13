-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2025 at 08:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `2t`
--

-- --------------------------------------------------------

--
-- Table structure for table `historial`
--

CREATE TABLE `historial` (
  `ID_HISTORIAL` int(11) NOT NULL,
  `ID_USUARIO` int(11) NOT NULL,
  `ID_LIBRO` int(11) NOT NULL,
  `TIPO` enum('COMPRA','ALQUILER') NOT NULL,
  `FECHA_DEOPERACION` datetime DEFAULT current_timestamp(),
  `FECHA_DEVOLUCION` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `historial`
--
DELIMITER $$
CREATE TRIGGER `actualizar_stock_historial` AFTER INSERT ON `historial` FOR EACH ROW BEGIN
    -- Restar 1 al stock
    UPDATE estado_libro
    SET STOCK = STOCK - 1
    WHERE ID_LIBRO = NEW.ID_LIBRO;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `devolver_libro_historial` AFTER UPDATE ON `historial` FOR EACH ROW BEGIN
    IF OLD.FECHA_DEVOLUCION IS NULL AND NEW.FECHA_DEVOLUCION IS NOT NULL AND NEW.TIPO = 'ALQUILER' THEN
        UPDATE estado_libro
        SET STOCK = STOCK + 1
        WHERE ID_LIBRO = NEW.ID_LIBRO;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `inventario`
--

CREATE TABLE `inventario` (
  `ID_ESTADO` int(11) NOT NULL,
  `ID_LIBRO` int(11) NOT NULL,
  `STOCK` int(11) NOT NULL DEFAULT 0,
  `DISPONIBILIDAD` enum('DISPONIBLE','NO DISPONIBLE') GENERATED ALWAYS AS (case when `STOCK` > 0 then 'DISPONIBLE' else 'NO DISPONIBLE' end) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `libros`
--

CREATE TABLE `libros` (
  `NOMBRE` varchar(50) NOT NULL,
  `ID` int(11) NOT NULL,
  `GENERO` varchar(60) NOT NULL,
  `IMG` varchar(255) NOT NULL,
  `STOCK` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `libros`
--

INSERT INTO `libros` (`NOMBRE`, `ID`, `GENERO`, `IMG`, `STOCK`) VALUES
('LA BIBLIA', 1, 'RELIGIÓN', 'https://images.cdn1.buscalibre.com/fit-in/360x360/17/1d/171db1b7420be8ace2209b54e0a20337.jpg', 0),
('LAS AVENTURAS DE LOS TRES CERDITOS', 2, 'INFANTIL', 'https://http2.mlstatic.com/D_NQ_NP_926990-MLM48940289843_012022-O.webp', 0),
('DE LO PEOR, LO MEJOR: AURON PLAY', 3, 'BIOGRAFÍA', 'https://http2.mlstatic.com/D_NQ_NP_606393-MLA46391829594_062021-O.webp', 0),
('EL BOSQUE MÁGICO', 4, 'FANTASÍA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiUQWxgs8tY9DTKw4tOOIzOfV-QjM20vbp6Q&s', 0),
('EL JARDÍN DE BRONCE', 5, 'TERROR', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB8P7-Ixri63CSI4OvYyygmfm2yPrIH4JOCw&s', 0),
('EL BUEN CIRUJANO', 6, 'MEDICINA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5cQMk58ilkc5QBF3Iald-odWkjvctoL1wTQ&s', 0),
('EL COLOR PERDIDO DEL BOSQUE', 7, 'FANTASÍA', 'https://i.pinimg.com/736x/ab/7a/1d/ab7a1d8d8ac9e4bcf501689ad50dda9d.jpg', 0),
('EL CORÁN', 8, 'RELIGIÓN', 'https://i0.wp.com/codex.click/wp-content/uploads/2022/09/29p.gif?fit=512%2C800&ssl=1', 0),
('EL PROCESO', 9, 'NOVELA', 'https://images.cdn1.buscalibre.com/fit-in/360x360/86/31/8631f67503db12c77b8dc8b50665c705.jpg', 0),
('EL ETERNAUTA', 10, 'CIENCIA FICCIÓN', 'https://acdn-us.mitiendanube.com/stores/001/029/689/products/el-eternauta-rustica1-8d6ced2e87da66e6c516649009317485-1024-1024.jpg', 0),
('HARRY POTTER AND THE DEATHLY HALLOWS', 11, 'FANTASÍA', 'https://images.cdn1.buscalibre.com/fit-in/360x360/b4/0d/b40d197d62ce37f277ab5816230c85fc.jpg', 0),
('LA NARANJA MECÁNICA', 12, 'NOVELA', 'https://www.planetadelibros.com.ar/usuaris/libros/fotos/365/original/364509_portada_la-naranja-mecanica-60-aniversario_anthony-burgess_202210141234.jpg', 0),
('PATAPIM', 13, 'INFANTIL', 'https://m.media-amazon.com/images/I/61zP8N0pduL._UF1000,1000_QL80_.jpg', 0),
('PEZ GLOBO', 14, 'INFANTIL', 'https://images.cdn1.buscalibre.com/fit-in/360x360/25/14/251464d661dad311ba0d2741993ecc3b.jpg', 0),
('TINTA  ROJA', 15, 'NOVELA', 'https://http2.mlstatic.com/D_NQ_NP_754640-MLU69958984917_062023-O.webp', 0),
('PROHIBIDO SU NOMBRE', 16, 'TEROR', 'https://images.cdn3.buscalibre.com/fit-in/360x360/4d/7a/4d7aa6fe2b566a6b6a86adef0a2fbbc5.jpg', 0),
('RUBIUS: EL LIBRO TROLL', 17, 'COMEDIA', 'https://images.cdn1.buscalibre.com/fit-in/360x360/ed/c0/edc08582bbe58740883540eac9390ba4.jpg', 0),
('EL GRIS', 18, 'TERROR', 'https://m.media-amazon.com/images/I/61P-nVcoL4L._UF1000,1000_QL80_.jpg', 0),
('A TRAVÉS  DE MI VENTANA', 19, 'NOVELA', 'https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/9a93fd6a-1297-4ce5-8ceb-052822223bea/9789877385991.jpg', 0),
('TUNG TUNG TUNG SAHUR', 20, 'INFANTIL', 'https://m.media-amazon.com/images/I/71TqOAOiA4L._UF350,350_QL50_.jpg', 0),
('LAS VIDAS DENTRO DE TU CABEZA', 21, 'NOVELA', 'https://marketplace.canva.com/EAE7h_sXaYM/1/0/1003w/canva-verde-y-rosa-ilustraci%C3%B3n-cerebro-ciencia-ficci%C3%B3n-tapa-de-libro-Ek1sRC6ATiA.jpg', 0),
('LA VIDA DE PI', 22, 'NOVELA', 'https://images.cdn3.buscalibre.com/fit-in/360x360/cc/ad/ccad09a771a20a1f40154f43eb769ec3.jpg', 0),
('¡ES UN ZORRO!', 23, 'INFANTIL', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbqqtj86KjcYlbzg9pIOmNbLhBovV8S4uWXQ&s', 0),
('WAITING', 24, 'DRAMA', 'https://images.cdn2.buscalibre.com/fit-in/360x360/dc/31/7d07c62196ac51d510260905bd1ea26e.jpg', 0),
('MINECRAFT: LA GUÍA DEFINITIVA', 25, 'INFANTIL', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoADxMkbl8qh15FHha80LiFcfD9KHialDciA&s', 0);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(11) NOT NULL,
  `clave` varchar(25) NOT NULL,
  `usuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`ID`, `clave`, `usuario`) VALUES
(12, 'minecraft', 'mateo'),
(14, 'asd', 'asd'),
(17, 'gh', 'tr'),
(18, '1', '1'),
(20, 'eee', 'eee'),
(23, '123', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`ID_HISTORIAL`),
  ADD KEY `ID_USUARIO` (`ID_USUARIO`),
  ADD KEY `ID_LIBRO` (`ID_LIBRO`);

--
-- Indexes for table `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`ID_ESTADO`),
  ADD KEY `ID_LIBRO` (`ID_LIBRO`);

--
-- Indexes for table `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `unico_usuario` (`usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `historial`
--
ALTER TABLE `historial`
  MODIFY `ID_HISTORIAL` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventario`
--
ALTER TABLE `inventario`
  MODIFY `ID_ESTADO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `libros`
--
ALTER TABLE `libros`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`ID_LIBRO`) REFERENCES `libros` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`ID_LIBRO`) REFERENCES `libros` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
