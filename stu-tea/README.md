# vue-cli3 + webpack4 + typescript


# math_course


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# start serve
npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

# npm install 安装问题
npm 报错 chromedriver@2.41.0 install: `node install.js`
解决：手动执行 npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver

# 编写过程中的注意问题
1、引入static目录(与src目录同级)下的文件，需要'./static/xxx'。
2、开发环境时路由页面下的mode:'history'可以去掉地址的 # ；但是在生产环境时，必须为mode:'hash'，否则编译后页面空白。

# knowledge that update vue with webpack
https://blog.csdn.net/qq_16559905/article/details/79404173
https://juejin.im/post/5b4ca3a5e51d4519596b7a06

# 参考
https://github.com/lentoo/blog

# 目录结构
.editorconfig 编辑器的编码风格规范，需要编辑器安装EditorConfig插件
.eslintignore 忽略的目录
.eslintrc.js  javascript的代码规范检查
tsconfig.json typescript的文件检查
tslint.json   typescript的代码规范检查
