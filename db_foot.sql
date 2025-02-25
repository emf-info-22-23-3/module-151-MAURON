-- Création de la base de données
CREATE DATABASE IF NOT EXISTS db_foot;
USE db_foot;

-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: db_foot
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `T_administrateur`
--

DROP TABLE IF EXISTS `T_administrateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_administrateur` (
  `PK_administrateur` int NOT NULL AUTO_INCREMENT,
  `Login` varchar(30) NOT NULL,
  `MotDePasse` varchar(100) NOT NULL,
  PRIMARY KEY (`PK_administrateur`),
  UNIQUE KEY `Login_UNIQUE` (`Login`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_administrateur`
--

LOCK TABLES `T_administrateur` WRITE;
/*!40000 ALTER TABLE `T_administrateur` DISABLE KEYS */;
INSERT INTO `T_administrateur` VALUES (1,'Admin','$2y$10$Wy7DUV2Gx0Coiq3TXGUozuz256Q07qattpL.78qLHMgaXo5dD7eB6');
/*!40000 ALTER TABLE `T_administrateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_equipe`
--

DROP TABLE IF EXISTS `T_equipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_equipe` (
  `PK_equipe` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(40) NOT NULL,
  PRIMARY KEY (`PK_equipe`),
  UNIQUE KEY `Nom_UNIQUE` (`Nom`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_equipe`
--

LOCK TABLES `T_equipe` WRITE;
/*!40000 ALTER TABLE `T_equipe` DISABLE KEYS */;
INSERT INTO `T_equipe` VALUES (11,'AC Milan'),(12,'Arsenal'),(7,'Bayern Munich'),(10,'Chelsea'),(6,'FC Barcelone'),(9,'Juventus'),(8,'Liverpool'),(5,'Manchester City'),(3,'Paris Saint-Germain'),(4,'Real Madrid');
/*!40000 ALTER TABLE `T_equipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_joueur`
--

DROP TABLE IF EXISTS `T_joueur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_joueur` (
  `PK_joueur` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(60) NOT NULL,
  `DateNaissance` date NOT NULL,
  `Numero` int NOT NULL,
  `NbrTitre` decimal(10,0) DEFAULT NULL,
  `Salaire` decimal(10,0) NOT NULL,
  `NbrBut` decimal(10,0) DEFAULT NULL,
  `FK_position` int NOT NULL,
  `FK_equipe` int NOT NULL,
  `FK_Photo` int NOT NULL,
  PRIMARY KEY (`PK_joueur`,`FK_position`,`FK_equipe`,`FK_Photo`),
  KEY `fk_T_joueur_T_position_idx` (`FK_position`),
  KEY `fk_T_joueur_T_equipe1_idx` (`FK_equipe`),
  KEY `fk_T_joueur_T_photo1_idx` (`FK_Photo`),
  CONSTRAINT `fk_T_joueur_T_equipe1` FOREIGN KEY (`FK_equipe`) REFERENCES `T_equipe` (`PK_equipe`),
  CONSTRAINT `fk_T_joueur_T_photo1` FOREIGN KEY (`FK_Photo`) REFERENCES `T_photo` (`PK_photo`),
  CONSTRAINT `fk_T_joueur_T_position` FOREIGN KEY (`FK_position`) REFERENCES `T_position` (`PK_position`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_joueur`
--

LOCK TABLES `T_joueur` WRITE;
/*!40000 ALTER TABLE `T_joueur` DISABLE KEYS */;
INSERT INTO `T_joueur` VALUES (1,'Cristiano Ronaldo','1985-02-05',7,124,100,905,7,5,1),(2,'Lionnel Messi','1991-08-25',10,234,242,234,9,7,2),(3,'Joao Felix','1998-02-12',19,12,10,152,4,11,3),(4,'Kylian Mbappé','1998-12-20',7,20,180,250,2,5,8),(5,'Neymar Jr','1992-02-20',10,30,200,400,9,3,12),(6,'Karim Benzema','1987-12-19',9,25,150,350,2,3,6),(7,'Zlatan Ibrahimovic','1981-10-03',11,31,120,570,9,11,17),(8,'Bukayo Saka','2001-09-05',7,6,80,50,7,12,14),(9,'Thomas Müller','1989-09-13',25,30,150,300,9,7,11),(10,'Mason Mount','1999-01-10',19,4,90,70,8,10,10),(11,'Pedri','2002-11-25',8,3,60,30,8,6,13),(12,'Federico Chiesa','1997-10-25',22,6,85,90,9,9,7),(13,'Mohamed Salah','1992-06-15',11,15,200,350,9,8,15),(14,'Kevin De Bruyne','1991-06-28',17,25,180,250,8,5,9),(15,'Bradley Barcola','1998-12-20',19,20,180,250,9,3,5),(16,'Vinicius Jr','2000-07-12',20,5,150,100,9,4,16);
/*!40000 ALTER TABLE `T_joueur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_photo`
--

DROP TABLE IF EXISTS `T_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_photo` (
  `PK_photo` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(60) NOT NULL,
  `Photo` varchar(60) NOT NULL,
  PRIMARY KEY (`PK_photo`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_photo`
--

LOCK TABLES `T_photo` WRITE;
/*!40000 ALTER TABLE `T_photo` DISABLE KEYS */;
INSERT INTO `T_photo` VALUES (1,'Ronaldo','http://localhost:8080/projet/client/images/Ronaldo.jpg'),(2,'Messi','http://localhost:8080/projet/client/images/Messi.jpg'),(3,'Felix','http://localhost:8080/projet/client/images/Felix.jpg'),(4,'Aucune photo','http://localhost:8080/projet/client/images/aucune-photo.jpg'),(5,'Barcola','http://localhost:8080/projet/client/images/Barcola.png'),(6,'Benzema','http://localhost:8080/projet/client/images/Benzema.jpg'),(7,'Chiesa','http://localhost:8080/projet/client/images/Chiesa.jpg'),(8,'Mbappe','http://localhost:8080/projet/client/images/Mbappe.jpg'),(9,'De Bruyne','http://localhost:8080/projet/client/images/Kevin.jpg'),(10,'Mount','http://localhost:8080/projet/client/images/Mount.jpg'),(11,'Muller','http://localhost:8080/projet/client/images/Muller.jpeg'),(12,'Neymar','http://localhost:8080/projet/client/images/Neymar.jpg'),(13,'Pedri','http://localhost:8080/projet/client/images/Pedri.jpeg'),(14,'Saka','http://localhost:8080/projet/client/images/Saka.jpg'),(15,'Salah','http://localhost:8080/projet/client/images/Salah.jpg'),(16,'Vinicius','http://localhost:8080/projet/client/images/Vinicius.jpg'),(17,'Zlatan','http://localhost:8080/projet/client/images/Zlatan.jpg');
/*!40000 ALTER TABLE `T_photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_position`
--

DROP TABLE IF EXISTS `T_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_position` (
  `PK_position` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(30) NOT NULL,
  PRIMARY KEY (`PK_position`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_position`
--

LOCK TABLES `T_position` WRITE;
/*!40000 ALTER TABLE `T_position` DISABLE KEYS */;
INSERT INTO `T_position` VALUES (1,'Gardien de but'),(2,'Défenseur central'),(3,'Latéral droit'),(4,'Latéral gauche'),(5,'Milieu défensif'),(6,'Milieu central'),(7,'Milieu offensif'),(8,'Ailier droit'),(9,'Ailier gauche'),(10,'Attaquant');
/*!40000 ALTER TABLE `T_position` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-23 18:23:06
