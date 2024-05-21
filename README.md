# utils

# 启动项目
> npm start

# 构建项目
> npm run make

# 安装项目依赖
> 请使用 npm install --save-dev 以免打包时带上 node_modules

# electron
1. electron 静态资源目录为 `static`
2. electorn 不支持 type `module`, 但是 `Typescript` 基本不用关心这个问题，使用 `js` 请注意用 `commonjs` 语法

# 路由配置
`src/utils/menu.ts` 里装了半个路由，与页面选项和菜单项绑定在一起  
`menuTables` 为菜单栏配置  
`fileOperation` 为文件操作选项卡，暂无功能  
`calculate` 为计算选项卡