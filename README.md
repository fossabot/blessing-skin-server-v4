<p align="center"><img src="https://img.blessing.studio/images/2017/01/01/bs-logo.png"></p>

优雅的开源 Minecraft 皮肤站，现在，回应您的等待。

Blessing Skin Server 是一款能让您上传、管理和分享您的 Minecraft 皮肤和披风的 Web 应用程序。与修改游戏材质包不同的是，所有人都能在游戏中看到各自的皮肤和披风（当然，前提是玩家们要使用同一个皮肤站）。

Blessing Skin Server 是一个开源的 PHP 项目，这意味着您可以自由地在您的服务器上部署它。这里有一个[演示站点](http://skin.prinzeugen.net/)。

## 特性
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fg-plane%2Fblessing-skin-server-v4.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fg-plane%2Fblessing-skin-server-v4?ref=badge_shield)

- 支持单用户多个角色
- 通过皮肤库来分享您的皮肤和披风！
- 易于使用
    - 可视化的用户、角色、材质管理页面
    - 详细的站点配置页面
- 安全
    - 只保存 Hash 后的用户密码
    - 防止恶意请求的积分系统

## 环境要求
Blessing Skin Server 对您的服务器有一定的要求。在大多数情况下，下列所需的 PHP 扩展已经开启。

- 一台支持 URL 重写的主机，Nginx、Apache 或 IIS
- **PHP >= 7.0.0** （如果服务器不支持，你可以用 v3.x 版本）
- PHP 的 OpenSSL 扩展
- PHP 的 PDO 扩展
- PHP 的 Mbstring 扩展
- PHP 的 Tokenizer 扩展
- PHP 的 GD 扩展（用于生成验证码）

## 快速使用
TODO

## 自行构建

GitHub 上的代码通常比稳定版新，如果您想体验未发布的特性（当然可能会有 bug），可以自行构建。

**不推荐不熟悉 shell 操作以及不想折腾的用户使用。**

首先确保您已经安装好 Node.js，推荐 Node.js 的版本 >= 8。另外您还需要安装 composer 和 yarn。

**依次**执行以下 shell 命令：

```shell
git clone https://github.com/printempw/blessing-skin-server.git
cd blessing-skin-server
composer install
yarn
yarn build
```

完成。

## 服务器配置

TODO

## FAQ

阅读 [Wiki - FAQ](https://github.com/printempw/blessing-skin-server/wiki/FAQ) 并在报告问题之前再次确认 FAQ 中确实没有提到你的情况。

## Bug 报告

请带上你的日志文件（位于 `storage/logs/laravel.log`）联系我。你还应该提供错误发生时服务器的一些信息。Bug 将会被尽快解决。

## 开发指南

**普通用户和大多数站长不需要阅读本节内容！**

如果您想为 Blessing Skin Server 贡献代码，或自行进行修改，请参考以下指导。

1. 确保您已经安装好 Node.js，推荐 Node.js 的版本 >= 8。另外您还需要安装 composer 和 yarn。

2. 此项目使用 composer 进行 PHP 的依赖管理；使用 yarn 进行 JavaScript 的依赖管理，不推荐**在本项目中**使用 npm，更不要提交 `package-lock.json`。

3. 此项目采用 Laravel 框架，如果您想贡献 PHP 代码或自行进行修改，建议您阅读相关的文档。

4. 前端使用了 Vue.js 和 TypeScript。因此如果您想贡献前端的代码或自行进行修改，您应该掌握一定 Vue.js 和 TypeScript 知识。

5. 执行 `yarn dev` 可获得带热重载的前端 UI 预览。执行 `yarn build` 来构建前端资源。

**如果您要贡献代码而不是做自行修改，那么您还要参考以下要求：**

1. 执行自动化测试，并确保它全部通过：（在 shell 中执行）

   ```shell
   yarn test
   ./vendor/bin/phpunit
   ```

2. 进行前端代码检查（在 shell 中执行）：`yarn lint`

## 版权

Blessing Skin Server 程序是基于 GNU General Public License v3.0 开放源代码的自由软件，你可以遵照 GPL v3 协议来修改和重新发布这一程序。

**例外情况**：任何为 Blessing Skin Server 皮肤站程序开发、调用了 Blessing Skin 插件 API 的插件程序，在未使用 Blessing Skin Server 程序源代码的情况下，无须采用 GPL v3 协议，也不强制要求开放插件源代码。

程序原作者为 [@printempw](https://blessing.studio/)，转载请注明。

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fg-plane%2Fblessing-skin-server-v4.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fg-plane%2Fblessing-skin-server-v4?ref=badge_large)