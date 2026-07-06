import React from 'react';
import { Tag } from 'antd';
import {
  MobileFilled,
  MailFilled,
  GithubFilled,
  ScheduleFilled,
  HeartFilled,
  TrophyFilled,
  CheckCircleFilled,
} from '@ant-design/icons';
import _ from 'lodash-es';
import { FormattedMessage, useIntl } from 'react-intl';
import { getDefaultTitleNameMap } from '@/data/constant';
import { Avatar } from '../../Avatar';
import type { ResumeConfig, ThemeConfig } from '../../types';
import './index.less';

type Props = {
  value: ResumeConfig;
  theme: ThemeConfig;
};

const formatProfileLinkText = (url?: string, label?: string) => {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split('/').filter(Boolean);
    if (segments[0]) return `${label} / ${segments[0]}`;
    return label || url;
  } catch {
    return url;
  }
};

const toAlphaColor = (color?: string, alpha = 1) => {
  if (!color) return undefined;
  const hexMatch = color.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    const normalized =
      hex.length === 3
        ? hex
            .split('')
            .map(char => char + char)
            .join('')
        : hex;
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  const rgbaMatch = color.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+)?\s*\)/i
  );
  if (!rgbaMatch) return color;
  const [, r, g, b] = rgbaMatch;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getProjectLevel = (index: number) => {
  if (index < 2) return 'primary';
  if (index === 2) return 'secondary';
  return 'supplemental';
};

const SidebarSection: React.FC<{
  title: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <section className="sidebar-section">
    <div className="sidebar-section__title">{title}</div>
    <div className="sidebar-section__body">{children}</div>
  </section>
);

const MainSection: React.FC<{
  title: React.ReactNode;
  accentColor: string;
  children: React.ReactNode;
}> = ({ title, accentColor, children }) => (
  <section className="main-section">
    <div className="main-section__header">
      <span
        className="main-section__marker"
        style={{ background: accentColor }}
      />
      <h2>{title}</h2>
    </div>
    <div className="main-section__body">{children}</div>
  </section>
);

