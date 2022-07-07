# vue-element-plus-next

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Description

> 基于Vue3.0 + Vite + TS，二次封装Element Plus业务组件

### Project Tips

+ Vue3最新语法及高级特性
+ 如何设计一个简单好用的组件
+ 二次封装组件的思想与技巧
+ 组合式使用现有组件
+ 命名规则
  + 文件名：小驼峰
  + 公共组件名：文件名大写 + index.vue
  + 组件名：大驼峰

### 关于路由引入

> npm i vue-router@next -s

```typescript
import { createRouter, createWebHistory } from 'vue-router';
// 引入路由record类型限制，直接引入会报错，必须加 type
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
    children: []
  }
]
```

### Element Plus使用

#### 1.使用图标

> element plus的图标全部变成了组件并使用svg格式，使用时需要先使用包管理器引入`npm i @element-plus/icons-vue`

##### 1.1 引入方式

+ 全局注册

```typescript
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
```

+ 按需引入（自动导入）

> 使用 `unplugin-icons` 和 `unplugin-auto-import`从iconify中自动导入任何图标集
配置参考：<https://github.com/sxzz/element-plus-best-practices/blob/db2dfc983ccda5570033a0ac608a1bd9d9a7f658/vite.config.ts#L21-L58>

##### 1.2 格式转换，形成 `el-icon-xxx`形式

```typescript
  export const transToKeyBase = (key: string) => {
    return key.replace(/([a-z])([A-Z])/, '$1-$2').toLocalLowerCase()
  }
```

##### 思考

**如果想使用`自动导入`并且想使用`el-icon-xxx`命名方式，如何处理？**

#### 2.父子组件传值

+ `v-model:value`
+ `defineProps`
+ `defineEmits`

#### 3.watch监听

#### 4.文本复制hook实现

#### 5.interface 和 ‘!’ 的使用
