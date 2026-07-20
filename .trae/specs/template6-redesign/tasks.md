# Template6 重设计 - 实现计划

## [x] Task 1: 修改 Template6 组件，移除全局 theme 依赖
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 将所有引用 `theme.color`、`theme.tagColor`、`theme.skillIconColor` 的地方替换为模板内固定颜色值
  - 仅保留 `theme.margin` 的引用（用于页面内边距配置）
  - 移除 `toAlphaColor` 和 `formatProfileLinkText` 中与主题色相关的逻辑
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgment` TR-1.1: 检查代码中是否仍有引用 theme.color/tagColor/skillIconColor/awardIconColor 的地方
  - `human-judgment` TR-1.2: 切换全局主题色，确认 Template6 配色不变

## [x] Task 2: 重设计头部区域（深蓝顶栏版）
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 头部使用深蓝色背景（#1e3a5f），白色文字
  - 左侧：姓名（大字号粗体）+ 联系方式（带图标，白色图标）
  - 右侧：方形头像（圆角或直角）
  - 联系方式格式：图标 + 标签（如"电话："）+ 值，竖排或横排
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `human-judgment` TR-2.1: 头部背景为深蓝色，文字为白色
  - `human-judgment` TR-2.2: 姓名大字号粗体，联系方式带图标
  - `human-judgment` TR-2.3: 头像在右侧，方形

## [x] Task 3: 重设计模块分隔线和标题样式
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 各模块标题使用粗体，下方带下划线分隔
  - 深蓝顶栏版使用细灰线（#e0e0e0）
  - 标题文字颜色为深色（#333）
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgment` TR-3.1: 每个模块标题下方有下划线
  - `human-judgment` TR-3.2: 标题粗体显示，颜色为深色

## [x] Task 4: 重设计个人技能区域（黄色勾号图标）
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 使用黄色（#f5a623）勾号图标（✓），替代 CheckCircleFilled
  - 技能名称加粗，描述紧跟其后
  - 技能项垂直排列
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgment` TR-4.1: 技能项前有黄色勾号图标
  - `human-judgment` TR-4.2: 技能名称加粗，布局整齐

## [x] Task 5: 更新样式文件（index.less）
- **Priority**: high
- **Depends On**: Tasks 2-4
- **Description**: 
  - 更新头部样式：深蓝色背景、白色文字、方形头像
  - 更新模块标题样式：下划线分隔
  - 更新技能项样式：黄色勾号图标
  - 更新项目角色标签样式：模板内固定配色
  - 更新打印样式和响应式样式
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Test Requirements**:
  - `human-judgment` TR-5.1: 打印预览时背景色和边框正常显示
  - `human-judgment` TR-5.2: 移动端宽度下布局正确调整

## [x] Task 6: 更新预览图（template6-preview.svg）
- **Priority**: medium
- **Depends On**: Tasks 2-5
- **Description**: 
  - 更新预览图以反映新设计（深蓝顶栏、白色文字、下划线分隔）
- **Acceptance Criteria Addressed**: AC-2, AC-3
- **Test Requirements**:
  - `human-judgment` TR-6.1: 预览图与实际模板样式一致

## [x] Task 7: 验证整体效果
- **Priority**: high
- **Depends On**: Tasks 1-6
- **Description**: 
  - 启动项目，切换到 Template6
  - 检查所有模块渲染正确
  - 切换全局主题色验证配色独立性
  - 测试打印和响应式效果
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Test Requirements**:
  - `human-judgment` TR-7.1: 所有模块正常渲染（教育、工作、项目、技能、获奖）
  - `human-judgment` TR-7.2: 切换主题色后模板配色不变
  - `human-judgment` TR-7.3: 打印预览布局正确
  - `human-judgment` TR-7.4: 移动端响应式适配正常
