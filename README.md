# builder-cins


Webpack 构建器, 适用于cins的项目构建

## 特性

- 使用webpack4最新的构建解决方案
- 支持less,jsx的文件打包

## 安装

```
$ npm install builder-cins
```

## 快速使用

### 添加feflow.json配置文件

修改generator-cins生成的 `feflow.json` 配置文件

``` sh
{
    "builderType": "builder-cins"

}
```

### 命令

```sh
$ feflow dev      # 本地开发时的命令
$ feflow build    # 发布时的打包命令
```

## 未来优化
- 增加项目优化板块
- 改成cli可视化添加配置
