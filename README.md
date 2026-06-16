# Jarod Leo Personal Site

这是使用 Hexo + GitHub Pages + `www.jarodleo.top` 搭建的个人网站项目。

## 本地开发

```bash
cd site
npm install
npm run server
```

本地预览地址：

```text
http://127.0.0.1:4000
```

## 构建

```bash
cd site
npm run build
```

构建产物位于：

```text
site/public
```

## GitHub Pages 部署

本仓库已包含 `.github/workflows/pages.yml`。推送到 `main` 分支后，GitHub Actions 会：

1. 安装 `site/` 下的依赖。
2. 运行 Hexo 构建。
3. 将 `site/public` 发布到 GitHub Pages。

在 GitHub 仓库中需要将 Pages 的 Source 设置为 `GitHub Actions`。

## 域名配置

项目已生成：

```text
site/source/CNAME
```

内容为：

```text
www.jarodleo.top
```

DNS 侧通常添加：

```text
类型：CNAME
主机记录：www
记录值：<你的 GitHub 用户名>.github.io
```

例如 GitHub 用户名是 `jarodleo`，记录值通常是：

```text
jarodleo.github.io
```

如果还需要让 `jarodleo.top` 自动跳转到 `www.jarodleo.top`，建议在 DNS/托管平台中额外配置根域名跳转或根域名 Pages 解析。

