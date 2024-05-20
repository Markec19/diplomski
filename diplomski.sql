/*
SQLyog Community
MySQL - 10.4.25-MariaDB : Database - diplomski
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`diplomski` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

/*Table structure for table `podtip_rezervacije` */

CREATE TABLE `podtip_rezervacije` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `podtip` varchar(20) NOT NULL,
  `tip_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tip_id` (`tip_id`),
  CONSTRAINT `podtip_rezervacije_ibfk_1` FOREIGN KEY (`tip_id`) REFERENCES `tip_rezervacije` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

/*Data for the table `podtip_rezervacije` */

insert  into `podtip_rezervacije`(`id`,`podtip`,`tip_id`) values 
(1,'pismeni',1),
(2,'usmeni',1),
(3,'odbrana seminarskog',1),
(4,'predavanja',2),
(5,'vezbe',2),
(6,'lab vezbe',2);

/*Table structure for table `predmet` */

CREATE TABLE `predmet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `predmet` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

/*Data for the table `predmet` */

insert  into `predmet`(`id`,`predmet`) values 
(1,'Programiranje 1'),
(2,'Programiranje 2'),
(3,'Matematika 1'),
(4,'Matematika 2'),
(5,'Projektovanje softvera'),
(6,'Projektovanje informacionh sistema'),
(7,'Strukture podataka i algoritmi'),
(8,'NJT'),
(9,'Napredno programiranje');

/*Table structure for table `profil` */

CREATE TABLE `profil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(60) NOT NULL,
  `zaposleni_id` int(11) NOT NULL,
  `rola_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `zaposleni_id` (`zaposleni_id`),
  KEY `rola_id` (`rola_id`),
  CONSTRAINT `profil_ibfk_1` FOREIGN KEY (`zaposleni_id`) REFERENCES `zaposleni` (`id`),
  CONSTRAINT `profil_ibfk_2` FOREIGN KEY (`rola_id`) REFERENCES `rola` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `profil` */

insert  into `profil`(`id`,`username`,`password`,`zaposleni_id`,`rola_id`) values 
(2,'test','$2a$10$VM8qc9.qivlvScs4lW3l9uQIWgbU8W/xwEzg8Guf3w7jWu/vDh4jy',1,1),
(3,'admin','$2a$10$exo3FAmE9NL1s2F9HNaRg.tNpWSAMPvPITTl5qtY2J.wIaTp05n4.',2,2);

/*Table structure for table `rezervacija` */

CREATE TABLE `rezervacija` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vreme_pocetka` varchar(10) DEFAULT NULL,
  `vreme_zavrsetka` varchar(10) DEFAULT NULL,
  `datum_rezervacije` date DEFAULT NULL,
  `datum_slanja_zahteva` date DEFAULT NULL,
  `datum_obrade` date DEFAULT NULL,
  `sala_id` int(11) DEFAULT NULL,
  `predmet_id` int(11) DEFAULT NULL,
  `podtip_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `korisnik_id` int(11) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sala_id` (`sala_id`),
  KEY `predmet_id` (`predmet_id`),
  KEY `podtip_id` (`podtip_id`),
  KEY `status_id` (`status_id`),
  KEY `rezervacija` (`korisnik_id`),
  KEY `obrada` (`admin_id`),
  CONSTRAINT `obrada` FOREIGN KEY (`admin_id`) REFERENCES `profil` (`id`),
  CONSTRAINT `rezervacija` FOREIGN KEY (`korisnik_id`) REFERENCES `profil` (`id`),
  CONSTRAINT `rezervacija_ibfk_1` FOREIGN KEY (`sala_id`) REFERENCES `sala` (`id`),
  CONSTRAINT `rezervacija_ibfk_2` FOREIGN KEY (`predmet_id`) REFERENCES `predmet` (`id`),
  CONSTRAINT `rezervacija_ibfk_4` FOREIGN KEY (`podtip_id`) REFERENCES `podtip_rezervacije` (`id`),
  CONSTRAINT `rezervacija_ibfk_5` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4;

/*Data for the table `rezervacija` */

insert  into `rezervacija`(`id`,`vreme_pocetka`,`vreme_zavrsetka`,`datum_rezervacije`,`datum_slanja_zahteva`,`datum_obrade`,`sala_id`,`predmet_id`,`podtip_id`,`status_id`,`korisnik_id`,`admin_id`) values 
(39,'9:00','11:00','2024-04-30','2024-04-25','2024-04-30',5,6,5,2,2,3),
(46,'09:00','11:00','2024-04-29','2024-04-29','2024-04-29',4,2,3,2,2,3),
(50,'11:00','15:00','2024-04-29','2024-04-29','2024-04-30',1,1,5,3,2,3),
(52,'13:00','15:00','2024-04-29','2024-04-29','2024-04-29',5,6,5,1,2,NULL),
(77,'10:00','12:00','2024-05-01','2024-05-02',NULL,1,1,1,1,2,NULL);

/*Table structure for table `rola` */

CREATE TABLE `rola` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rola` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `rola` */

insert  into `rola`(`id`,`rola`) values 
(1,'korisnik'),
(2,'admin');

/*Table structure for table `sala` */

CREATE TABLE `sala` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sala` varchar(20) NOT NULL,
  `tip_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tip_id` (`tip_id`),
  CONSTRAINT `sala_ibfk_1` FOREIGN KEY (`tip_id`) REFERENCES `tip_sale` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

/*Data for the table `sala` */

insert  into `sala`(`id`,`sala`,`tip_id`) values 
(1,'B009',1),
(3,'B103',1),
(4,'006',2),
(5,'005',2),
(9,'003',1),
(10,'010',1),
(11,'004',1),
(12,'007',1);

/*Table structure for table `status` */

CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `status` */

insert  into `status`(`id`,`status`) values 
(1,'cekanje'),
(2,'prihvacen'),
(3,'odbijen');

/*Table structure for table `tip_rezervacije` */

CREATE TABLE `tip_rezervacije` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tip` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tip_rezervacije` */

insert  into `tip_rezervacije`(`id`,`tip`) values 
(1,'ispit'),
(2,'nastava');

/*Table structure for table `tip_sale` */

CREATE TABLE `tip_sale` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tip` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tip_sale` */

insert  into `tip_sale`(`id`,`tip`) values 
(1,'nastava'),
(2,'racunarska'),
(3,'kombinovano');

/*Table structure for table `zaposleni` */

CREATE TABLE `zaposleni` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(20) NOT NULL,
  `prezime` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `zaposleni` */

insert  into `zaposleni`(`id`,`ime`,`prezime`) values 
(1,'Test','Test'),
(2,'Admin','Admin');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
