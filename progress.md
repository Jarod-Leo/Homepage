# 进度日志

## 2026-06-16

- 创建 `task_plan.md`，明确 Hexo + GitHub Pages + `www.jarodleo.top` 的实施方案。
- 创建 `findings.md`，用于持续记录参考站点、环境与部署发现。
- 创建 `progress.md`，用于实时记录每个功能和阶段的完成情况。
- 完成参考站点初步调研：确认参考站点基于 Hexo + Fluid，记录导航、首页、归档、分类、标签、关于页、文章页等基础功能。
- 完成本地环境检查：Node/npm/Git 可用，Hexo CLI 未全局安装，决定使用项目本地依赖并将博客项目放在 `site/`。
- 生成并保存本地首页横幅图：`site/source/img/site-banner.png`。
- 完成 Hexo 项目骨架：新增 `site/package.json`、Hexo 主配置、Fluid 主题配置、基础页面、示例文章、CNAME、GitHub Actions 和 README。
- npm 依赖安装命令首次运行超过 120 秒超时，但依赖目录和 `package-lock.json` 已生成；`npm ls --depth=0` 确认 Hexo、Fluid 和生成器插件已安装完整。
- 首次构建只输出 Hexo 帮助信息，未生成站点；定位为缺少 `hexo-cli`，已将其加入 `site/package.json`。
- 继续定位 Hexo CLI 项目识别逻辑，补充 `package.json` 的 `hexo` 字段，让 CLI 能识别 `site/` 为 Hexo 项目。
- 构建验证通过：`npm run build` 成功生成首页、文章、归档、分类、标签、关于、项目、友链、RSS、Sitemap、搜索索引和 `CNAME`。
- 启动本地预览时遇到 Windows `Path/PATH` 环境变量冲突导致 `Start-Process` 失败，准备改用后台 Job 或静态产物验证。
- 新增本地头像/站点图标 `site/source/img/avatar.png`，并将 Fluid 的 favicon、关于页头像、友链头像指向本地资源。
- 浏览器逐页验证发现 `/links/` 被 Fluid 默认友链配置接管，已改为在 `_config.fluid.yml` 中配置自定义友链数据。
- 为关于页增加 `layout: about`，启用 Fluid 原生关于页头像和社交入口布局。
- 初始化本地 Git 仓库为 `main` 分支；将 `work/`、`outputs/`、`node_modules/`、`public/` 等临时或构建目录加入忽略。
- 完成本地浏览器验证：桌面端关键页面可访问，友链/关于页修正后无控制台错误；移动端 390px 宽度下首页、关于、项目、友链、文章页均无横向溢出。
- 完成文件级验证：`site/public/CNAME` 内容为 `www.jarodleo.top`，RSS、Sitemap、本地搜索索引均已生成。
- 开始推送到 GitHub 仓库 `Jarod-Leo/Homepage`：确认本地仓库位于 `main`，当前没有远程仓库；本机未安装 `gh`，改用 `git` 直接推送。
- 已检查远程 `https://github.com/Jarod-Leo/Homepage.git`，仓库可访问且未返回已有分支，按空仓库处理，准备设置 `origin` 并提交。
- 已设置 Git 远程 `origin` 为 `https://github.com/Jarod-Leo/Homepage.git`。
- 首次 `git push` 因 GitHub HTTPS 凭据无效失败；改为使用用户提供的临时 GitHub access token 进行本次推送，不将 token 写入 remote URL 或项目文件。
- 使用临时 token 推送时 GitHub 拒绝更新 `.github/workflows/pages.yml`，原因是该 token 缺少 `workflow` scope；需要换用带 `workflow` 权限的 token，或改为先不推送 GitHub Actions 工作流。
- 用户提供了新的 GitHub access token，准备使用一次性 HTTP 授权头重新推送，不将 token 持久化到 Git 配置或项目文件。
- 推送成功：`main` 分支已上传到 `https://github.com/Jarod-Leo/Homepage.git`，本地 `main` 已跟踪 `origin/main`，远程提交为 `108890b`。

## 2026-06-17

- 开始接入轻量 CMS：目标是在不重构 Hexo/Fluid/GitHub Actions 的前提下新增独立 `/admin/` 后台入口。
- 调研 CMS 接入方式：选择 Sveltia CMS + Decap 兼容配置，后台仍然把内容提交到 `Jarod-Leo/Homepage` 的 `main` 分支。
- 新增 `site/source/admin/index.html` 和 `site/source/admin/config.yml`，接入 Sveltia CMS；配置文章、关于页、项目页和上传媒体目录。
- 更新 `site/_config.yml` 的 `skip_render`，让 Hexo 原样复制 `/admin/` 后台文件，降低渲染破坏风险。
- 更新 README，补充 CMS 后台地址、可编辑内容范围和 GitHub token 权限说明。
- 本地构建验证通过：`npm run build` 成功生成 45 个文件，包含 `admin/index.html` 和 `admin/config.yml`。
- 本地浏览器验证通过：`http://127.0.0.1:4000/admin/` 打开为 Sveltia CMS，显示 GitHub 登录和 Access Token 登录入口，控制台无错误。
- CMS 接入提交 `eaa452f` 已推送到 GitHub；GitHub Actions #4 部署成功，线上 `https://www.jarodleo.top/admin/` 和 `https://www.jarodleo.top/admin/config.yml` 均返回 200。
- 处理 CMS 普通 GitHub 登录失败：确认默认入口会跳到 Netlify OAuth；在未配置 OAuth Worker 时隐藏普通 GitHub 登录按钮，提示使用 Access Token 登录，并补充 Cloudflare Workers OAuth 配置说明。
- 开始支持 LaTeX 公式：保留默认 `hexo-renderer-marked`，启用 Fluid MathJax 按文章渲染，并在 CMS 文章表单新增“启用公式渲染”开关；曾测试 markdown-it 路线，但因插件与新版 markdown-it 不兼容而撤回。
- LaTeX 支持验证通过：`npm run build` 成功，`npm audit` 为 0 个漏洞；临时测试页确认会加载 MathJax，CMS 配置确认包含“启用公式渲染”字段。
- 发现 CMS 新增的 PPO 文章包含大量公式；已为该文章补充 `math: true`，并新增本地 Hexo filter 保护公式内容，避免 Markdown 在 MathJax 渲染前误解析公式下标。
