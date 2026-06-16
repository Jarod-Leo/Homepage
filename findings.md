# 调研与发现

## 参考站点

- 目标参考：`https://hwcoder.top/`
- 站点标题：`Hwcoder - Life Oriented Programming`
- 技术栈：页脚显示 Built on Hexo + GitHub with Fluid theme。
- 顶部导航：首页、归档、分类、标签、关于。
- 首页形态：文章列表流，每篇文章包含封面图、标题、摘要、日期、分类层级、标签。
- 归档页：按年份聚合文章，展示文章总数与日期。
- 分类页：展示分类树与分类下文章列表，支持多级分类。
- 标签页：用于标签云/标签索引。
- 关于页：头像、姓名、身份简介、社交链接、格言、教育经历、研究兴趣、论文、实习/工作经历、荣誉、博客说明。
- 文章页：正文、分类/标签、作者、发布日期、许可协议、上一篇/下一篇、目录、评论占位、搜索入口。
- 可借鉴实现：直接采用 Hexo Fluid 主题，减少从零仿制成本，同时保留后续个性化空间。

## 本地环境

- Node.js：可用，版本 `v24.14.0`。
- npm：可用，版本 `11.9.0`。
- Git：可用，版本 `2.46.0.windows.1`。
- Hexo CLI：未全局安装，采用项目本地依赖方式安装。

## 部署相关

- GitHub Pages 需要仓库启用 Pages，推荐使用 GitHub Actions 构建 Hexo 并发布。
- 自定义域名需要在仓库发布产物中包含 `CNAME` 文件，内容为 `www.jarodleo.top`。
- DNS 通常需要将 `www` 配置为 CNAME，指向 `<github-username>.github.io`。

## 轻量 CMS

- 采用 Sveltia CMS 作为可选后台入口：它是 Git-based headless CMS，兼容 Decap/Netlify CMS 配置，适合静态站点。
- Decap CMS 文档说明，`config.yml` 通常放在 `/admin` 目录；CMS 会把内容保存到配置的远程仓库分支，而不是本地开发目录。
- CMS 媒体目录设置为 `site/source/uploads`，构建后公开路径为 `/uploads`。
- 为降低破坏风险，CMS 先开放文章、关于页、项目页编辑；不开放主题配置和 GitHub Actions 配置编辑。
