-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 01-03-2023 a las 18:56:05
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `websocial`
--
CREATE DATABASE IF NOT EXISTS `websocial` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `websocial`;

-- --------------------------------------------------------

--
-- Permisos de acceso
--

GRANT ALL PRIVILEGES ON websocial.* TO 'pcw'@127.0.0.1 IDENTIFIED BY 'pcw';
GRANT ALL PRIVILEGES ON websocial.* TO 'pcw'@localhost IDENTIFIED BY 'pcw';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

DROP TABLE IF EXISTS `comentario`;
CREATE TABLE `comentario` (
  `id` int(11) NOT NULL,
  `texto` varchar(250) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `idPublicacion` int(11) NOT NULL,
  `fechaHora` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comentario`
--

INSERT INTO `comentario` (`id`, `texto`, `usuario`, `idPublicacion`, `fechaHora`) VALUES
(1, 'La juventud de hoy día no tiene educación. Pero la culpa es de los padres.', 'usuario2', 1, '2023-01-20 08:03:45'),
(2, 'Puede ser que alguna razón tengáis, pero el ayuntamiento también podría hacer algo más, creo yo.', 'usuario5', 1, '2023-01-22 10:03:45'),
(3, 'Pues yo no lo veía tan necesario. Tampoco es que hubiera mucho tráfico en esa calle. Podían haber destinado ese dinero a otra cosa más necesaria.', 'usuario2', 2, '2023-01-23 16:26:16'),
(4, 'Yo lo veo perfecto. Es verdad que los coches pasaban a mucha velocidad por ahí.', 'usuario4', 2, '2023-01-24 09:14:13'),
(5, 'Yo vivo cerca y paso por ahí casi todos los días y no tiene tráfico. Estoy de acuerdo con usuario2, no hacía falta ahí un semáforo.', 'usuario5', 2, '2023-01-25 08:17:03'),
(15, 'Espero que estés en lo cierto y no sea un bar, porque por la zona ya está bastante saturada de locales de restauración.', 'usuario5', 34, '2023-01-25 15:28:51'),
(16, 'Se habrán quedado sin presupuesto. Es típico de este ayuntamiento.', 'usuario2', 35, '2023-01-31 17:26:45'),
(17, 'Espero que reanuden la obra lo antes posible. Los comerciantes de la zona están perdiendo mucho dinero.', 'usuario4', 35, '2023-02-02 09:06:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foto`
--

DROP TABLE IF EXISTS `foto`;
CREATE TABLE `foto` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `archivo` varchar(50) NOT NULL COMMENT 'Nombre del fichero',
  `idPublicacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `foto`
--

INSERT INTO `foto` (`id`, `descripcion`, `archivo`, `idPublicacion`) VALUES
(1, 'Foto de cómo se queda el parque después de hacer viento. Hay papeles y vasos de plástico por el suelo.', 'foto1.jpg', 1),
(2, 'Hasta botellas de cerveza de cristal. Los que dejan esto no son niños precisamente.', 'foto2.jpg', 1),
(3, 'Luego, seguro que son los mismos que dejan las botellas de cristal los que se \"divierten\" en el parque infantil.', 'foto3.webp', 1),
(4, 'Lo ha puesto casi en medio de la acera.', 'foto4.jpg', 2),
(5, 'Además, han aprovechado para hacer la calle doble sentido. Antes era sólo un sentido y se podía aparcar.', 'foto5.jpg', 2),
(37, 'Esta es la foto de parte que da a la calle Juan De La Cierva.', 'foto37.jpeg', 34),
(38, 'Las máquinas que están en la parte de arriba de la calle llevan en la misma posición desde el martes pasado.', 'foto38.jpg', 35),
(39, 'Por este tramo de la calle no se puede ni pasar con el coche.', 'foto39.jpg', 35),
(40, 'En la parte de abajo de la calle por lo menos se puede circular, aunque hay que tener cuidado de no atropellar a nadie.', 'foto40.jpg', 35);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `megusta`
--

DROP TABLE IF EXISTS `megusta`;
CREATE TABLE `megusta` (
  `id` int(11) NOT NULL,
  `idPublicacion` int(11) NOT NULL,
  `valor` tinyint(1) NOT NULL DEFAULT 1,
  `usuario` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `megusta`
--

INSERT INTO `megusta` (`id`, `idPublicacion`, `valor`, `usuario`) VALUES
(1, 1, 0, 'usuario1'),
(2, 1, 0, 'usuario2'),
(3, 1, 1, 'usuario3'),
(4, 1, 0, 'usuario5'),
(5, 2, 1, 'usuario3'),
(6, 2, 1, 'usuario4'),
(8, 34, 0, 'usuario5'),
(9, 34, 1, 'usuario3'),
(10, 35, 1, 'usuario4'),
(11, 35, 0, 'usuario2'),
(12, 35, 1, 'usuario1'),
(13, 2, 1, 'usuario1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion`
--

DROP TABLE IF EXISTS `publicacion`;
CREATE TABLE `publicacion` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `texto` text NOT NULL,
  `fechaHora` timestamp NOT NULL DEFAULT current_timestamp(),
  `idZona` int(11) NOT NULL,
  `autor` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `publicacion`
--

INSERT INTO `publicacion` (`id`, `titulo`, `texto`, `fechaHora`, `idZona`, `autor`) VALUES
(1, 'Nuevo foco de suciedad en nuestro barrio', 'El parque del barrio se está convirtiendo en un vertedero. La gente en general, y los jóvenes en particular, meriendan y cenan en el parque y luego lo dejan todo por ahí tirado. Los papeles se vuelan cuando hace aire y llenan todo el parque. Me parece de muy poca vergüenza que dejen todos los restos tirados por ahí y no sean capaces de recogerlos y tirarlos a la basura. Pongo las fotos para que se vea bien a qué me refiero.', '2023-01-19 10:46:34', 1, 'usuario1'),
(2, 'Semáforo nuevo', 'Por fin han puesto el semáforo en la calle Luna. Era un peligro cruzar el paso de cebra porque venían los coches lanzados de abajo. Le ha costado al ayuntamiento, pero al final nos han hecho caso.', '2023-01-20 11:17:37', 3, 'usuario3'),
(34, 'Apertura local en calle Jazmín', 'Van a abrir un local en la calle Jazmín, esquina calle Juan De La Cierva. Tiene pinta de que vaya a ser una tienda grande. ¿Alguien sabe qué va a ser?', '2023-01-24 09:47:35', 4, 'usuario2'),
(35, 'Nuevas obras en el centro', 'Por si no teníamos bastante con las obras en el centro de la ciudad, ahora parece que se han detenido. Llevan cuatro días en los que no han hecho nada. No sé qué pretende el ayuntamiento. Esas obras deberían acabarse lo antes posible.', '2023-01-30 10:03:20', 6, 'usuario5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `login` varchar(20) NOT NULL,
  `pwd` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `foto` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(250) DEFAULT NULL,
  `ultimo_acceso` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`login`, `pwd`, `nombre`, `foto`, `email`, `token`, `ultimo_acceso`) VALUES
('usuario1', 'usuario1', 'Usuario 1', 'usuario1.png', 'usuario1@pcw.es', '3cf102ffd4f0cc3fc0190fc5a61de6aea82f6ea4b71dc5a2257f392b220769120d15d4ba7fe9dffcff30ee4c3bfbe2f14be11c7bd4efa566e846d4ebb7a54c85', '2023-02-24 10:06:51'),
('usuario2', 'usuario2', 'Usuario 2', 'usuario2.png', 'usuario2@pcw.es', '93ebec8967cb283cb13fa14144180cc0cea079c8cd7d17467fb50bd0b899026f965e606b66d9d9aa8e3f934a13950f1277be15c996ea7e3e661ef1afd8eb7155', '2023-02-24 08:51:50'),
('usuario3', 'usuario3', 'Usuario 3', 'usuario3.png', 'usuario3@pcw.es', '6c8c9d8e16041d3b66170ad1556bf0b293a190869be0b03a92021f6a262a33de028c1080b889032a6b13846e3110b5f0a069daaa608a7f9e69caa76c18b6eda8', '2023-02-24 07:46:47'),
('usuario4', 'usuario4', 'Usuario 4', 'usuario4.jpg', 'usuario4@pcw.es', '1d37bb4f9af3ca24749eb61b989ae129d900df9e9a7630c2199e68bd2e8a2656a0ca580ccfdd32cae8a33a9a7de90519250924f8cd27024b04bb572906824d6f', '2023-02-27 16:03:08'),
('usuario5', 'usuario5', 'Usuario 5', 'usuario5.jpg', 'usuario5@pcw.es', '201fb3babec42ced8c5decc16aaff2e370c7d39483d3b2fa5b6c26aa3081da6d8979265934b4f160b9f13bbb84ed23ca8f9e74d5d5c00fb9793db6969a45c3c8', '2023-02-24 09:47:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zona`
--

DROP TABLE IF EXISTS `zona`;
CREATE TABLE `zona` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `zona`
--

INSERT INTO `zona` (`id`, `nombre`) VALUES
(1, 'Barrio Nazaret'),
(2, 'Avda, Las Naciones'),
(3, 'Parque Norte'),
(4, 'Barrio San Juan'),
(5, 'Barrio Nazaret 2'),
(6, 'Zona centro');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPublicacion` (`idPublicacion`),
  ADD KEY `autor` (`usuario`);

--
-- Indices de la tabla `foto`
--
ALTER TABLE `foto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPublicacion` (`idPublicacion`);

--
-- Indices de la tabla `megusta`
--
ALTER TABLE `megusta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPublicacion` (`idPublicacion`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `autor` (`autor`),
  ADD KEY `idZona` (`idZona`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`login`) USING BTREE,
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `zona`
--
ALTER TABLE `zona`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentario`
--
ALTER TABLE `comentario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `foto`
--
ALTER TABLE `foto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `megusta`
--
ALTER TABLE `megusta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `zona`
--
ALTER TABLE `zona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `comentario_ibfk_1` FOREIGN KEY (`idPublicacion`) REFERENCES `publicacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comentario_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`login`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `foto`
--
ALTER TABLE `foto`
  ADD CONSTRAINT `foto_ibfk_1` FOREIGN KEY (`idPublicacion`) REFERENCES `publicacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `megusta`
--
ALTER TABLE `megusta`
  ADD CONSTRAINT `megusta_ibfk_1` FOREIGN KEY (`idPublicacion`) REFERENCES `publicacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `megusta_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`login`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD CONSTRAINT `publicacion_ibfk_1` FOREIGN KEY (`autor`) REFERENCES `usuario` (`login`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publicacion_ibfk_2` FOREIGN KEY (`idZona`) REFERENCES `zona` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
