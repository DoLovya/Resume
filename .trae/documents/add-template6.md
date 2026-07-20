# 新增简历模板 Template6 计划

## 摘要

根据用户提供的图片简历模板，在项目现有模板体系（Template1/Template2/Template5）基础上新增 **Template6（简洁专业模板）**。该模板采用单栏布局，顶部为个人信息+头像横排，各模块以标题+下划线分隔，整体风格简洁、专业、易读。

## 当前状态分析

项目为 React + Gatsby 简历生成器，模板系统核心机制：
1. **模板组件**：`src/components/Resume/Template{ N }/` 目录，含 `index.tsx` + `index.less`
2. **模板注册**：`src/components/Resume/index.tsx` 通过 `switch(template)` 映射组件
3. **模板选择**：`src/components/Drawer/Templates/index.tsx` 中 `TEMPLATES` 数组配置预览图与描述
4. **数据结构**：所有模板共享同一套 `ResumeConfig` / `ThemeConfig` 类型，无需改动

## 图片模板布局分析

| 区域 | 特征 |
|------|------|
| **Header** | 左侧：姓名（大字号粗体）；下方：电话/邮箱/年龄/所在地（带图标横排）；右侧：头像 |
| **教育经历** | 模块标题粗体+下划线分隔；内容：学校（粗体）+ 专业 + 学历，时间右对齐 |
| **工作经历** | 模块标题粗体+下划线分隔；内容：公司（粗体）+ 部门，时间右对齐；下方 bullet 列表描述工作内容 |
| **项目经历** | 模块标题粗体+下划线分隔；内容：项目名（粗体）+ 角色，时间右对齐；项目描述段落 + bullet 列表 |
| **专业技能** | 模块标题粗体+下划线分隔；bullet 列表，按类别分组展示 |
| **获奖经历** | 模块标题粗体+下划线分隔；简单 bullet 列表 |

## 拟变更文件清单

### 1. 新建 `src/components/Resume/Template6/index.tsx`
- **What**：Template6  React 组件
- **How**：
  - Props 同现有模板：`{ value: ResumeConfig; theme: ThemeConfig }`
  - 复用现有工具函数：`formatProfileLinkText`、`toAlphaColor`、`getProjectLevel`
  - 布局结构：
    - `.template6-resume` 根容器（A4 宽度，白色背景，单栏）
    - `header.template6-header`：grid 两列（左侧信息区 + 右侧头像区）
    - `main.template6-main`：单栏，纵向排列各模块
  - 各模块统一使用 `Section` 包装组件：`<div className="template6-section">` + `<div className="template6-section-title">{title}</div>` + `<div className="template6-section-body">{children}</div>`
  - 模块渲染顺序：教育经历 → 工作经历 → 项目经历 → 专业技能 → 获奖经历
  - 工作经历/项目经历的工作内容使用 `white-space: pre-wrap` 保持换行，或按 `\n` 拆分为 bullet 列表（根据图片，是 bullet 列表形式）
  - 头像使用现有 `<Avatar>` 组件

### 2. 新建 `src/components/Resume/Template6/index.less`
- **What**：Template6 专属样式
- **How**：
  - 根容器 `.template6-resume`：`width: 794px; min-height: 1123px; background: #fff;`
  - Header：`.template6-header` 使用 `display: flex; justify-content: space-between; align-items: flex-start;`
  - 姓名：`.template6-name` `font-size: 28px; font-weight: 700;`
  - 联系信息：`.template6-contact` 使用 `display: flex; flex-wrap: wrap; gap: 8px 16px;`
  - 模块标题：`.template6-section-title` `font-size: 18px; font-weight: 700; border-bottom: 1px solid #e0e0e0; padding-bottom: 6px; margin-bottom: 12px;`
  - 条目头部（公司/项目名 + 时间）：`.template6-item-header` `display: flex; justify-content: space-between;`
  - 时间文字：统一使用 `color: rgba(0,0,0,0.45); font-size: 13px;`
  - bullet 列表：`.template6-list` 使用 `list-style: disc; padding-left: 18px;`，每项 `margin-bottom: 4px;`
  - 打印样式：`@media print` 下宽度 100%，去掉阴影，确保背景色/边框正确打印（`-webkit-print-color-adjust: exact`）
  - 响应式：`@media (max-width: 794px)` 宽度 100%，头像居中

### 3. 修改 `src/components/Resume/index.tsx`
- **What**：注册新模板
- **How**：
  - `import { Template6 } from './Template6';`
  - switch 增加 `case 'template6': return Template6;`

### 4. 修改 `src/components/Drawer/Templates/index.tsx`
- **What**：在模板选择器中展示 Template6
- **How**：
  - 在 `TEMPLATES` 数组末尾新增：
    ```ts
    {
      url: '/images/template6-preview.svg',
      id: 'template6',
      description: '简洁专业模板',
    }
    ```

### 5. 新建 `static/images/template6-preview.svg`
- **What**：模板缩略图预览
- **How**：绘制一个简洁的 SVG 示意图，展示单栏+顶部个人信息+下划线分隔模块的特征（参考现有 template5-preview.svg 风格）

## 假设与决策

1. **命名**：采用 `template6` 作为 ID，跳过 template3/template4（项目中不存在，保持与现有习惯一致）。
2. **bullet 列表渲染**：图片中工作经历和项目经历的内容是 bullet 点形式。若数据源 `work_desc` / `project_content` 是换行文本，按 `\n` 拆分后每项渲染为 `<li>` 样式；若为纯文本，直接渲染并保留 `white-space: pre-wrap`。
3. **颜色**：模块标题下划线使用固定浅色 `#e0e0e0`，不绑定 theme.color（保持图片中的简洁感）；图标和重点文字仍使用 `theme.color`。
4. **布局**：单栏全宽布局，不采用左右分栏，与图片保持一致。
5. **项目经历详细程度**：沿用现有 `getProjectLevel` 逻辑，前 2 个项目详细展示（描述+技术栈+主要工作），第 3 个精简，后续极简。

## 验证步骤

1. 本地启动项目，在模板选择器中确认出现「template6 简洁专业模板」
2. 切换至 Template6，检查各模块是否正常渲染（教育、工作、项目、技能、获奖）
3. 确认头像、联系方式、时间格式与图片一致
4. 浏览器打印预览（Ctrl+P）确认 A4 分页、样式正确
5. 移动端宽度 < 794px 下确认响应式适配正常
