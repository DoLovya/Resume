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
  <section className="template1-block template1-block-sidebar">
    <div className="template1-block-title">{title}</div>
    <div className="template1-block-body">{children}</div>
  </section>
);

const MainBlock: React.FC<{
  title: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <section className="template1-block template1-block-main">
    <div className="template1-block-title">{title}</div>
    <div className="template1-block-body">{children}</div>
  </section>
);

export const Template1: React.FC<Props> = props => {
  const { value, theme } = props;
  const profile = _.get(value, 'profile');
  const educationList = _.get(value, 'educationList');
  const workExpList = _.get(value, 'workExpList');
  const projectList = _.get(value, 'projectList');
  const skillList = _.get(value, 'skillList');
  const awardList = _.get(value, 'awardList');
  const aboutme = _.split(_.get(value, ['aboutme', 'aboutme_desc']), '\n');
  const githubText = formatProfileLinkText(profile?.github, 'GitHub');
  const csdnText = profile?.csdnName ? `CSDN：${profile.csdnName}` : formatProfileLinkText(profile?.csdn, 'CSDN');

  return (
    <div
      className="template1-resume resume-content"
      style={{
        paddingTop: theme.margin?.top,
        paddingRight: theme.margin?.right,
        paddingBottom: theme.margin?.bottom,
        paddingLeft: theme.margin?.left,
      }}
    >
      <header className="template1-hero">
        {!value?.avatar?.hidden && (
          <Avatar
            name={profile?.name}
            className="template1-avatar"
            shape={value?.avatar?.shape}
            size={value?.avatar?.size}
          />
        )}
        <div className="template1-hero-main">
          <div className="template1-hero-greeting">Hello, I&apos;m</div>
          <div className="template1-hero-name">{profile?.name}</div>
          <div className="template1-hero-contact">
            {profile?.age && <span className="template1-hero-contact-item">{profile.age}</span>}
            {profile?.mobile && (
              <span className="template1-hero-contact-item">电话：{profile.mobile}</span>
            )}
            {profile?.email && (
              <span className="template1-hero-contact-item">
                邮箱：
                <a
                  href={`mailto:${profile.email}`}
                  className="template1-hero-contact-link"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {profile.email}
                </a>
              </span>
            )}
            {profile?.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="template1-hero-contact-item template1-hero-contact-link"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {githubText}
              </a>
            )}
            {profile?.csdn && (
              <a
                href={profile.csdn}
                target="_blank"
                rel="noreferrer"
                className="template1-hero-contact-item template1-hero-contact-link"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {csdnText}
              </a>
            )}
          </div>
        </div>
        <div className="template1-hero-watermark">
          BIOGRAPHICAL
          <br />
          NOTES
        </div>
      </header>

      <div className="template1-body">
        <aside className="template1-sidebar">
          {!!_.trim(_.join(aboutme, '')) && (
            <SidebarBlock title="自我介绍">
              {aboutme.map((item, idx) => (
                <div className="template1-summary" key={idx.toString()}>
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
                  <div className="template1-education-item" key={idx.toString()}>
                    <div className="template1-education-school">{education.school}</div>
                    {education.academic_degree && (
                      <div className="template1-education-degree">
                        {education.academic_degree}
                      </div>
                    )}
                    {education.major && (
                      <div className="template1-education-major">{education.major}</div>
                    )}
                    <div className="template1-education-time">
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
                  <div className="template1-award-item" key={idx.toString()}>
                    <div>
                      <div className="template1-award-name">{award.award_info}</div>
                      {award.award_rank && (
                        <div className="template1-award-rank">{award.award_rank}</div>
                      )}
                    </div>
                  </div>
                ) : null
              )}
            </SidebarBlock>
          ) : null}
        </aside>

        <main className="template1-main">
          {skillList?.length ? (
            <MainBlock title="专业技能">
              {skillList.map((skill, idx) =>
                skill ? (
                  <div className="template1-skill-item" key={idx.toString()}>
                    <span className="template1-skill-name">{skill.skill_name}</span>
                    {skill.skill_desc ? (
                      <span className="template1-skill-desc">{skill.skill_desc}</span>
                    ) : null}
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
                  <div className="template1-experience-item" key={idx.toString()}>
                    <div className="template1-item-timeline" />
                    <div className="template1-item-content">
                      <div className="template1-item-header">
                        <div className="template1-item-title">
                          <span className="template1-item-name">{work.company_name}</span>
                          {work.department_name && (
                            <span className="template1-item-role">
                              {work.department_name}
                            </span>
                          )}
                        </div>
                        <span className="template1-item-time">
                          {start}
                          {end ? `-${end}` : ''}
                        </span>
                      </div>
                      <div className="template1-item-text">{work.work_desc}</div>
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
                    className={`template1-project-item template1-project-item-${getProjectLevel(
                      idx
                    )}`}
                    key={idx.toString()}
                  >
                    <div className="template1-item-timeline" />
                    <div className="template1-item-content">
                      <div className="template1-item-header">
                        <div className="template1-item-title">
                          <span className="template1-item-name">
                            {project.project_name}
                          </span>
                          {project.project_role &&
                            (idx < 3 ? (
                              <Tag
                                className="template1-role-tag"
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
                              <span className="template1-role-text">
                                {project.project_role}
                              </span>
                            ))}
                        </div>
                        {project.project_time && (
                          <span className="template1-item-time">
                            {project.project_time}
                          </span>
                        )}
                      </div>
                      {idx < 2 ? (
                        <>
                          {project.project_desc && (
                            <div className="template1-detail-row">
                              <b>项目描述：</b>
                              <span>{project.project_desc}</span>
                            </div>
                          )}
                          {project.project_tech_stack && (
                            <div className="template1-detail-row template1-detail-tech">
                              <b>技术栈：</b>
                              <span>{project.project_tech_stack}</span>
                            </div>
                          )}
                          {project.project_content && (
                            <div className="template1-detail-row">
                              <b>主要工作：</b>
                              <span>{project.project_content}</span>
                            </div>
                          )}
                        </>
                      ) : idx === 2 ? (
                        <>
                          {project.project_tech_stack && (
                            <div className="template1-detail-row template1-detail-tech">
                              <b>技术栈：</b>
                              <span>{project.project_tech_stack}</span>
                            </div>
                          )}
                          {project.project_content && (
                            <div className="template1-detail-row">
                              <b>主要工作：</b>
                              <span>{project.project_content}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="template1-detail-row template1-detail-lite">
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
