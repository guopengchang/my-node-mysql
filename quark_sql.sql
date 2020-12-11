DROP DATABASE IF EXISTS gpc_bank;
CREATE DATABASE gpc_bank
	CHARACTER SET utf8
	COLLATE utf8_bin;
SET NAMES 'utf8';
USE gpc_bank;
SET FOREIGN_KEY_CHECKS=0;

/* Create Tables */


DROP TABLE IF EXISTS `jd_user`;
CREATE TABLE `jd_user`
(
	`id`           INT           NOT NULL AUTO_INCREMENT      COMMENT '用户Id',
	`account`      VARCHAR(50)   UNIQUE NOT NULL              COMMENT '账号',
	`password`     VARCHAR(50)   NOT NULL                     COMMENT '密码',
	`real_name`    VARCHAR(50)   NOT NULL                     COMMENT '真实姓名',
	`reg_time`     DATETIME      NOT NULL                     COMMENT '注册时间',
	`remark`       VARCHAR(500)                               COMMENT '备注',
	`creator`      VARCHAR(10)   DEFAULT NULL                 COMMENT '创建人',
	`created`      DATETIME(0)   DEFAULT CURRENT_TIMESTAMP    COMMENT '创建时间',
	`modified`     DATETIME(0)   DEFAULT NULL                 COMMENT '修改时间',
	CONSTRAINT `PK_jd_user` PRIMARY KEY (`id`)
) COMMENT='用户表'
;

-- ----------------------------
-- Records of jd_user [admin@123]
-- ----------------------------
INSERT INTO jd_user (account, password, real_name, reg_time)
VALUES ('admin', 'admin@123', 'Admin', now());
INSERT INTO jd_user (account, password, real_name, reg_time)
VALUES ('test1', '123456', '张三', now());
INSERT INTO jd_user (account, password, real_name, reg_time)
VALUES ('test2', '123456', '李四', now());

SET FOREIGN_KEY_CHECKS=1;
