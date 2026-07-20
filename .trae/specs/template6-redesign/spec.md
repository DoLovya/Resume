# Template6 重设计 - 产品需求文档

## Overview
- **Summary**: 根据最新参考图片，重设计 Template6 简历模板，使其视觉效果更贴近用户提供的参考样式，并确保所有配色在模板内独立定义，不依赖全局主题配置。
- **Purpose**: 解决当前 Template6 与参考图片差异较大的问题，以及全局主题配置影响模板样式的问题。
- **Target Users**: 使用该简历生成器创建专业简历的用户。

## Goals
- [x] Template6 视觉效果与参考图片高度一致
- [x] 所有配色在模板内部定义，不依赖全局 theme 配置
- [x] 支持两种风格变体（深蓝顶栏版和白底版）

## Non-Goals (Out of Scope)
- [ ] 不修改其他模板的实现方式
- [ ] 不改变现有数据结构（ResumeConfig/ThemeConfig）
- [ ] 不增加新的数据字段

## Background & Context
当前 Template6 存在以下问题：
1. 配色依赖全局 `theme.color`、`theme.tagColor`、`theme.skillIconColor` 等配置，导致切换主题时模板样式变化
2. 视觉布局与参考图片差异较大，包括头部样式、模块分隔线、图标样式等

参考图片分析：
- **深蓝顶栏版**：深蓝色背景（#1e3a5f 左右），白色文字，顶部联系方式带图标，右侧方形头像；下方各模块标题带细分隔线，个人技能使用黄色勾号（✓）
- **白底版**：纯白背景，姓名大字号粗体，联系方式带图标竖排，右侧头像；各模块标题带粗黑下划线，内容简洁，bullet 列表展示

## Functional Requirements
- **FR-1**: Template6 使用固定配色，不引用全局 theme 配置（除 margin 外）
- **FR-2**: 头部区域：左侧姓名+联系方式，右侧方形头像
- **FR-3**: 各模块标题带下划线分隔（深蓝顶栏版用细灰线，白底版用粗黑线）
- **FR-4**: 个人技能使用黄色勾号图标（深蓝顶栏版）或圆点（白底版）
- **FR-5**: 工作经历/项目经历内容使用 bullet 列表展示
- **FR-6**: 项目角色标签使用模板内定义的配色

## Non-Functional Requirements
- **NFR-1**: 打印样式正确，背景色和边框正常显示
- **NFR-2**: 响应式适配移动端（宽度 < 794px）
- **NFR-3**: 不影响其他模板的正常使用

## Constraints
- **Technical**: 保持与现有模板相同的 Props 接口，仅修改内部实现
- **Dependencies**: 使用项目现有依赖（React、antd、@ant-design/icons、lodash-es）

## Assumptions
- 参考图片为最终目标样式，所有配色以图片为准
- 模板仅支持单栏布局
- 用户期望深蓝顶栏版作为主要样式

## Acceptance Criteria

### AC-1: 配色独立
- **Given**: 用户切换全局主题色
- **When**: 查看 Template6 模板
- **Then**: 模板配色保持不变，不受全局主题影响
- **Verification**: `human-judgment`

### AC-2: 头部布局
- **Given**: Template6 已加载
- **When**: 查看头部区域
- **Then**: 左侧显示姓名（大字号粗体）和联系方式（带图标），右侧显示方形头像
- **Verification**: `human-judgment`

### AC-3: 模块分隔线
- **Given**: Template6 已加载
- **When**: 查看各模块标题
- **Then**: 标题下方有下划线分隔线
- **Verification**: `human-judgment`

### AC-4: 技能图标
- **Given**: Template6 已加载且有技能数据
- **When**: 查看个人技能区域
- **Then**: 每项技能前有黄色勾号图标（深蓝顶栏版）
- **Verification**: `human-judgment`

### AC-5: 打印样式
- **Given**: Template6 已加载
- **When**: 执行浏览器打印预览
- **Then**: 布局正确，背景色和边框正常显示
- **Verification**: `human-judgment`

### AC-6: 响应式适配
- **Given**: Template6 已加载
- **When**: 浏览器宽度调整至 < 794px
- **Then**: 布局自动调整为垂直排列，头像居中
- **Verification**: `human-judgment`

## Open Questions
- [ ] 用户期望深蓝顶栏版还是白底版作为默认样式？（根据图片判断深蓝顶栏版更正式）
