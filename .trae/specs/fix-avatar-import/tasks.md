# Tasks

- [x] Task 1: 修改 importConfig 函数，添加头像数据恢复逻辑
  - **Priority**: high
  - **Depends On**: None
  - **Description**: 在 `src/components/index.tsx` 的 `importConfig` 函数中，解析 JSON 后检测 `avatar.src` 是否为 `indexeddb://avatar`，如果是，调用 `getAvatar()` 从 IndexedDB 读取头像数据并替换到配置中
  - **Acceptance Criteria Addressed**: AC-1, AC-2
  - **Test Requirements**:
    - `human-judgement` TR-1.1: 导入包含 `avatar.src: "indexeddb://avatar"` 的配置文件后，头像正常显示
    - `human-judgement` TR-1.2: IndexedDB 中无头像数据时，导入后显示占位符

- [x] Task 2: 修改 Avatar 组件，添加配置更新响应机制
  - **Priority**: high
  - **Depends On**: None
  - **Description**: 在 `src/components/Avatar/index.tsx` 中，添加一个配置版本 prop，当配置更新时触发头像重新加载。或者修改 `useEffect` 依赖，确保配置变化时能重新执行
  - **Acceptance Criteria Addressed**: AC-3
  - **Test Requirements**:
    - `human-judgement` TR-2.1: 多次导入配置后，头像显示保持正常

- [x] Task 3: TypeScript 编译验证
  - **Priority**: high
  - **Depends On**: Task 1, Task 2
  - **Description**: 运行 TypeScript 编译，确保无新增错误
  - **Test Requirements**:
    - `programmatic` TR-3.1: `npx tsc --noEmit` 无 Avatar 或 importConfig 相关错误

# Task Dependencies
- [Task 3] depends on [Task 1, Task 2]
