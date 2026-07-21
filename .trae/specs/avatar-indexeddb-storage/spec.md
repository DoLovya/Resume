# 头像 IndexedDB 本地存储优化 Spec

## Why
当前项目通过 `import defaultAvatar from '../../../static/images/defaultAvatar.jpg'` 引入本地静态资源作为默认头像，导致项目仓库包含了简历数据资源（图片）。用户希望项目仅保留简历网站代码，不包含任何简历数据资源。同时，头像图片需要在浏览器本地持久化缓存，实现浏览器常驻，不依赖外部服务。

## What Changes
- **移除本地静态头像资源依赖**：删除 `static/images/defaultAvatar.jpg` 的导入和使用
- **新增 IndexedDB 存储模块**：创建 `src/helpers/avatar-storage.ts`，提供头像图片的保存、读取、删除能力
- **改造头像设置表单**：将 `avatar.src` 的输入框改为图片上传组件，用户上传图片后转 Base64 存入 IndexedDB
- **改造 Avatar 组件**：从 IndexedDB 异步读取头像图片，无头像时显示占位符（姓名首字母）
- **调整数据流**：简历配置中 `avatar.src` 存储一个轻量标记（`indexeddb://avatar`），实际图片数据存于 IndexedDB，保持 localStorage 中简历配置轻量
- **BREAKING**：`avatar.src` 不再支持直接填写 URL，改为上传方式；旧配置中的 URL 将不再生效

## Impact
- Affected code:
  - `src/components/Avatar/index.tsx` - 移除 defaultAvatar 导入，改为从 IndexedDB 异步读取
  - `src/components/Avatar/index.less` - 调整占位符样式
  - `src/helpers/contant.tsx` - 头像设置表单项从 input 改为 upload
  - `src/components/index.tsx` - 初始化时从 IndexedDB 加载头像，上传时保存到 IndexedDB
  - `src/helpers/avatar-storage.ts`（新增）- IndexedDB 操作封装
  - `static/images/defaultAvatar.jpg` - 删除该文件

## ADDED Requirements

### Requirement: IndexedDB 头像存储
系统 SHALL 提供基于 IndexedDB 的头像图片本地持久化存储能力，支持图片的保存、读取和删除操作。

#### Scenario: 保存头像到 IndexedDB
- **WHEN** 用户上传一张头像图片
- **THEN** 图片被转为 Base64 Data URL 并存入 IndexedDB，key 为 `avatar`
- **AND** 存储成功后简历配置中 `avatar.src` 被设为 `indexeddb://avatar`

#### Scenario: 从 IndexedDB 读取头像
- **WHEN** Avatar 组件渲染且 `avatar.src` 为 `indexeddb://avatar`
- **THEN** 从 IndexedDB 异步读取 Base64 图片数据并显示

#### Scenario: 删除头像
- **WHEN** 用户清除头像
- **THEN** IndexedDB 中 `avatar` key 被删除，`avatar.src` 被设为空

#### Scenario: 无头像时显示占位符
- **WHEN** IndexedDB 中无头像数据或 `avatar.hidden` 为 true
- **THEN** 显示姓名首字母占位符，不依赖任何本地静态图片资源

### Requirement: 头像上传表单
系统 SHALL 提供图片上传交互，替代原有的 URL 输入框。

#### Scenario: 用户上传头像
- **WHEN** 用户在头像设置中点击上传并选择图片文件
- **THEN** 图片被压缩处理（限制最大尺寸）后存入 IndexedDB
- **AND** 简历预览实时更新头像

## MODIFIED Requirements

### Requirement: Avatar 组件渲染
Avatar 组件 SHALL 从 IndexedDB 异步加载头像图片，而非通过本地静态资源导入。组件需支持加载状态显示。移除对 `defaultAvatar.jpg` 的依赖。

## REMOVED Requirements

### Requirement: 本地静态头像资源
**Reason**: 项目需保持纯代码仓库，不包含简历数据资源
**Migration**: 用户通过上传图片方式设置头像，图片存储在浏览器 IndexedDB 中
