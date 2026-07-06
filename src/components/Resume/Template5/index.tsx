import React from 'react';
import { Tag } from 'antd';
import {
} from '@ant-design/icons';
import _ from 'lodash-es';
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
    if (segments[0]) return `${label}: ${segments[0]}`;
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

const SidebarBlock: React.FC<{
  title: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <section className="template5-block template5-block-sidebar">
    <div className="template5-block-title">{title}</div>
    <div className="template5-block-body">{children}</div>
  </section>
);

const MainBlock: React.FC<{
  title: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <section className="template5-block template5-block-main">
    <div className="template5-block-title">{title}</div>
    <div className="template5-block-body">{children}</div>
  </section>
);

export const Template5: React.FC<Props> = props => {
  const { value, theme } = props;
  const profile = _.get(value, 'profile');
  const educationList = _.get(value, 'educationList');
  const workExpList = _.get(value, 'workExpList');
  const projectList = _.get(value, 'projectList');
  const skillList = _.get(value, 'skillList');
  const awardList = _.get(value, 'awardList');
  const aboutme = _.split(_.get(value, ['aboutme', 'aboutme_desc']), '\n');
  const githubText = formatProfileLinkText(profile?.github, 'GitHub');

  return (
    <div
      className="template5-resume resume-content"
      style={{
        paddingTop: theme.margin?.top,
        paddingRight: theme.margin?.right,
        paddingBottom: theme.margin?.bottom,
        paddingLeft: theme.margin?.left,
      }}
    >
      <header className="template5-hero">
        {!value?.avatar?.hidden && (
          <Avatar
            avatarSrc={value?.avatar?.src}
            className="template5-avatar"
            shape={value?.avatar?.shape}
            size={value?.avatar?.size}
          />
        )}
        <div className="template5-hero-main">
          <div className="template5-hero-greeting">Hello,I'm</div>
          <div className="template5-hero-name">{profile?.name}</div>
          <div className="template5-hero-contact">
            {profile?.age && <span>{profile.age}</span>}
            {profile?.mobile && <span>电话：{profile.mobile}</span>}
            {profile?.email && <span>邮箱：{profile.email}</span>}
            {profile?.github && <span>{githubText}</span>}
          </div>
        </div>
        <div className="template5-hero-watermark">
          BIOGRAPHICAL
          <br />
          NOTES
        </div>
      </header>

      <div className="template5-body">
        <aside className="template5-sidebar">
          <SidebarBlock title="求职信息">
            <div className="template5-intent-list">
              {profile?.workExpYear && (
                <div className="template5-intent-item">
                  <span className="template5-intent-label">工作时长</span>
                  <span className="template5-intent-value">{profile.workExpYear}</span>
                </div>
              )}
              {profile?.positionTitle && (
                <div className="template5-intent-item">
                  <span className="template5-intent-label">求职意向</span>
                  <span className="template5-intent-value">
                    {profile.positionTitle}
                  </span>
                </div>
              )}
              {profile?.workPlace && (
                <div className="template5-intent-item">
                  <span className="template5-intent-label">期望城市</span>
                  <span className="template5-intent-value">{profile.workPlace}</span>
                </div>
              )}
              {profile?.mobile && (
                <div className="template5-intent-item">
                  <span className="template5-intent-label">联系方式</span>
                  <span className="template5-intent-value">{profile.mobile}</span>
                </div>
              )}
            </div>
          </SidebarBlock>

          {!!_.trim(_.join(aboutme, '')) && (
            <SidebarBlock title="自我介绍">
              {aboutme.map((item, idx) => (
                <div className="template5-summary" key={idx.toString()}>
                  {item}
                </div>
              ))}
            </SidebarBlock>
          )}

          {educationList?.length ? (
            <SidebarBlock title="教育经历">
              {educationList.map((education, idx) => {
                const [start = '', end = ''] = education.edu_time || [];
                return (
                  <div className="template5-education-item" key={idx.toString()}>
                    <div className="template5-education-school">{education.school}</div>
                    {education.academic_degree && (
                      <div className="template5-education-degree">
                        {education.academic_degree}
                      </div>
                    )}
                    {education.major && (
                      <div className="template5-education-major">{education.major}</div>
                    )}
                    <div className="template5-education-time">
                      {start}
                      {end ? ` - ${end}` : ''}
                    </div>
                  </div>
                );
              })}
            </SidebarBlock>
          ) : null}

          {awardList?.length ? (
            <SidebarBlock title="证书荣誉">
              {awardList.map((award, idx) =>
                award ? (
                  <div className="template5-award-item" key={idx.toString()}>
                    <div>
                      <div className="template5-award-name">{award.award_info}</div>
                      {award.award_rank && (
                        <div className="template5-award-rank">{award.award_rank}</div>
                      )}
                    </div>
                  </div>
                ) : null
              )}
            </SidebarBlock>
          ) : null}
        </aside>

        <main className="template5-main">
          {skillList?.length ? (
            <MainBlock title="专业技能">
              {skillList.map((skill, idx) =>
                skill ? (
                  <div className="template5-skill-item" key={idx.toString()}>
                    <span>
                      <b>{skill.skill_name}</b>
                      {skill.skill_desc ? `：${skill.skill_desc}` : ''}
                    </span>
                  </div>
                ) : null
              )}
            </MainBlock>
          ) : null}

          {workExpList?.length ? (
            <MainBlock title="工作经历">
              {workExpList.map((work, idx) => {
                const [start = '', end = ''] =
                  typeof work.work_time === 'string'
                    ? `${work.work_time || ''}`.split(',')
                    : work.work_time || [];
                return (
                  <div className="template5-experience-item" key={idx.toString()}>
                    <div className="template5-item-timeline" />
                    <div className="template5-item-content">
                      <div className="template5-item-header">
                        <div className="template5-item-title">
                          <span className="template5-item-name">{work.company_name}</span>
                          {work.department_name && (
                            <span className="template5-item-role">
                              {work.department_name}
                            </span>
                          )}
                        </div>
                        <span className="template5-item-time">
                          {start}
                          {end ? `-${end}` : ''}
                        </span>
                      </div>
                      <div className="template5-item-text">{work.work_desc}</div>
                    </div>
                  </div>
                );
              })}
            </MainBlock>
          ) : null}

          {projectList?.length ? (
            <MainBlock title="项目经历">
              {projectList.map((project, idx) =>
                project ? (
                  <div
                    className={`template5-project-item template5-project-item-${getProjectLevel(
                      idx
                    )}`}
                    key={idx.toString()}
                  >
                    <div className="template5-item-timeline" />
                    <div className="template5-item-content">
                      <div className="template5-item-header">
                        <div className="template5-item-title">
                          <span className="template5-item-name">
                            {project.project_name}
                          </span>
                          {project.project_role &&
                            (idx < 3 ? (
                              <Tag
                                className="template5-role-tag"
                                style={{
                                  color: toAlphaColor(theme.tagColor, 0.95),
                                  backgroundColor: toAlphaColor(
                                    theme.tagColor,
                                    0.12
                                  ),
                                  borderColor: toAlphaColor(theme.tagColor, 0.22),
                                }}
                              >
                                {project.project_role}
                              </Tag>
                            ) : (
                              <span className="template5-role-text">
                                {project.project_role}
                              </span>
                            ))}
                        </div>
                        {project.project_time && (
                          <span className="template5-item-time">
                            {project.project_time}
                          </span>
                        )}
                      </div>
                      {idx < 2 ? (
                        <>
                          {project.project_desc && (
                            <div className="template5-detail-row">
                              <b>项目描述：</b>
                              <span>{project.project_desc}</span>
                            </div>
                          )}
                          {project.project_tech_stack && (
                            <div className="template5-detail-row template5-detail-tech">
                              <b>技术栈：</b>
                              <span>{project.project_tech_stack}</span>
                            </div>
                          )}
                          {project.project_content && (
                            <div className="template5-detail-row">
                              <b>主要工作：</b>
                              <span>{project.project_content}</span>
                            </div>
                          )}
                        </>
                      ) : idx === 2 ? (
                        <>
                          {project.project_tech_stack && (
                            <div className="template5-detail-row template5-detail-tech">
                              <b>技术栈：</b>
                              <span>{project.project_tech_stack}</span>
                            </div>
                          )}
                          {project.project_content && (
                            <div className="template5-detail-row">
                              <b>主要工作：</b>
                              <span>{project.project_content}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="template5-detail-row template5-detail-lite">
                          <span>{project.project_content || project.project_desc}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null
              )}
            </MainBlock>
          ) : null}
        </main>
      </div>
    </div>
  );
};
