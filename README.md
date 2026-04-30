# 🍸 调酒配方

一个暗色高级感的全栈调酒配方应用。

## 功能

- 🏠 **配方浏览** — 48 款经典鸡尾酒，支持搜索/筛选（基酒、分类、难度、调法、标签）
- 🎯 **智能推荐** — 输入手边的材料，自动匹配能做的鸡尾酒
- ❤️ **收藏** — 一键收藏/取消
- ✨ **自创配方** — 创建、编辑自己的鸡尾酒配方
- 🍷 **酒柜管理** — 管理家里有的酒和材料
- 🎲 **随机推荐** — 不知道喝什么？随机一杯
- 📝 **调酒笔记** — 对配方记录心得和评分

## 技术栈

| 层 | 技术 |
|---|------|
| 前端 | React 18 + Vite |
| 后端 | Node.js + Express |
| 数据库 | SQLite (better-sqlite3) |
| 部署 | Docker + docker-compose |

## 快速启动

### 开发模式

```bash
npm install
cd client && npm install && cd ..
npm run seed    # 初始化数据库
npm run dev     # 同时启动前后端
```

前端: http://localhost:5173
API: http://localhost:3000/api

### 生产模式

```bash
cd client && npx vite build && cd ..
npm run seed
npm start
```

访问 http://localhost:3000

### Docker 部署

```bash
cd client && npx vite build && cd ..
docker compose up --build -d
```

访问 http://localhost:3000

## API

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/cocktails | 列表（支持 search/base_spirit/category/difficulty/tag/method 筛选） |
| GET | /api/cocktails/filters | 获取所有筛选选项 |
| GET | /api/cocktails/random | 随机一款 |
| GET | /api/cocktails/recommend?ingredients=金酒,柠檬 | 智能推荐 |
| GET | /api/cocktails/:id | 详情 |
| GET | /api/favorites | 收藏列表 |
| POST | /api/favorites/:id | 切换收藏 |
| GET | /api/custom | 自创配方列表 |
| POST | /api/custom | 创建自创配方 |
| PUT | /api/custom/:id | 更新自创配方 |
| DELETE | /api/custom/:id | 删除自创配方 |
| POST | /api/custom/:id/notes | 添加笔记 |
| GET | /api/custom/bar-shelf/list | 酒柜列表 |
| POST | /api/custom/bar-shelf | 添加酒柜物品 |
| DELETE | /api/custom/bar-shelf/:id | 删除酒柜物品 |

## 项目结构

```
cocktail-app/
├── client/               # React 前端
│   ├── src/
│   │   ├── components/   # UI 组件
│   │   ├── pages/        # 页面
│   │   ├── utils/        # 工具函数
│   │   └── index.css     # 全局样式（暗色主题）
│   └── dist/             # 构建产物
├── server/               # Express 后端
│   ├── db/               # 数据库初始化 & 种子数据
│   └── routes/           # API 路由
├── Dockerfile
├── docker-compose.yml
└── package.json
```
