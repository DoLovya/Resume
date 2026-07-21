# Tasks

- [x] Task 1: 创建 IndexedDB 头像存储 helper 模块
  - [ ] SubTask 1.1: 创建 `src/helpers/avatar-storage.ts`，封装 IndexedDB 操作
  - [ ] SubTask 1.2: 实现 `saveAvatar(base64: string): Promise<void>` 保存头像
  - [ ] SubTask 1.3: 实现 `getAvatar(): Promise<string | null>` 读取头像
  - [ ] SubTask 1.4: 实现 `removeAvatar(): Promise<void>` 删除头像
  - [ ] SubTask 1.5: 实现图片压缩工具函数（限制最大尺寸 400px，避免 IndexedDB 存储过大）

- [x] Task 2: 改造 Avatar 组件，移除本地静态资源依赖
  - [ ] SubTask 2.1: 移除 `import defaultAvatar` 导入
  - [ ] SubTask 2.2: 改为从 IndexedDB 异步读取头像，支持加载状态
  - [ ] SubTask 2.3: 无头像时显示姓名首字母占位符
  - [ ] SubTask 2.4: 更新 `src/components/Avatar/index.less` 占位符样式

- [x] Task 3: 改造头像设置表单
  - [ ] SubTask 3.1: 在 `src/helpers/contant.tsx` 中将 `avatar.src` 的 input 改为 upload 类型
  - [ ] SubTask 3.2: 实现上传回调：图片转 Base64 → 压缩 → 存入 IndexedDB → 设置 `avatar.src` 为 `indexeddb://avatar`

- [x] Task 4: 调整数据流，集成 IndexedDB 加载逻辑
  - [ ] SubTask 4.1: 在 `src/components/index.tsx` 中，初始化时从 IndexedDB 加载头像到 config
  - [ ] SubTask 4.2: 确保头像变更时同步更新 IndexedDB 和简历配置

- [x] Task 5: 删除本地静态头像资源文件
  - [ ] SubTask 5.1: 删除 `static/images/defaultAvatar.jpg`

- [x] Task 6: 验证整体功能
  - [ ] SubTask 6.1: TypeScript 编译通过
  - [ ] SubTask 6.2: 上传头像后刷新页面，头像仍能正常显示（IndexedDB 持久化）
  - [ ] SubTask 6.3: 清除头像后显示占位符
  - [ ] SubTask 6.4: 项目中无 `defaultAvatar` 引用残留

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 1, Task 2]
- [Task 5] depends on [Task 2]
- [Task 6] depends on [Task 1, Task 2, Task 3, Task 4, Task 5]
