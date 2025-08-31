-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: client_management
-- ------------------------------------------------------
-- Server version	9.3.0

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
-- Table structure for table `client_meeting`
--

DROP TABLE IF EXISTS `client_meeting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_meeting` (
  `meeting_id` int NOT NULL AUTO_INCREMENT,
  `client_id` int DEFAULT NULL,
  `meeting_topic` varchar(50) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `number_of_people` varchar(250) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `remarks` varchar(500) DEFAULT NULL,
  `meeting_link` text,
  `start_link` text,
  PRIMARY KEY (`meeting_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `client_meeting_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `user_profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_meeting`
--

LOCK TABLES `client_meeting` WRITE;
/*!40000 ALTER TABLE `client_meeting` DISABLE KEYS */;
INSERT INTO `client_meeting` VALUES (1,30,'Project Discussion','2025-08-31 20:56:00','5','6204404196','Quarterly planning meeting','https://us04web.zoom.us/j/76138528683?pwd=Q9sF9q4AgBaZI2jtkiyjaLeSMDxvvN.1','https://us04web.zoom.us/s/76138528683?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMiIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJ3ZWIiLCJjbHQiOjAsIm1udW0iOiI3NjEzODUyODY4MyIsImF1ZCI6ImNsaWVudHNtIiwidWlkIjoiZ1lpczg0Uk5SVnlmcmkwVjN3MjlFQSIsInppZCI6Ijg5NGZjZjhjNTJkMzQ4NjM5ZmEwYmVkMzBhY2VjODdmIiwic2siOiI1MDkxMzYzMzE2MTAyNTA3ODUzIiwic3R5IjoxMDAsIndjZCI6InVzMDQiLCJleHAiOjE3NTY2NTkzODAsImlhdCI6MTc1NjY1MjE4MCwiYWlkIjoiYU1CVm83NzhSNjJPelRFS3dHUDJXdyIsImNpZCI6IiJ9.sXT0Bp8bC7HlTBesIb8Z1VaxugXcdcsBQemtcmmrG4M'),(2,30,'Project Discussion','2025-08-31 20:58:00','5','6204404196','Quarterly planning meeting','https://us04web.zoom.us/j/77621622705?pwd=Eh9I6ofud6DkvvBFt3ooQboAIvxeyF.1','https://us04web.zoom.us/s/77621622705?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMiIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJ3ZWIiLCJjbHQiOjAsIm1udW0iOiI3NzYyMTYyMjcwNSIsImF1ZCI6ImNsaWVudHNtIiwidWlkIjoiZ1lpczg0Uk5SVnlmcmkwVjN3MjlFQSIsInppZCI6IjZlOGNiZTRlMzI1NzRiMGM5ZjI0YWZlZTNjNjMxNzhkIiwic2siOiI1MDkxMzYzMzE2MTAyNTA3ODUzIiwic3R5IjoxMDAsIndjZCI6InVzMDQiLCJleHAiOjE3NTY2NTk1MDQsImlhdCI6MTc1NjY1MjMwNCwiYWlkIjoiYU1CVm83NzhSNjJPelRFS3dHUDJXdyIsImNpZCI6IiJ9.Ae5OQqrl8xxaUooUyPa2EbPDNyP-iixWuygpJMjy3kg'),(3,30,'Project Discussion','2025-08-31 21:03:00','5','6204404196','Quarterly planning meeting','https://us04web.zoom.us/j/76194041179?pwd=pzk9m2aUP4nHPbioaOS9KVGAxi8eLW.1','https://us04web.zoom.us/s/76194041179?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMiIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJ3ZWIiLCJjbHQiOjAsIm1udW0iOiI3NjE5NDA0MTE3OSIsImF1ZCI6ImNsaWVudHNtIiwidWlkIjoiZ1lpczg0Uk5SVnlmcmkwVjN3MjlFQSIsInppZCI6IjBiYzI1MGFlMTdhNDQ5YTViN2Q4NzM5ZmQwMjgzZDA5Iiwic2siOiI1MDkxMzYzMzE2MTAyNTA3ODUzIiwic3R5IjoxMDAsIndjZCI6InVzMDQiLCJleHAiOjE3NTY2NTk4NDcsImlhdCI6MTc1NjY1MjY0NywiYWlkIjoiYU1CVm83NzhSNjJPelRFS3dHUDJXdyIsImNpZCI6IiJ9.VIrSUEAB2IDEqIwGRF8NlaSLOlg78rD-NQ4zryccug0');
/*!40000 ALTER TABLE `client_meeting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` varchar(16) DEFAULT NULL,
  `repeat_password` varchar(16) DEFAULT NULL,
  `role` varchar(1) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES (1,'Kartal','ckpkartal@gmail.com','test123','test123',NULL,NULL),(30,'Kartal Singh Pramanik','blrkartalpramanik@gmail.com','cucumber@test','cucumber@test','c','Delhi, India'),(31,'Kartal Singh Pramanik','ckpkartaltest@gmail.com','cucumber@test','cucumber@test','c','Kolkata, India'),(32,'Kartal Singh Pramanik','ckpkartaltest1@gmail.com','cucumber@test','cucumber@test','c','Kolkata, India');
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-31 20:42:18
