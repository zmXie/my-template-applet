# xg-scp-applet-template

## 模板初始 创建时 node 版本 使用 12.22.12 , 日期：2022年5月11日
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#### 项目结构
```
|--dist
    |--build                build输出文件
        |--h5
        |--mp-weixin
    |--dev                  dev输出文件
        |--mp-weixin
|--public
|--src
    |--api                  接口层
        |--modules          微服务模块接口
        |--index.js         接口汇聚
    |--components           符合vue组件规范的uni-app组件目录
        |--index.js
    |--libs
        |--util.js          函数库
        |--util.tool.js     工具方法
    |--pages                页面
        |--index
            |--index.vue
    |--plugin               插件
        |--frame            本项目框架层插件
            |--index.js
        |--request          请求封装
            |--index.js
    |--static               存放应用引用的本地静态资源（如图片、字体等）的目录，注意：静态资源只能存放于此
    |--store                vuex 状态管理
        |--modules
            |--jwt.js       jwt token状态
            |--user.js      用户信息状态
        |--frame.js
        |--index.js
    |--main.js              Vue初始化入口文件
    |--App.vue              应用配置，用来配置App全局样式以及监听 应用生命周期
    |--manifest.json        配置应用名称、appid、logo、版本等打包信息，详见
    |--pages.json           配置页面路由、导航条、选项卡等页面类信息，详见
    |--uni.scss             这里是uni-app内置的常用样式变量 
|--.env                     全局环境变量
|--.env.development         本地开发模式环境变量
|--.env.production          线上环境变量
|--.env.test                测试环境变量
|--vue.config.js            
```