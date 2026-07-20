import type { ResumeConfig } from '@/components/types';

/** 初始化常量 */
export const RESUME_INFO: ResumeConfig = {
  avatar: {
    src: undefined,
    hidden: false,
  },
  profile: {
    name: '姓名',
    email: '',
    mobile: '',
    github: '',
    zhihu: '',
    workExpYear: '',
    workPlace: '',
    positionTitle: '',
  },
  educationList: [],
  awardList: [],
  workExpList: [],
  skillList: [],
  projectList: [],
  aboutme: {
    aboutme_desc: '',
  },
  locales: {},
};
