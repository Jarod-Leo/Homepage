# Hexo + GitHub Pages 个人网站搭建方案

## 目标

使用 Hexo + GitHub Pages + `www.jarodleo.top` 搭建一个个人网站，功能与信息架构参考 `https://hwcoder.top/`，形成可本地预览、可提交到 GitHub、可通过 GitHub Pages 发布并绑定自定义域名的静态博客项目。

## 总体方案

- 静态博客框架：Hexo
- 部署平台：GitHub Pages
- 自定义域名：`www.jarodleo.top`
- 内容格式：Markdown
- 站点形态：个人主页 + 博客文章列表 + 分类/标签 + 归档 + 关于页面 + 友链/项目入口
- 发布方式：GitHub Actions 自动构建并部署到 GitHub Pages
- 域名绑定：生成 `source/CNAME`，内容为 `www.jarodleo.top`

## 参考功能范围

- 首页展示个人简介、最新文章、导航入口
- 文章详情页支持代码高亮、目录、日期、标签/分类
- 归档页按时间展示文章
- 分类页和标签页用于内容组织
- 关于页展示个人介绍、技能/研究兴趣/联系方式
- 项目或作品页展示可维护的个人项目
- 友链页预留站点链接管理
- RSS/Sitemap/SEO 基础配置
- GitHub Pages 自动部署配置

## 实施阶段

| 阶段 | 状态 | 内容 |
| --- | --- | --- |
| 1. 环境与参考站点调研 | complete | 检查 Node/npm/Hexo 可用性，抓取参考站点功能和页面结构 |
| 2. 初始化 Hexo 项目 | complete | 创建 Hexo 站点、安装依赖、确认本地构建可运行 |
| 3. 主题与信息架构 | complete | 选择并配置适合个人博客的主题，建立导航、页面、站点配置 |
| 4. 内容与页面实现 | complete | 创建首页内容、关于、项目、友链、示例文章、分类标签 |
| 5. GitHub Pages 部署配置 | complete | 添加 GitHub Actions、CNAME、部署说明和必要配置 |
| 6. 本地验证与交付 | complete | 构建、预览、修复问题，整理最终说明 |

## 关键决策

- 在未获得 GitHub 用户名和仓库权限前，先完成本地项目与 GitHub Pages 自动部署模板；如果本机已有 `gh` 登录态或用户补充仓库信息，再继续创建/推送远程仓库。
- 站点默认使用 `www.jarodleo.top` 作为 `url`，避免上线后链接重复调整。
- 页面文案先使用可替换的个人站占位内容，结构完整优先，后续可替换为真实履历、项目与文章。

## 待确认项

- GitHub 用户名与目标仓库名。
- 是否已有 DNS 管理权限，以及域名当前托管在阿里云、腾讯云、Cloudflare 或其他平台。
- 个人网站真实头像、昵称、简介、联系方式、项目列表。
- 是否需要我继续创建 GitHub 远程仓库、提交并推送上线。

## 错误记录

| 时间 | 问题 | 处理 |
| --- | --- | --- |
| 2026-06-16 | `npm install` 首次运行超过 120 秒超时 | 检查 `node_modules`、`package-lock.json` 与 `npm ls --depth=0`，确认依赖已安装完整 |
| 2026-06-16 | `npm run build` 只输出 Hexo 帮助，未生成 `public` | 发现缺少 `hexo-cli` 且 `package.json` 缺少 `hexo` 站点标识；已补齐 |
| 2026-06-16 | `Start-Process` 启动预览时报 `Path/PATH` 环境变量冲突 | 改用 PowerShell 后台 Job 或直接静态产物验证 |
