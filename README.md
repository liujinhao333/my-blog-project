# My Blog Project

一个基于 Spring Boot + Vue3 的个人博客系统，包含文章管理、评论、日记、作品集等功能。

## 技术栈

### 前端
- Vue 3 + Vue Router + Pinia
- Element Plus UI 组件库
- Vite 构建工具

### 后端
- Spring Boot 3.2
- Spring Security + JWT 认证
- MyBatis Plus ORM
- MySQL 数据库

## 功能特性

- 文章管理（CRUD、置顶、分类）
- 用户认证（注册、登录、JWT Token）
- 评论系统
- 日记功能
- 作品集展示
- 文章点赞和浏览统计
- 响应式设计
- 暗黑主题

## 项目结构

```
my-blog-project/
├── backend/          # Spring Boot 后端
│   ├── src/main/java/com/karin/blog/
│   │   ├── config/   # 配置类
│   │   ├── controller/  # 控制器
│   │   ├── service/     # 服务层
│   │   ├── entity/      # 实体类
│   │   ├── mapper/      # MyBatis Mapper
│   │   ├── dto/         # 数据传输对象
│   │   └── security/    # JWT 安全相关
│   └── src/main/resources/
│       ├── application.yml    # 应用配置
│       └── schema.sql         # 数据库脚本
├── src/              # Vue3 前端
│   ├── api/          # API 接口
│   ├── components/   # 组件
│   ├── views/        # 页面视图
│   ├── stores/       # Pinia 状态管理
│   ├── router/       # 路由配置
│   └── styles/       # 样式文件
├── nginx.conf        # Nginx 配置
└── docker-compose.yml # Docker 部署配置
```

## 快速开始

### 环境要求
- JDK 17+
- Node.js 18+
- MySQL 8.0+

### 后端启动

1. 创建数据库并执行 schema.sql
2. 修改 `backend/src/main/resources/application.yml` 中的数据库配置
3. 运行 `BlogApplication.java`

### 前端启动

```bash
npm install
npm run dev
```

### Docker 部署

```bash
docker-compose up -d
```

## 配置说明

### 环境变量

后端支持以下环境变量：
- `DB_HOST` - 数据库主机地址
- `DB_PORT` - 数据库端口
- `DB_NAME` - 数据库名称
- `DB_USERNAME` - 数据库用户名
- `DB_PASSWORD` - 数据库密码
- `JWT_SECRET` - JWT 密钥

## 许可证

MIT License
