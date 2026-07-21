# 修复重新导入配置导致头像失效问题 Spec

## Why
当前项目中，头像数据存储在浏览器 IndexedDB 中，而 `avatar.src` 仅存储一个标记 `indexeddb://avatar`。当用户导出配置后重新导入时，配置文件中只包含这个标记，而不是实际的图片数据。Avatar 组件的 `useEffect` 依赖于 `avatarSrc === 'indexeddb://avatar'`，如果这个值在导入前后保持不变，Effect 不会重新执行，导致头像无法从 IndexedDB 中正确加载，显示失效。

## What Changes
- **修改导入配置逻辑**：在 `importConfig` 函数中，当检测到 `avatar.src === 'indexeddb://avatar'` 时，先从 IndexedDB 异步读取头像数据，然后将其合并到配置中
- **修改 Avatar 组件**：添加配置版本依赖，确保配置更新时能触发头像重新加载
- 不修改导出逻辑，保持配置文件轻量（仅保存标记）

## Impact
- Affected code:
  - `src/components/index.tsx` - 修改 `importConfig` 函数，添加头像数据恢复逻辑
  - `src/components/Avatar/index.tsx` - 添加配置版本依赖，确保配置更新时重新加载头像

## ADDED Requirements

### Requirement: 导入配置时恢复头像数据
系统 SHALL 在导入配置时，检测 `avatar.src` 是否为 `indexeddb://avatar`，如果是，则从 IndexedDB 读取实际的头像 Base64 数据并合并到配置中。

#### Scenario: 重新导入配置后头像正常显示
- **Given**: 用户已上传头像，`avatar.src` 为 `indexeddb://avatar`，头像数据存在 IndexedDB 中
- **When**: 用户导出配置文件，然后重新导入该配置文件
- **Then**: 导入过程中自动从 IndexedDB 读取头像数据，更新到配置中，头像正常显示

#### Scenario: 导入配置时 IndexedDB 无头像数据
- **Given**: 用户导入的配置文件中 `avatar.src` 为 `indexeddb://avatar`，但当前浏览器的 IndexedDB 中没有头像数据
- **When**: 用户导入配置文件
- **Then**: 头像显示为姓名首字母占位符，不报错

## MODIFIED Requirements

### Requirement: Avatar 组件配置更新响应
Avatar 组件 SHALL 在配置更新时（即使 `avatarSrc` 值不变），重新检查并加载头像数据。

#### Scenario: 配置更新触发头像重新加载
- **Given**: Avatar 组件已加载过头像，`avatarSrc` 为 `indexeddb://avatar`
- **When**: 配置被重新导入，`avatar.src` 保持为 `indexeddb://avatar`
- **Then**: Avatar 组件检测到配置更新，重新从 IndexedDB 加载头像数据

## Constraints
- **技术**: 不修改导出逻辑，配置文件中仍只保存 `indexeddb://avatar` 标记
- **性能**: 避免每次渲染都查询 IndexedDB，只在配置更新时触发

## Assumptions
- 用户在同一浏览器中导出和导入配置，IndexedDB 数据在导出后仍然存在
- 用户可能在不同时间点重新导入配置

## Acceptance Criteria

### AC-1: 导入配置后头像正常显示
- **Given**: 用户已上传头像并导出配置
- **When**: 用户重新导入该配置文件
- **Then**: 头像正常显示（从 IndexedDB 恢复）
- **Verification**: `human-judgment`

### AC-2: IndexedDB 无数据时显示占位符
- **Given**: 导入的配置文件中 `avatar.src` 为 `indexeddb://avatar`，但 IndexedDB 为空
- **When**: 用户导入配置文件
- **Then**: 显示姓名首字母占位符，无错误
- **Verification**: `human-judgment`

### AC-3: 多次导入配置头像保持正常
- **Given**: 用户已成功导入配置并显示头像
- **When**: 用户再次导入相同或不同的配置文件
- **Then**: 头像显示不受影响（如果配置中包含头像标记，则重新加载；否则显示占位符）
- **Verification**: `human-judgment`