export const Template4: React.FC<Props> = props => {
  const intl = useIntl();
  const { value, theme } = props;

  const profile = _.get(value, 'profile');
  const titleNameMap = _.get(
    value,
    'titleNameMap',
    getDefaultTitleNameMap({ intl })
  );
  const educationList = _.get(value, 'educationList');
  const workExpList = _.get(value, 'workExpList');
  const projectList = _.get(value, 'projectList');
  const skillList = _.get(value, 'skillList');
  const awardList = _.get(value, 'awardList');
  const aboutme = _.split(_.get(value, ['aboutme', 'aboutme_desc']), '\n');
  const githubText = formatProfileLinkText(profile?.github, 'GitHub');

  return (
    <div
      className="template4-resume resume-content"
      style={{
        paddingTop: theme.margin?.top,
        paddingRight: theme.margin?.right,
        paddingBottom: theme.margin?.bottom,
        paddingLeft: theme.margin?.left,
      }}
    >
      <aside
        className="template4-sidebar"
        style={{ background: `linear-gradient(180deg, ${theme.color} 0%, #1f2d3d 100%)` }}
      >
        {!value?.avatar?.hidden && (
          <Avatar
            avatarSrc={value?.avatar?.src}
            className="template4-avatar"
            shape={value?.avatar?.shape}
            size={value?.avatar?.size}
          />
        )}
        <div className="template4-profile">
          {profile?.name && <div className="template4-name">{profile.name}</div>}
          {profile?.positionTitle && (
            <div className="template4-position">{profile.positionTitle}</div>
          )}
        </div>

        <SidebarSection title={<FormattedMessage id="基础信息" />}>
          <div className="template4-contact-list">
            {profile?.mobile && (
              <div className="template4-contact-item">
                <MobileFilled />
                <span>{profile.mobile}</span>
              </div>
            )}
            {profile?.email && (
              <div className="template4-contact-item">
                <MailFilled />
                <span>{profile.email}</span>
              </div>
            )}
            {profile?.github && (
              <div
                className="template4-contact-item"
                onClick={() => window.open(profile.github)}
              >
                <GithubFilled />
                <span>{githubText}</span>
              </div>
            )}
            {profile?.workExpYear && (
              <div className="template4-contact-item">
                <ScheduleFilled />
                <span>
                  <FormattedMessage id="工作经验" />: {profile.workExpYear}
                </span>
              </div>
            )}
            {profile?.positionTitle && (
              <div className="template4-contact-item">
                <HeartFilled />
                <span>
                  <FormattedMessage id="职位" />: {profile.positionTitle}
                </span>
              </div>
            )}
          </div>
        </SidebarSection>

        {!!_.trim(_.join(aboutme, '')) && (
          <SidebarSection title={titleNameMap?.aboutme || <FormattedMessage id="自我介绍" />}>
            {aboutme.map((item, idx) => (
              <div className="template4-summary" key={idx.toString()}>
                {item}
              </div>
            ))}
          </SidebarSection>
        )}

        {skillList?.length ? (
          <SidebarSection title={titleNameMap?.skillList}>
            {skillList.map((skill, idx) =>
              skill ? (
                <div className="template4-skill-item" key={idx.toString()}>
                  <div className="template4-skill-name">
                    <CheckCircleFilled style={{ color: theme.skillIconColor }} />
                    <span>{skill.skill_name}</span>
                  </div>
                  <div className="template4-skill-desc">{skill.skill_desc}</div>
                </div>
              ) : null
            )}
          </SidebarSection>
        ) : null}

        {awardList?.length ? (
          <SidebarSection title={titleNameMap?.awardList}>
            {awardList.map((award, idx) =>
              award ? (
                <div className="template4-award-item" key={idx.toString()}>
                  <TrophyFilled style={{ color: theme.awardIconColor }} />
                  <div>
                    <div className="template4-award-name">{award.award_info}</div>
                    {award.award_rank && (
                      <div className="template4-award-rank">{award.award_rank}</div>
                    )}
                  </div>
                </div>
              ) : null
            )}
          </SidebarSection>
        ) : null}
      </aside>

      <main className="template4-main">
        {workExpList?.length ? (
          <MainSection title={titleNameMap?.workExpList} accentColor={theme.color}>
            {workExpList.map((work, idx) => {
              const [start = '', end = ''] =
                typeof work.work_time === 'string'
                  ? `${work.work_time || ''}`.split(',')
                  : work.work_time || [];
              return (
                <div className="template4-work-item" key={idx.toString()}>
                  <div className="template4-item-header">
                    <div className="template4-item-title">
                      <span className="template4-item-name">{work.company_name}</span>
                      {work.department_name && (
                        <span className="template4-item-subtitle">
                          {work.department_name}
                        </span>
                      )}
                    </div>
                    <span className="template4-item-time">
                      {start}
                      {end ? ` ~ ${end}` : ''}
                    </span>
                  </div>
                  <div className="template4-item-content">{work.work_desc}</div>
                </div>
              );
            })}
          </MainSection>
        ) : null}

        {projectList?.length ? (
          <MainSection title={titleNameMap?.projectList} accentColor={theme.color}>
            {projectList.map((project, idx) =>
              project ? (
                <div
                  className={`template4-project-item template4-project-item-${getProjectLevel(
                    idx
                  )}`}
                  key={idx.toString()}
                >
                  <div className="template4-item-header">
                    <div className="template4-item-title">
                      <span className="template4-item-name">{project.project_name}</span>
                      {project.project_time && (
                        <span className="template4-item-subtitle">
                          {project.project_time}
                        </span>
                      )}
                    </div>
                    {project.project_role &&
                      (idx < 3 ? (
                        <Tag
                          style={{
                            color: toAlphaColor(theme.tagColor, 0.96),
                            backgroundColor: toAlphaColor(theme.tagColor, 0.12),
                            borderColor: toAlphaColor(theme.tagColor, 0.22),
                          }}
                          className="template4-role-tag"
                        >
                          {project.project_role}
                        </Tag>
                      ) : (
                        <span className="template4-role-text">
                          {project.project_role}
                        </span>
                      ))}
                  </div>
                  {idx < 2 ? (
                    <>
                      {project.project_desc && (
                        <div className="template4-detail-row">
                          <b>
                            <FormattedMessage id="项目描述" />：
                          </b>
                          <span>{project.project_desc}</span>
                        </div>
                      )}
                      {project.project_tech_stack && (
                        <div className="template4-detail-row template4-detail-row-tech">
                          <b>
                            <FormattedMessage id="技术栈" />：
                          </b>
                          <span>{project.project_tech_stack}</span>
                        </div>
                      )}
                      {project.project_content && (
                        <div className="template4-detail-row">
                          <b>
                            <FormattedMessage id="主要工作" />：
                          </b>
                          <span>{project.project_content}</span>
                        </div>
                      )}
                    </>
                  ) : idx === 2 ? (
                    <>
                      {project.project_tech_stack && (
                        <div className="template4-detail-row template4-detail-row-tech">
                          <b>
                            <FormattedMessage id="技术栈" />：
                          </b>
                          <span>{project.project_tech_stack}</span>
                        </div>
                      )}
                      {project.project_content && (
                        <div className="template4-detail-row">
                          <b>
                            <FormattedMessage id="主要工作" />：
                          </b>
                          <span>{project.project_content}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="template4-detail-row template4-detail-row-lite">
                      <span>{project.project_content || project.project_desc}</span>
                    </div>
                  )}
                </div>
              ) : null
            )}
          </MainSection>
        ) : null}

        {educationList?.length ? (
          <MainSection title={titleNameMap?.educationList} accentColor={theme.color}>
            {educationList.map((education, idx) => {
              const [start = '', end = ''] = education.edu_time || [];
              return (
                <div className="template4-education-item" key={idx.toString()}>
                  <div className="template4-item-header">
                    <div className="template4-item-title">
                      <span className="template4-item-name">{education.school}</span>
                      <span className="template4-item-subtitle">
                        {education.major}
                        {education.academic_degree
                          ? ` (${education.academic_degree})`
                          : ''}
                      </span>
                    </div>
                    <span className="template4-item-time">
                      {start}
                      {end ? ` ~ ${end}` : ''}
                    </span>
                  </div>
                </div>
              );
            })}
          </MainSection>
        ) : null}
      </main>
    </div>
  );
};
