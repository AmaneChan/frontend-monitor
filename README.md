# frontend-monitor

## 协作注意事项

- 项目分为 main dev feat 三种分支，请**不要直接 commit** 到 main dev 这两个分支上，而是从 dev 分支新建一个 feat-xxx 分支，开发完成后提交 pr 到 dev 分支。review 完成后我会合并这个 feat 分支。
- 项目使用 pnpm 进行包管理，使用 `npm install -g pnpm` 安装 pnpm 的最新版本。pnpm 的使用方式和平时使用 npm 基本一致，绝大多数场景可以直接使用 pnpm 替换原有命令中的 npm。
- 项目采用 monorepo 进行管理，前端项目在 `./package/frontend` ，后端项目位于 `./package/backend`。最好不要单独打开 `package` 下的文件夹进行开发。
  - 需要注意的是 monorepo 对依赖的管理方式有变动：安装到前端： `pnpm i <package> --filter frontend` 安装到后端： `pnpm i <package> --filter backend` 安装到整个 repo `pnpm i <package> -w`
- 虽然项目使用 [约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)，但实际上在自己的 feat 分支可以不用关心。（有兴趣的同学也可以点击学一下）我会在合并分支的时候合并为单个 commit 并编写合适的 commit 信息。
- 项目使用 `prettier-eslint` 格式化代码，请安装 [prettier-eslint vscode 插件](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint) 和 [prettier vscode 插件](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)。
  - 请设置 prettier-eslint 为 `.js` 文件的默认格式化工具；设置 prettier 为 `.ts` 的默认格式化工具。（原因是 eslint 不支持格式化 ts 只支持 js）
  - 如果你安装了 eslint 插件，请关闭 eslint 插件，因为 eslint 有时会和 prettier-eslint 冲突。
