/*
 Navicat Premium Dump SQL

 Source Server         : forguo.development
 Source Server Type    : MySQL
 Source Server Version : 80039 (8.0.39-0ubuntu0.22.04.1)
 Source Host           : 124.70.194.101:3306
 Source Schema         : wei_sys

 Target Server Type    : MySQL
 Target Server Version : 80039 (8.0.39-0ubuntu0.22.04.1)
 File Encoding         : 65001

 Date: 15/08/2024 22:33:03
*/

-- ----------------------------
-- 1. 创建数据库
-- ----------------------------
CREATE DATABASE IF NOT EXISTS wei_sys DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;


-- ----------------------------
-- 2. 创建表 && 数据初始化
-- ----------------------------

use youlai_boot;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config` (
      `id` bigint NOT NULL AUTO_INCREMENT,
      `configName` varchar(50) NOT NULL COMMENT '配置名称',
      `configKey` varchar(50) NOT NULL COMMENT '配置key',
      `configValue` varchar(100) NOT NULL COMMENT '配置值',
      `remark` varchar(200) DEFAULT NULL COMMENT '描述、备注',
      `createdBy` bigint NOT NULL COMMENT '创建人ID',
      `updatedBy` bigint DEFAULT NULL COMMENT '更新人ID',
      `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
      `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
      `deletedAt` datetime DEFAULT NULL COMMENT '删除时间，为空未删除',
      PRIMARY KEY (`id`)
) ENGINE=InnoDB COMMENT='系统配置';

INSERT INTO `sys_config` VALUES(1,'QPS','IP_QPS_LIMIT','10','单个IP请求的最大每秒查询数（QPS）阈值', 1001, 1001, '2024-08-10 14:53:51','2024-08-10 14:53:51',NULL);


-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '部门名称',
  `code` varchar(100) NOT NULL COMMENT '部门编号',
  `parentId` int NOT NULL DEFAULT '0' COMMENT '父节点id',
  `treePath` varchar(255) NOT NULL DEFAULT '' COMMENT '父节点id路径',
  `sort` int DEFAULT '0' COMMENT '显示顺序',
  `status` int NOT NULL DEFAULT '1' COMMENT '状态(1-正常 0-禁用)',
  `createdBy` int DEFAULT NULL COMMENT '创建人ID',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedBy` int DEFAULT NULL COMMENT '修改人ID',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  `deletedAt` datetime DEFAULT NULL COMMENT '删除时间，为空未删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ukCode` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
