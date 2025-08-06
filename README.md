# React 组件库 + Storybook

这个项目是一个基于 React + TypeScript + Vite 的组件库，使用 Storybook 进行组件开发和预览。

## 项目结构
├── src/
│   ├── components/
│   │   ├── ScrollableList.tsx       # 可滚动列表组件
│   │   └── ScrollableList.stories.tsx # 组件故事文件
│   ├── stories/
│   │   ├── Button.tsx               # 示例按钮组件
│   │   ├── Header.tsx               # 示例头部组件
│   │   ├── Page.tsx                 # 示例页面组件
│   │   └── 更多示例组件...
│   └── ...
├── .storybook/
│   ├── main.ts                      # Storybook 配置
│   └── preview.ts                   # Storybook 预览配置
└── ...


## 可用组件

### ScrollableList

一个支持下拉刷新和上拉加载更多的可滚动列表组件。

**特性：**
- 下拉刷新
- 上拉加载更多
- 滚动到底部自动加载
- 自定义列表项渲染

## Storybook 开发环境

### 启动 Storybook

```bash
# 安装依赖
npm install

# 启动 Storybook 开发服务器
npm run storybook
```

启动后，访问 http://localhost:6006 查看组件库。

### 查看组件故事

在 Storybook 界面中，您可以查看各个组件的不同状态和用法示例。每个组件都有详细的文档和交互演示。

### 开发新组件

1. 在 `src/components/` 目录下创建新组件文件（如 `NewComponent.tsx`）
2. 在同一目录下创建故事文件（如 `NewComponent.stories.tsx`）
3. 启动 Storybook 查看组件效果

## 组件引入方式

### 在您的项目中安装

```bash
# 尚未发布到 npm，本地开发可使用以下方式

# 1. 克隆本项目
git clone <repository-url>

# 2. 安装依赖
cd czPullPage
npm install

# 3. 构建组件库
npm run build
```

### 在 React 项目中使用

```tsx
// 引入组件
import ScrollableList from 'czPullPage/dist/components/ScrollableList';

// 使用组件
function App() {
  return (
    <ScrollableList
      initialData={['Item 1', 'Item 2', 'Item 3']}
      loadMore={() => Promise.resolve(['More Item 1', 'More Item 2'])}
      refresh={() => Promise.resolve(['Refreshed Item 1', 'Refreshed Item 2', 'Refreshed Item 3'])}
      renderItem={(item) => <div>{item}</div>}
      keyExtractor={(item, index) => `${item}-${index}`}
    />
  );
}
```

## 开发指南

### 组件开发规范

1. 每个组件必须有对应的类型定义
2. 组件必须提供完整的属性接口
3. 每个组件必须有对应的故事文件，展示不同状态
4. 组件应该是无状态的，依赖于传入的属性

### 测试组件

```bash
# 运行测试
npm run test
```

### 构建组件库

```bash
# 构建生产环境代码
npm run build
```

构建后的文件将生成在 `dist/` 目录下。

## 技术栈

- React
- TypeScript
- Vite
- Storybook
- ESLint
- Vitest