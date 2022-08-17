-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           10.9.1-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Listage de la structure de la table groupomania. likes
CREATE TABLE IF NOT EXISTS `likes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int(11) DEFAULT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `PostId` (`PostId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table groupomania.likes : ~1 rows (environ)
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` (`id`, `createdAt`, `updatedAt`, `PostId`, `UserId`) VALUES
	('afb41c70-4e16-459c-b36b-598dc4365b9e', '2022-08-16 20:12:12', '2022-08-16 20:12:12', 51, '414a1d34-dc86-40d3-8359-79cede4edfa4');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;

-- Listage de la structure de la table groupomania. posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postText` longtext NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `userPic` varchar(255) DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table groupomania.posts : ~1 rows (environ)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` (`id`, `postText`, `image`, `username`, `userPic`, `userId`, `createdAt`, `updatedAt`) VALUES
	(51, 'En ce lundi matin, que la force soit avec vous !', 'images\\1660673528850.jpg', 'Mr Admin', 'https://www.123-stickers.com/7852-thickbox/autocollant-mr-mime-pokemon-122.jpg', '414a1d34-dc86-40d3-8359-79cede4edfa4', '2022-08-16 20:12:08', '2022-08-16 20:12:08');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

-- Listage de la structure de la table groupomania. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userPic` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table groupomania.users : ~1 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `email`, `password`, `userPic`, `role`, `createdAt`, `updatedAt`) VALUES
	('414a1d34-dc86-40d3-8359-79cede4edfa4', 'Mr Admin', 'admin@groupomania.fr', '$2b$10$Yv8xNc5VmQ27clHo3tt10eXvU0vp1UQANKblxwh4gQKocHmHQIdoS', 'https://www.123-stickers.com/7852-thickbox/autocollant-mr-mime-pokemon-122.jpg', 'isUser', '2022-08-16 19:35:30', '2022-08-16 19:35:30');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
