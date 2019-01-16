-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2019-01-16 13:27:12
-- 服务器版本： 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `math`
--
CREATE DATABASE IF NOT EXISTS `math` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `math`;

-- --------------------------------------------------------

--
-- 表的结构 `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `q_id` int(11) NOT NULL,
  `q_content` varchar(512) CHARACTER SET utf8 DEFAULT NULL COMMENT '试题内容',
  `q_state` int(1) NOT NULL DEFAULT '0' COMMENT '试题推送状态',
  `q_time` date NOT NULL COMMENT '试题时间',
  `q_board` varchar(20000) CHARACTER SET utf8 DEFAULT NULL COMMENT '试题画板',
  `q_other` varchar(1024) CHARACTER SET utf8 DEFAULT NULL COMMENT '试题其他'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `question`
--

INSERT INTO `question` (`q_id`, `q_content`, `q_state`, `q_time`, `q_board`, `q_other`) VALUES
(22, '∈≈≈≈≈βαα∞＝∈∩÷aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa⊙≈∈∈', 0, '2018-12-02', 'aaaa', 'aaaa'),
(23, '＝＝＝＝⊙∩∩∩AAAAAAAAAAAAAAAAAAA∩＝', 0, '2018-12-02', 'ASASA', 'SASAS'),
(24, '1411', 0, '2018-12-02', '456416546', 'awwwwwwwwwwww'),
(27, '666', 0, '2018-12-03', '5555', ''),
(28, '666', 0, '2018-12-03', '5555', ''),
(29, '666', 0, '2018-12-03', '5555', ''),
(30, '666', 0, '2018-12-03', '5555', ''),
(31, '666', 0, '2018-12-03', '5555', ''),
(32, '666', 0, '2018-12-03', '5555', ''),
(34, '1+1＝？', 0, '2018-12-19', 'painting is interesting', ''),
(35, '1312312313', 0, '2018-12-28', '&t=0.3617391866528792', ''),
(36, '423423424', 1, '2018-12-28', '&t=0.8196924567543913', ''),
(37, '1231231231232', 0, '2018-12-28', '&t=0.9958316211805309', ''),
(38, '123123113', 0, '2018-12-28', '&t=0.36153261262408365', ''),
(39, '5675675676', 0, '2019-01-12', '5675675676', ''),
(40, '21312313123', 0, '2019-01-15', '[{"flag":"circular","isChoosed":false,"x":900,"y":214.5,"r":296,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]}]', ''),
(41, '123123123123', 0, '2019-01-15', '[{"flag":"circular","isChoosed":false,"x":649,"y":293.5,"r":60,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"circular","isChoosed":false,"x":757,"y":305.5,"r":68,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"circular","isChoosed":false,"x":824.3622367885563,"y":296.20865699468186,"r":124,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"circular","isChoosed":false,"x":892,"y":364.5,"r":268,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]}]', ''),
(42, '12312312312', 0, '2019-01-15', '[{"flag":"circular","isChoosed":false,"x":920,"y":347.5,"r":116,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"circular","isChoosed":false,"x":1098,"y":309.5,"r":160,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"circular","isChoosed":false,"x":648,"y":277.5,"r":52,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"circular","isChoosed":false,"x":619.4199419232336,"y":234.05831172331511,"r":260,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"circular","isChoosed":false,"x":1159,"y":312.5,"r":100,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"segment","isChoosed":false,"x":1337,"y":392.5,"r":1240,"angle":3.2288591161895095,"anticlockwise":false}]', ''),
(44, '1231231231', 0, '2019-01-15', '[{"flag":"circular","isChoosed":false,"x":945,"y":316.5,"r":236,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]}]', ''),
(45, '123123123123123', 0, '2019-01-15', '[{"flag":"circular","isChoosed":false,"x":1298,"y":287.5,"r":128,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"circular","isChoosed":false,"x":839,"y":280.5,"r":272,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]}]', ''),
(46, '519519651951', 0, '2019-01-15', 'null', ''),
(47, '8978798987', 0, '2019-01-15', '[{"flag":"circular","isChoosed":false,"x":1036,"y":312.5,"r":136,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]}]', ''),
(48, '1890237189273812', 0, '2019-01-15', '[{"flag":"circular","isChoosed":false,"x":1065,"y":213.5,"r":24,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"segment","isChoosed":false,"x":1265,"y":112.5,"r":880,"angle":2.8448866807507573,"anticlockwise":false}]', ''),
(49, '289374238974289', 0, '2019-01-15', '[{"flag":"circular","isChoosed":false,"x":938,"y":346.5,"r":144,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"segment","isChoosed":false,"x":1291,"y":141.5,"r":700,"angle":2.8797932657906435,"anticlockwise":false},{"flag":"segment","isChoosed":false,"x":1279,"y":251.5,"r":816,"angle":2.775073510670984,"anticlockwise":false},{"flag":"circular","isChoosed":false,"x":1151.2389599976736,"y":300.5428683356141,"r":208,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"circular","isChoosed":false,"x":1318,"y":305.5,"r":228,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"circular","isChoosed":false,"x":1359.2168424807908,"y":303.57608409430077,"r":268,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"segment","isChoosed":false,"x":1111.6433064113382,"y":96.34643296743508,"r":552,"angle":3.001966313430247,"anticlockwise":false},{"flag":"segment","isChoosed":false,"x":657,"y":73.5,"r":580,"angle":2.426007660272118,"anticlockwise":false}]', ''),
(50, '1289731278361873', 0, '2019-01-15', '[{"flag":"circular","isChoosed":false,"lock":false,"x":327,"y":169.5,"r":380,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"circular","isChoosed":false,"lock":false,"x":491,"y":238.5,"r":204,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"segment","isChoosed":false,"lock":false,"x":722,"y":82.5,"r":748,"angle":2.7576202181510405,"anticlockwise":false}]', ''),
(51, '1231313123123123', 0, '2019-01-15', '[{"flag":"circular","isChoosed":false,"lock":false,"x":336,"y":146.5,"r":236,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]}]', ''),
(52, '95159191591', 0, '2019-01-15', '[{"flag":"circular","isChoosed":false,"lock":false,"x":326,"y":198.5,"r":348,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[{"flag":"fan","isChoosed":false,"lock":false,"x":326,"y":198.5,"r":348,"startAngle":6.021385919380437,"endAngle":6.702064327658226,"fillStyle":"rgba(0, 0, 0, 0)","anticlockwise":false,"hasChord":{"flag":"chord","isChoosed":false,"lock":false,"x":662.1421875485958,"y":108.43097230432281,"endX":643.9138192596251,"endY":340.0443517903785,"isShow":true}}]},{"flag":"segment","isChoosed":false,"lock":false,"x":758,"y":103.5,"r":316,"angle":1.6231562043547265,"anticlockwise":false},{"flag":"circular","isChoosed":false,"lock":false,"x":181,"y":189.5,"r":296,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]}]', ''),
(53, 'fsdfsdfsd', 0, '2019-01-15', '[{"flag":"circular","isChoosed":false,"lock":false,"x":271,"y":239.5,"r":192,"anticlockwise":false,"fillStyle":"rgba(128, 0, 128, 0.7)","fanAndRadius":[]}]', ''),
(55, '18923918273981723', 0, '2019-01-15', '[{"flag":"circular","isChoosed":false,"lock":false,"x":226,"y":236.5,"r":96,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[{"flag":"diameter","isChoosed":false,"lock":false,"x":226,"y":236.5,"r":96,"angle":1.2042771838760873,"anticlockwise":false},{"flag":"radius","isChoosed":false,"lock":false,"x":226,"y":236.5,"r":96,"angle":0.06981317007977318,"anticlockwise":false},{"flag":"fan","isChoosed":false,"lock":false,"x":226,"y":236.5,"r":96,"startAngle":3.263765701229396,"endAngle":3.263765701229396,"fillStyle":"rgba(0, 0, 0, 0)","anticlockwise":false,"hasChord":{"flag":"chord","isChoosed":false,"lock":false,"x":130.7155694424331,"y":224.80054303310587,"endX":130.7155694424331,"endY":224.80054303310587,"isShow":false}}]},{"flag":"segment","isChoosed":false,"lock":false,"x":493,"y":143.5,"r":276,"angle":1.3439035240356338,"anticlockwise":false}]', ''),
(56, '18923718973891', 0, '2019-01-15', '[{"flag":"circular","isChoosed":false,"lock":false,"x":387,"y":194.5,"r":96,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"circular","isChoosed":false,"lock":false,"x":570,"y":201.5,"r":112,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[{"flag":"fan","isChoosed":false,"lock":false,"x":570,"y":201.5,"r":112,"startAngle":6.14355896702004,"endAngle":7.208209810736581,"fillStyle":"rgba(0, 0, 0, 0)","anticlockwise":false,"hasChord":{"flag":"chord","isChoosed":false,"lock":false,"x":680.9100236990558,"y":185.91261269247263,"endX":637.4032825930294,"endY":290.9471771252968,"isShow":false}}]},{"flag":"circular","isChoosed":false,"lock":false,"x":510,"y":205.5,"r":204,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"circular","isChoosed":false,"lock":false,"x":440,"y":229.5,"r":300,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"point","isChoosed":false,"lock":false,"x":122,"y":78.5}]', ''),
(58, '⊙‖／⊙‖‖1289371928739', 0, '2019-01-16', '[{"flag":"circular","isChoosed":true,"lock":false,"x":348,"y":233.5,"r":68,"anticlockwise":false,"fillStyle":"rgba(128, 0, 128, 0.7)","fanAndRadius":[{"flag":"radius","isChoosed":false,"lock":false,"x":348,"y":233.5,"r":68,"angle":4.6600291028248595,"anticlockwise":false},{"flag":"fan","isChoosed":false,"lock":false,"x":348,"y":233.5,"r":68,"startAngle":2.199114857512855,"endAngle":2.199114857512855,"fillStyle":"rgba(0, 0, 0, 0)","anticlockwise":false,"hasChord":{"flag":"chord","isChoosed":false,"lock":false,"x":308.03060284411185,"y":288.5131556174964,"endX":308.03060284411185,"endY":288.5131556174964,"isShow":false}}]},{"flag":"point","isChoosed":false,"lock":false,"x":467,"y":173.5},{"flag":"segment","isChoosed":false,"lock":false,"x":487.07218879810404,"y":261.659355947451,"r":204,"angle":5.759586531581287,"anticlockwise":false},{"flag":"point","isChoosed":false,"lock":false,"x":241,"y":90.5},{"flag":"segment","isChoosed":false,"lock":false,"x":381.12496233598546,"y":130.82542724660564,"r":172,"angle":0.8901179185171081,"anticlockwise":false},{"flag":"segment","isChoosed":false,"lock":false,"x":381.12496233598546,"y":130.82542724660564,"r":284,"angle":0.10471975511965978,"anticlockwise":false}]', ''),
(59, '7812637812638', 0, '2019-01-16', '[{"flag":"circular","isChoosed":false,"lock":false,"x":197,"y":220.5,"r":156,"anticlockwise":false,"fillStyle":"rgba(0, 0, 0, 0)","fanAndRadius":[]},{"flag":"segment","isChoosed":false,"lock":false,"x":376,"y":359.5,"r":384,"angle":5.462880558742252,"anticlockwise":false}]', ''),
(60, '∪⊙±⊙∩啊实打实的', 0, '2019-01-16', '[{"flag":"circular","isChoosed":false,"lock":false,"x":305,"y":177.5,"r":156,"anticlockwise":false,"fillStyle":"rgba(30, 144, 255, 0.7)","fanAndRadius":[]}]', '');

-- --------------------------------------------------------

--
-- 表的结构 `teacher`
--

DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `t_id` int(11) UNSIGNED NOT NULL,
  `t_No` char(32) CHARACTER SET utf8 NOT NULL COMMENT '教师编号',
  `t_name` char(32) CHARACTER SET utf8 NOT NULL COMMENT '教师名称',
  `t_password` char(32) CHARACTER SET utf8 NOT NULL COMMENT '教师密码'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `teacher`
--

INSERT INTO `teacher` (`t_id`, `t_No`, `t_name`, `t_password`) VALUES
(1, '0010', 'abc', '123456'),
(2, '0022', '333', '123456'),
(3, '0033', '456', '123456');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`q_id`),
  ADD KEY `q_state` (`q_state`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`t_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `question`
--
ALTER TABLE `question`
  MODIFY `q_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- 使用表AUTO_INCREMENT `teacher`
--
ALTER TABLE `teacher`
  MODIFY `t_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