BEGIN;
INSERT INTO `sys_dept` (`id`, `name`, `code`, `parentId`, `treePath`, `sort`, `status`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`, `deletedAt`) VALUES (1, 'WEI', 'WEI', 0, '0', 1, 1, 1001, '2024-05-05 13:07:52', NULL, NULL, NULL);
INSERT INTO `sys_dept` (`id`, `name`, `code`, `parentId`, `treePath`, `sort`, `status`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`, `deletedAt`) VALUES (2, '开发', 'DEV001', 1, '0,1', 1, 1, 1001, '2024-05-05 13:08:52', NULL, NULL, NULL);
INSERT INTO `sys_dept` (`id`, `name`, `code`, `parentId`, `treePath`, `sort`, `status`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`, `deletedAt`) VALUES (3, '产品', 'PRO001', 1, '0,1', 1, 1, 1001, '2024-05-05 13:09:52', NULL, NULL, NULL);
INSERT INTO `sys_dept` (`id`, `name`, `code`, `parentId`, `treePath`, `sort`, `status`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`, `deletedAt`) VALUES (4, '测试', 'QA001', 1, '0,1', 1, 1, 1001, '2024-05-05 13:10:52', NULL, NULL, NULL);
INSERT INTO `sys_dept` (`id`, `name`, `code`, `parentId`, `treePath`, `sort`, `status`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`, `deletedAt`) VALUES (5, '前端组', 'WEB001', 2, '0,1,2', 1, 1, 1001, '2024-08-25 13:07:52', NULL, NULL, NULL);
COMMIT;


-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键 ',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '类型名称',
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '类型编码',
  `status` tinyint(1) DEFAULT '0' COMMENT '状态(0:正常;1:禁用)',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  `deletedAt` datetime DEFAULT NULL COMMENT '删除时间，为空未删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_code` (`code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='字典类型表';

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
BEGIN;
INSERT INTO `sys_dict` (`id`, `name`, `code`, `status`, `remark`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (1, '性别', 'gender', 1, NULL, '2019-12-06 19:03:32', '2024-06-22 21:14:47', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_dict_item
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_item`;
CREATE TABLE `sys_dict_item` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `dictId` int DEFAULT NULL COMMENT '字典ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '字典项名称',
  `value` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '字典项值',
  `status` tinyint DEFAULT '0' COMMENT '状态（1-正常，0-禁用）',
  `sort` int DEFAULT '0' COMMENT '排序',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '备注',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  `deletedAt` datetime DEFAULT NULL COMMENT '删除时间，为空未删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='字典数据表';

-- ----------------------------
-- Records of sys_dict_item
-- ----------------------------
BEGIN;
INSERT INTO `sys_dict_item` (`id`, `dictId`, `name`, `value`, `status`, `sort`, `remark`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (1, 1, '男', '1', 1, 1, NULL, '2024-05-05 13:07:52', '2024-08-12 23:20:39', NULL);
INSERT INTO `sys_dict_item` (`id`, `dictId`, `name`, `value`, `status`, `sort`, `remark`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (2, 1, '女', '2', 1, 2, NULL, '2024-06-19 11:33:00', '2024-08-02 14:23:05', NULL);
INSERT INTO `sys_dict_item` (`id`, `dictId`, `name`, `value`, `status`, `sort`, `remark`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (3, 1, '保密', '0', 1, 3, NULL, '2024-07-17 08:09:31', '2024-08-17 08:09:31', NULL);
COMMIT;


-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `module` enum('LOGIN','USER','ROLE','DEPT','MENU','DICT','OTHER') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '日志模块',
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '日志内容',
  `requestUri` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '请求路径',
  `ip` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'IP地址',
  `province` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '省份',
  `city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '城市',
  `executionTime` int DEFAULT NULL COMMENT '执行时间(ms)',
  `userAgent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'userAgent',
  `browser` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '浏览器',
  `browserVersion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '浏览器版本',
  `os` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '终端系统',
  `osVersion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '终端系统版本',
  `from` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '日志来源',
  `method` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '请求类型',
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '状态码',
  `message` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '返回消息',
  `createdBy` int DEFAULT NULL COMMENT '创建人ID',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  `deletedAt` datetime DEFAULT NULL COMMENT '删除时间，为空未删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='系统日志表';

-- ----------------------------
-- Records of sys_log
-- ----------------------------
BEGIN;
INSERT INTO `sys_log` (`id`, `module`, `content`, `requestUri`, `ip`, `province`, `city`, `executionTime`, `userAgent`, `browser`, `browserVersion`, `os`, `osVersion`, `from`, `method`, `status`, `message`, `createdBy`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (1, 'USER', 'login', 'login', '127.0.0.1', 'zj', 'hz', 100, 'Chrome/58.0.3029.110 Safari/537.3' ,'chrome', '19.0', 'mac', '11', 'web', 'post', '200', 'success', 1001, '2024-08-08 09:12:21', '2024-08-08 10:12:21', NULL);
INSERT INTO `sys_log` (`id`, `module`, `content`, `requestUri`, `ip`, `province`, `city`, `executionTime`, `userAgent`, `browser`, `browserVersion`, `os`, `osVersion`, `from`, `method`, `status`, `message`, `createdBy`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (2, 'USER', 'login', 'login', '127.0.0.1', 'zj', 'hz', 100, 'Chrome/58.0.3029.110 Safari/537.3', 'chrome', '19.0', 'win', '10', 'api', 'get', '200', 'success', 1001, '2024-08-08 09:12:21', '2024-08-08 10:12:21', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `parentId` int NOT NULL COMMENT '父菜单ID',
  `treePath` varchar(255) DEFAULT NULL COMMENT '父节点ID路径',
  `name` varchar(64) NOT NULL DEFAULT '' COMMENT '菜单名称',
  `type` int NOT NULL COMMENT '菜单类型（1-菜单 2-目录 3-外链 4-按钮）',
  `routeName` varchar(255) DEFAULT NULL COMMENT '路由名称（Vue Router 中用于命名路由）',
  `routePath` varchar(128) DEFAULT '' COMMENT '路由路径（Vue Router 中定义的 URL 路径）',
  `component` varchar(128) DEFAULT NULL COMMENT '组件路径（组件页面完整路径，相对于 src/views/，缺省后缀 .vue）',
  `perm` varchar(128) DEFAULT NULL COMMENT '【按钮】权限标识',
  `alwaysShow` int DEFAULT NULL COMMENT '【目录】只有一个子路由是否始终显示（1-是 0-否）',
  `keepAlive` int DEFAULT NULL COMMENT '【菜单】是否开启页面缓存（1-是 0-否）',
  `visible` int NOT NULL DEFAULT '1' COMMENT '显示状态（1-显示 0-隐藏）',
  `sort` int DEFAULT '0' COMMENT '排序',
  `icon` varchar(64) DEFAULT '' COMMENT '菜单图标',
  `redirect` varchar(128) DEFAULT NULL COMMENT '跳转路径',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  `params` json DEFAULT NULL COMMENT '路由参数',
  `deletedAt` datetime DEFAULT NULL COMMENT '删除时间，为空未删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (1, 0, '0', '系统管理', 2, '', '/system', 'Layout', NULL, NULL, NULL, 1, 1, 'system', '/system/user', '2021-08-28 09:12:21', '2024-06-24 23:49:04', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (2, 1, '0,1', '用户管理', 1, 'User', 'user', 'system/user/index', NULL, NULL, 1, 1, 1, 'el-icon-User', NULL, '2021-08-28 09:12:21', '2021-08-28 09:12:21', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (3, 1, '0,1', '角色管理', 1, 'Role', 'role', 'system/role/index', NULL, NULL, 1, 1, 2, 'role', NULL, '2021-08-28 09:12:21', '2021-08-28 09:12:21', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (4, 1, '0,1', '菜单管理', 1, 'Menu', 'menu', 'system/menu/index', NULL, NULL, 1, 1, 3, 'menu', NULL, '2021-08-28 09:12:21', '2021-08-28 09:12:21', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (5, 1, '0,1', '部门管理', 1, 'Dept', 'dept', 'system/dept/index', NULL, NULL, 1, 1, 4, 'tree', NULL, '2021-08-28 09:12:21', '2021-08-28 09:12:21', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (6, 1, '0,1', '字典管理', 1, 'Dict', 'dict', 'system/dict/index', NULL, NULL, 1, 1, 5, 'dict', NULL, '2021-08-28 09:12:21', '2021-08-28 09:12:21', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (20, 0, '0', '多级菜单', 2, NULL, '/multi-level', 'Layout', NULL, 1, NULL, 1, 9, 'cascader', '', '2022-02-16 23:11:00', '2022-02-16 23:11:00', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (21, 20, '0,20', '菜单一级', 1, NULL, 'multi-level1', 'demo/multi-level/level1', NULL, 1, NULL, 1, 1, '', '', '2022-02-16 23:13:38', '2022-02-16 23:13:38', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (22, 21, '0,20,21', '菜单二级', 1, NULL, 'multi-level2', 'demo/multi-level/children/level2', NULL, 0, NULL, 1, 1, '', NULL, '2022-02-16 23:14:23', '2022-02-16 23:14:23', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (23, 22, '0,20,21,22', '菜单三级-1', 1, NULL, 'multi-level3-1', 'demo/multi-level/children/children/level3-1', NULL, 0, 1, 1, 1, '', '', '2022-02-16 23:14:51', '2022-02-16 23:14:51', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (24, 22, '0,20,21,22', '菜单三级-2', 1, NULL, 'multi-level3-2', 'demo/multi-level/children/children/level3-2', NULL, 0, 1, 1, 2, '', '', '2022-02-16 23:15:08', '2022-02-16 23:15:08', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (26, 0, '0', '平台文档', 2, NULL, '/doc', 'Layout', NULL, NULL, NULL, 1, 8, 'document', 'https://github.com/wei-zone', '2022-02-17 22:51:20', '2022-02-17 22:51:20', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (30, 26, '0,26', '平台文档(外链)', 3, NULL, 'https://github.com/wei-zone', '', NULL, NULL, NULL, 1, 2, 'document', '', '2022-02-18 00:01:40', '2022-02-18 00:01:40', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (31, 2, '0,1,2', '用户新增', 4, NULL, '', NULL, 'sys:user:add', NULL, NULL, 1, 1, '', '', '2022-10-23 11:04:08', '2022-10-23 11:04:11', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (32, 2, '0,1,2', '用户编辑', 4, NULL, '', NULL, 'sys:user:edit', NULL, NULL, 1, 2, '', '', '2022-10-23 11:04:08', '2022-10-23 11:04:11', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (33, 2, '0,1,2', '用户删除', 4, NULL, '', NULL, 'sys:user:delete', NULL, NULL, 1, 3, '', '', '2022-10-23 11:04:08', '2022-10-23 11:04:11', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (36, 0, '0', '组件封装', 2, NULL, '/component', 'Layout', NULL, NULL, NULL, 1, 10, 'menu', '', '2022-10-31 09:18:44', '2022-10-31 09:18:47', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (37, 36, '0,36', '富文本编辑器', 1, NULL, 'wang-editor', 'demo/wang-editor', NULL, NULL, 1, 1, 2, '', '', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (38, 36, '0,36', '图片上传', 1, NULL, 'upload', 'demo/upload', NULL, NULL, 1, 1, 3, '', '', '2022-11-20 23:16:30', '2022-11-20 23:16:32', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (39, 36, '0,36', '图标选择器', 1, NULL, 'icon-selector', 'demo/icon-selector', NULL, NULL, 1, 1, 4, '', '', '2022-11-20 23:16:30', '2022-11-20 23:16:32', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (40, 0, '0', '接口文档', 2, NULL, '/api', 'Layout', NULL, 1, NULL, 1, 7, 'api', '', '2022-02-17 22:51:20', '2022-02-17 22:51:20', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (41, 40, '0,40', 'Apifox', 1, NULL, 'apifox', 'demo/api/apifox', NULL, NULL, 1, 1, 1, 'api', '', '2022-02-17 22:51:20', '2022-02-17 22:51:20', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (70, 3, '0,1,3', '角色新增', 4, NULL, '', NULL, 'sys:role:add', NULL, NULL, 1, 1, '', NULL, '2023-05-20 23:39:09', '2023-05-20 23:39:09', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (71, 3, '0,1,3', '角色编辑', 4, NULL, '', NULL, 'sys:role:edit', NULL, NULL, 1, 2, '', NULL, '2023-05-20 23:40:31', '2023-05-20 23:40:31', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (72, 3, '0,1,3', '角色删除', 4, NULL, '', NULL, 'sys:role:delete', NULL, NULL, 1, 3, '', NULL, '2023-05-20 23:41:08', '2023-05-20 23:41:08', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (73, 4, '0,1,4', '菜单新增', 4, NULL, '', NULL, 'sys:menu:add', NULL, NULL, 1, 1, '', NULL, '2023-05-20 23:41:35', '2023-05-20 23:41:35', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (74, 4, '0,1,4', '菜单编辑', 4, NULL, '', NULL, 'sys:menu:edit', NULL, NULL, 1, 3, '', NULL, '2023-05-20 23:41:58', '2023-05-20 23:41:58', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (75, 4, '0,1,4', '菜单删除', 4, NULL, '', NULL, 'sys:menu:delete', NULL, NULL, 1, 3, '', NULL, '2023-05-20 23:44:18', '2023-05-20 23:44:18', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (76, 5, '0,1,5', '部门新增', 4, NULL, '', NULL, 'sys:dept:add', NULL, NULL, 1, 1, '', NULL, '2023-05-20 23:45:00', '2023-05-20 23:45:00', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (77, 5, '0,1,5', '部门编辑', 4, NULL, '', NULL, 'sys:dept:edit', NULL, NULL, 1, 2, '', NULL, '2023-05-20 23:46:16', '2023-05-20 23:46:16', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (78, 5, '0,1,5', '部门删除', 4, NULL, '', NULL, 'sys:dept:delete', NULL, NULL, 1, 3, '', NULL, '2023-05-20 23:46:36', '2023-05-20 23:46:36', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (79, 6, '0,1,6', '字典类型新增', 4, NULL, '', NULL, 'sys:dict_type:add', NULL, NULL, 1, 1, '', NULL, '2023-05-21 00:16:06', '2023-05-21 00:16:06', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (81, 6, '0,1,6', '字典类型编辑', 4, NULL, '', NULL, 'sys:dict_type:edit', NULL, NULL, 1, 2, '', NULL, '2023-05-21 00:27:37', '2023-05-21 00:27:37', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (84, 6, '0,1,6', '字典类型删除', 4, NULL, '', NULL, 'sys:dict_type:delete', NULL, NULL, 1, 3, '', NULL, '2023-05-21 00:29:39', '2023-05-21 00:29:39', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (85, 6, '0,1,6', '字典数据新增', 4, NULL, '', NULL, 'sys:dict:add', NULL, NULL, 1, 4, '', NULL, '2023-05-21 00:46:56', '2023-05-21 00:47:06', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (86, 6, '0,1,6', '字典数据编辑', 4, NULL, '', NULL, 'sys:dict:edit', NULL, NULL, 1, 5, '', NULL, '2023-05-21 00:47:36', '2023-05-21 00:47:36', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (87, 6, '0,1,6', '字典数据删除', 4, NULL, '', NULL, 'sys:dict:delete', NULL, NULL, 1, 6, '', NULL, '2023-05-21 00:48:10', '2023-05-21 00:48:20', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (88, 2, '0,1,2', '重置密码', 4, NULL, '', NULL, 'sys:user:password:reset', NULL, NULL, 1, 4, '', NULL, '2023-05-21 00:49:18', '2024-04-28 00:38:22', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (89, 0, '0', '功能演示', 2, NULL, '/function', 'Layout', NULL, NULL, NULL, 1, 12, 'menu', '', '2022-10-31 09:18:44', '2024-05-26 21:05:25', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (90, 89, '0,89', 'Websocket', 1, NULL, '/function/websocket', 'demo/websocket', NULL, NULL, 1, 1, 3, '', '', '2022-11-20 23:16:30', '2022-11-20 23:16:32', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (91, 89, '0,89', '敬请期待...', 2, NULL, 'other/:id', 'demo/other', NULL, NULL, NULL, 1, 4, '', '', '2022-11-20 23:16:30', '2022-11-20 23:16:32', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (95, 36, '0,36', '字典组件', 1, NULL, 'dict-demo', 'demo/dict', NULL, NULL, 1, 1, 4, '', '', '2022-11-20 23:16:30', '2022-11-20 23:16:32', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (97, 89, '0,89', 'Icons', 1, NULL, 'icon-demo', 'demo/icons', NULL, NULL, 1, 1, 2, 'el-icon-Notification', '', '2022-11-20 23:16:30', '2022-11-20 23:16:32', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (102, 26, '0,26', '平台文档(内嵌)', 3, NULL, 'internal-doc', 'demo/internal-doc', NULL, NULL, NULL, 1, 1, 'document', '', '2022-02-18 00:01:40', '2022-02-18 00:01:40', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (105, 2, '0,1,2', '用户查询', 4, NULL, '', NULL, 'sys:user:query', 0, 0, 1, 0, '', NULL, '2024-04-28 00:37:34', '2024-04-28 00:37:34', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (106, 2, '0,1,2', '用户导入', 4, NULL, '', NULL, 'sys:user:import', NULL, NULL, 1, 5, '', NULL, '2024-04-28 00:39:15', '2024-04-28 00:39:15', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (107, 2, '0,1,2', '用户导出', 4, NULL, '', NULL, 'sys:user:export', NULL, NULL, 1, 6, '', NULL, '2024-04-28 00:39:43', '2024-04-28 00:39:43', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (108, 36, '0,36', '增删改查', 1, NULL, 'curd', 'demo/curd/index', NULL, NULL, 1, 1, 0, '', '', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (109, 36, '0,36', '列表选择器', 1, NULL, 'table-select', 'demo/table-select/index', NULL, NULL, 1, 1, 1, '', '', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (110, 0, '0', '路由参数', 2, NULL, '/route-param', 'Layout', NULL, 1, 1, 1, 11, 'el-icon-ElementPlus', NULL, '2024-05-26 21:05:09', '2024-05-26 21:05:34', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (111, 110, '0,110', '参数(type=1)', 1, NULL, 'route-param-type1', 'demo/route-param', NULL, 0, 1, 1, 1, 'el-icon-Star', NULL, '2024-05-26 21:59:24', '2024-05-26 21:59:37', '{\"type\": \"1\"}', NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (112, 110, '0,110', '参数(type=2)', 1, NULL, 'route-param-type2', 'demo/route-param', NULL, 0, 1, 1, 2, 'el-icon-StarFilled', NULL, '2024-05-26 21:46:55', '2024-05-26 21:59:45', '{\"type\": \"2\"}', NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (117, 1, '0,1', '系统日志', 1, 'Log', 'log', 'system/log/index', NULL, 0, 1, 1, 6, 'document', NULL, '2024-06-28 07:43:16', '2024-06-28 07:43:16', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (118, 0, '0', '系统工具', 2, NULL, '/tool', 'Layout', NULL, 0, 1, 1, 2, 'menu', NULL, '2024-07-13 08:41:07', '2024-07-13 08:41:07', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (119, 118, '0,118', '代码生成(Alpha)', 1, 'Generator', 'generator', 'generator/index', NULL, 0, 1, 1, 1, 'code', NULL, '2024-07-13 08:44:51', '2024-07-13 08:44:51', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (120, 1, '0,1', '系统配置', 1, 'Config', 'config', 'system/config/index', NULL, 0, 1, 1, 7, 'setting', NULL, '2024-07-30 16:29:24', '2024-07-30 16:29:32', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (121, 120, '0,1,120', '查询系统配置', 4, NULL, '', NULL, 'sys:config:query', 0, 1, 1, 1, '', NULL, '2024-07-30 16:29:54', '2024-07-30 16:29:54', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (122, 120, '0,1,120', '新增系统配置', 4, NULL, '', NULL, 'sys:config:add', 0, 1, 1, 2, '', NULL, '2024-07-30 16:30:12', '2024-07-30 16:30:48', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (123, 120, '0,1,120', '修改系统配置', 4, NULL, '', NULL, 'sys:config:update', 0, 1, 1, 3, '', NULL, '2024-07-30 16:30:31', '2024-07-30 16:30:31', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (124, 120, '0,1,120', '删除系统配置', 4, NULL, '', NULL, 'sys:config:delete', 0, 1, 1, 4, '', NULL, '2024-07-30 16:31:07', '2024-07-30 16:31:07', NULL, NULL);
INSERT INTO `sys_menu` (`id`, `parentId`, `treePath`, `name`, `type`, `routeName`, `routePath`, `component`, `perm`, `alwaysShow`, `keepAlive`, `visible`, `sort`, `icon`, `redirect`, `createdAt`, `updatedAt`, `params`, `deletedAt`) VALUES (125, 120, '0,1,120', '刷新系统配置', 4, NULL, '', NULL, 'sys:config:refresh', 0, 1, 1, 5, '', NULL, '2024-07-30 16:31:25', '2024-07-30 16:31:25', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '' COMMENT '角色名称',
  `code` varchar(32) NOT NULL COMMENT '角色编码',
  `sort` int DEFAULT NULL COMMENT '显示顺序',
  `status` int DEFAULT '1' COMMENT '角色状态(1-正常 0-停用)',
  `dataScope` int DEFAULT NULL COMMENT '数据权限(0-所有数据 1-部门及子部门数据 2-本部门数据3-本人数据)',
  `createdBy` int DEFAULT NULL COMMENT '创建人 ID',
  `createdAt` datetime DEFAULT NULL COMMENT '更新时间',
  `updatedBy` int DEFAULT NULL COMMENT '更新人ID',
  `updatedAt` datetime DEFAULT NULL COMMENT '创建时间',
  `deletedAt` datetime DEFAULT NULL COMMENT '删除时间，为空未删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ukName` (`name`),
  UNIQUE KEY `ukCode` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` (`id`, `name`, `code`, `sort`, `status`, `dataScope`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`, `deletedAt`) VALUES (1, '超级管理员', 'ROOT', 1, 1, 0, NULL, '2021-05-21 14:56:51', NULL, '2018-12-23 16:00:00', NULL);
INSERT INTO `sys_role` (`id`, `name`, `code`, `sort`, `status`, `dataScope`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`, `deletedAt`) VALUES (2, '系统管理员', 'ADMIN', 2, 1, 1, NULL, '2021-03-25 12:39:54', NULL, NULL, NULL);
INSERT INTO `sys_role` (`id`, `name`, `code`, `sort`, `status`, `dataScope`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`, `deletedAt`) VALUES (3, '访问游客', 'GUEST', 3, 1, 2, NULL, '2021-05-26 15:49:05', NULL, '2019-05-05 16:00:00', NULL);
INSERT INTO `sys_role` (`id`, `name`, `code`, `sort`, `status`, `dataScope`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`, `deletedAt`) VALUES (4, '系统管理员1', 'ADMIN1', 4, 1, 1, NULL, '2021-03-25 12:39:54', NULL, NULL, NULL);
INSERT INTO `sys_role` (`id`, `name`, `code`, `sort`, `status`, `dataScope`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`, `deletedAt`) VALUES (5, '系统管理员2', 'ADMIN2', 5, 1, 1, NULL, '2021-03-25 12:39:54', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL COMMENT '角色ID',
  `menuId` int NOT NULL COMMENT '菜单ID',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  `deletedAt` datetime DEFAULT NULL COMMENT '删除时间，为空未删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (1, 1, 1, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (2, 1, 2, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (3, 1, 3, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (4, 1, 4, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (5, 1, 5, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (6, 1, 6, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (7, 1, 20, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (8, 1, 21, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (9, 1, 22, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (10, 1, 23, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (11, 1, 24, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (12, 1, 26, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (13, 1, 30, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (14, 1, 31, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (15, 1, 32, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (16, 1, 33, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (17, 1, 36, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (18, 1, 37, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (19, 1, 38, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (20, 1, 39, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (21, 1, 40, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (22, 1, 41, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (23, 1, 70, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (24, 1, 71, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (25, 1, 72, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (26, 1, 73, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (27, 1, 74, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (28, 1, 75, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (29, 1, 76, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (30, 1, 77, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (31, 1, 78, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (32, 1, 79, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (33, 1, 81, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (34, 1, 84, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (35, 1, 85, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (36, 1, 86, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (37, 1, 87, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (38, 1, 88, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (39, 1, 89, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (40, 1, 90, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (41, 1, 91, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (42, 1, 95, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (43, 1, 97, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (44, 1, 102, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (45, 1, 105, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (46, 1, 106, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (47, 1, 107, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (48, 1, 108, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (49, 1, 109, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (50, 1, 110, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (51, 1, 111, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (52, 1, 112, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (53, 1, 114, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (54, 1, 115, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (55, 1, 116, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (56, 1, 117, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (57, 1, 118, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (58, 1, 119, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (59, 1, 120, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (60, 1, 121, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (61, 1, 122, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (62, 1, 123, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (63, 1, 124, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (64, 1, 125, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (65, 3, 40, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` (`id`, `roleId`, `menuId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (66, 3, 41, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) DEFAULT NULL COMMENT '用户名',
  `nickname` varchar(64) DEFAULT NULL COMMENT '昵称',
  `gender` int DEFAULT '1' COMMENT '性别((1-男 2-女 0-保密)',
  `password` varchar(100) DEFAULT NULL COMMENT '密码',
  `deptId` int DEFAULT NULL COMMENT '部门ID',
  `avatar` varchar(255) DEFAULT '' COMMENT '用户头像',
  `mobile` varchar(20) DEFAULT NULL COMMENT '联系方式',
  `status` int DEFAULT '1' COMMENT '状态((1-正常 0-禁用)',
  `email` varchar(128) DEFAULT NULL COMMENT '用户邮箱',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `createdBy` int DEFAULT NULL COMMENT '创建人ID',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  `updatedBy` int DEFAULT NULL COMMENT '修改人ID',
  `lastLoginAt` datetime DEFAULT NULL COMMENT '登录时间',
  `deletedAt` datetime DEFAULT NULL COMMENT '删除时间，为空未删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `loginName` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` (`id`, `username`, `nickname`, `gender`, `password`, `deptId`, `avatar`, `mobile`, `status`, `email`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `lastLoginAt`, `deletedAt`) VALUES (1001, 'root', '系统管理员', 0, '123456', 1, 'https://cos.cloud-app.com.cn/apps/wei/202408/header.jpg', '17621590365', 1, 'wei@163.com', '2024-02-10 13:41:22', NULL, '2024-08-17 11:54:35', NULL, NULL, NULL);
INSERT INTO `sys_user` (`id`, `username`, `nickname`, `gender`, `password`, `deptId`, `avatar`, `mobile`, `status`, `email`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `lastLoginAt`, `deletedAt`) VALUES (1002, 'admin', '管理员', 1, '123456', 1, 'https://cos.cloud-app.com.cn/apps/wei/202408/header.jpg', '17621210366', 1, 'wei@163.com', '2024-03-10 13:41:22', NULL, '2024-08-18 14:52:52', NULL, '2024-08-18 14:52:52', NULL);
INSERT INTO `sys_user` (`id`, `username`, `nickname`, `gender`, `password`, `deptId`, `avatar`, `mobile`, `status`, `email`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `lastLoginAt`, `deletedAt`) VALUES (1003, 'test', '测试小用户', 1, '123456', 4, 'https://cos.cloud-app.com.cn/apps/wei/202408/header.jpg', '17621210366', 1, 'wei@163.com', '2024-06-05 09:31:29', NULL, '2024-08-18 19:27:05', NULL, '2024-08-18 19:27:05', NULL);
INSERT INTO `sys_user` (`id`, `username`, `nickname`, `gender`, `password`, `deptId`, `avatar`, `mobile`, `status`, `email`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `lastLoginAt`, `deletedAt`) VALUES (1004, 'guest', '游客', 1, '123456', 4, 'https://cos.cloud-app.com.cn/apps/wei/202408/header.jpg', '17621210366', 1, 'wei@163.com', '2024-06-05 11:31:29', NULL, '2024-08-18 19:27:05', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL COMMENT '用户ID',
  `roleId` int NOT NULL COMMENT '角色ID',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  `deletedAt` datetime DEFAULT NULL COMMENT '删除时间，为空未删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_role` (`id`, `userId`, `roleId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (1, 1001, 1, NULL, NULL, NULL);
INSERT INTO `sys_user_role` (`id`, `userId`, `roleId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (2, 1001, 2, NULL, NULL, NULL);
INSERT INTO `sys_user_role` (`id`, `userId`, `roleId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (3, 1002, 1, NULL, NULL, NULL);
INSERT INTO `sys_user_role` (`id`, `userId`, `roleId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (4, 1002, 2, NULL, NULL, NULL);
INSERT INTO `sys_user_role` (`id`, `userId`, `roleId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (5, 1003, 3, NULL, NULL, NULL);
INSERT INTO `sys_user_role` (`id`, `userId`, `roleId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (6, 1004, 3, NULL, NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
