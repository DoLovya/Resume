import type { ResumeConfig } from '@/components/types';

export function getDefaultTitleNameMap({ intl }): ResumeConfig['titleNameMap'] {
  return {
    /** 默认: 教育背景 */
    educationList: intl.formatMessage({ id: '教育背景' }),
    /** 默认: 工作经历 */
    workExpList: intl.formatMessage({ id: '工作经历' }),
    /** 默认: 项目经历 */
    projectList: intl.formatMessage({ id: '项目经历' }),
    /** 默认: 个人技能 */
    skillList: intl.formatMessage({ id: '个人技能' }),
    /** 默认: 竞赛奖项 */
    awardList: intl.formatMessage({ id: '竞赛奖项' }),
    /** 默认: 自我介绍 */
    aboutme: intl.formatMessage({ id: '自我介绍' }),
  };
}
