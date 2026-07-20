import React from 'react';
import { Tag } from 'antd';
import {
  MobileFilled,
  MailFilled,
  GithubFilled,
  ScheduleFilled,
  HeartFilled,
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

const getProjectLevel = (index: number) => {
  if (index < 2) return 'primary';
  if (index === 2) return 'secondary';
  return 'supplemental';
};

const Section: React.FC<{
  title: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <section className="template2-section">
    <div className="template2-section-title">{title}</div>
    <div className="template2-section-body">{children}</div>
  </section>
);

const BulletList: React.FC<{ text?: string }> = ({ text }) => {
  if (!text) return null;
  const lines = text.split('\n').filter(line => _.trim(line));
  if (lines.length === 0) return null;
  return (
    <ul className="template2-list">
      {lines.map((line, idx) => (
        <li key={idx.toString()}>{line}</li>
      ))}
    </ul>
  );
};

export const Template2: React.FC<Props> = props => {
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
  const githubText = formatProfileLinkText(profile?.github, 'GitHub');

  return (
    <div
      className="template2-resume resume-content"
      style={{
        paddingTop: theme.margin?.top,
        paddingRight: theme.margin?.right,
        paddingBottom: theme.margin?.bottom,
        paddingLeft: theme.margin?.left,
      }}
    >
      <header className="template2-header">
        <div className="template2-header-info">
          {profile?.name && (
            <div className="template2-name">{profile.name}</div>
          )}
          <div className="template2-contact">
            {profile?.mobile && (
              <span className="template2-contact-item">
                <MobileFilled style={{ color: 'rgba(0,0,0,0.65)' }} />
                <span className="template2-contact-label">电话：</span>
                {profile.mobile}
              </span>
            )}
            {profile?.email && (
              <span className="template2-contact-item">
                <MailFilled style={{ color: 'rgba(0,0,0,0.65)' }} />
                <span className="template2-contact-label">邮箱：</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="template2-contact-link"
                >
                  {profile.email}
                </a>
              </span>
            )}
            {profile?.github && (
              <span className="template2-contact-item">
                <GithubFilled style={{ color: 'rgba(0,0,0,0.65)' }} />
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="template2-contact-link"
                >
                  {githubText}
                </a>
              </span>
            )}
            {profile?.workExpYear && (
              <span className="template2-contact-item">
                <ScheduleFilled style={{ color: 'rgba(0,0,0,0.65)' }} />
                <span className="template2-contact-label">工作经验：</span>
                {profile.workExpYear}
              </span>
            )}
            {profile?.positionTitle && (
              <span className="template2-contact-item">
                <HeartFilled style={{ color: 'rgba(0,0,0,0.65)' }} />
                <span className="template2-contact-label">职位：</span>
                {profile.positionTitle}
              </span>
            )}
          </div>
        </div>
        {!value?.avatar?.hidden && (
          <Avatar
            avatarSrc={value?.avatar?.src}
            className="template2-avatar"
            shape="square"
            size={value?.avatar?.size}
          />
        )}
      </header>

      <main className="template2-main">
        {educationList?.length ? (
          <Section title={titleNameMap?.educationList}>
            {educationList.map((education, idx) => {
              const [start, end] = education.edu_time;
              return (
                <div key={idx.toString()} className="template2-education-item">
                  <div className="template2-item-header">
                    <div>
                      <b>{education.school}</b>
                      {education.major && (
                        <span style={{ marginLeft: '8px' }}>{education.major}</span>
                      )}
                      {education.academic_degree && (
                        <span className="template2-sub-info" style={{ marginLeft: '4px' }}>
                          {education.academic_degree}
                        </span>
                      )}
                    </div>
                    <span className="template2-item-time">
                      {start}
                      {end ? ` ~ ${end}` : <FormattedMessage id=" 至今" />}
                    </span>
                  </div>
                </div>
              );
            })}
          </Section>
        ) : null}

        {workExpList?.length ? (
          <Section title={titleNameMap?.workExpList}>
            {workExpList.map((work, idx) => {
              const [start = null, end = null] =
                typeof work.work_time === 'string'
                  ? `${work.work_time || ''}`.split(',')
                  : work.work_time;
              return work ? (
                <div
                  className="template2-experience-item"
                  key={idx.toString()}
                >
                  <div className="template2-item-header">
                    <div>
                      <b>{work.company_name}</b>
                      {work.department_name && (
                        <span className="template2-sub-info" style={{ marginLeft: '8px' }}>
                          {work.department_name}
                        </span>
                      )}
                    </div>
                    <span className="template2-item-time">
                      {start}
                      {end ? ` ~ ${end}` : <FormattedMessage id=" 至今" />}
                    </span>
                  </div>
                  <BulletList text={work.work_desc} />
                </div>
              ) : null;
            })}
          </Section>
        ) : null}

        {projectList?.length ? (
          <Section title={titleNameMap?.projectList}>
            {projectList.map((project, idx) =>
              project ? (
                <div
                  className={`template2-project-item template2-project-item-${getProjectLevel(
                    idx
                  )}`}
                  key={idx.toString()}
                >
                  <div className="template2-item-header">
                    <div className="template2-project-title">
                      <b>{project.project_name}</b>
                      {project.project_role &&
                        (idx < 3 ? (
                          <Tag
                            className="template2-role-tag"
                          >
                            {project.project_role}
                          </Tag>
                        ) : (
                          <span className="template2-role-text">
                            {project.project_role}
                          </span>
                        ))}
                    </div>
                    {project.project_time && (
                      <span className="template2-item-time">
                        {project.project_time}
                      </span>
                    )}
                  </div>
                  {idx < 2 ? (
                    <>
                      {project.project_desc && (
                        <div className="template2-project-desc">
                          {project.project_desc}
                        </div>
                      )}
                      <BulletList text={project.project_content} />
                    </>
                  ) : idx === 2 ? (
                    <>
                      {project.project_desc && (
                        <div className="template2-project-desc template2-project-desc-compact">
                          {project.project_desc}
                        </div>
                      )}
                      <BulletList text={project.project_content} />
                    </>
                  ) : (
                    <BulletList text={project.project_content || project.project_desc} />
                  )}
                </div>
              ) : null
            )}
          </Section>
        ) : null}

        {skillList?.length ? (
          <Section title={titleNameMap?.skillList}>
            {skillList.map((skill, idx) =>
              skill ? (
                <div className="template2-skill-item" key={idx.toString()}>
                  <span className="template2-skill-check">✓</span>
                  <span>
                    {skill.skill_name && (
                      <b style={{ marginRight: '4px' }}>{skill.skill_name}:</b>
                    )}
                    {skill.skill_desc}
                  </span>
                </div>
              ) : null
            )}
          </Section>
        ) : null}

        {awardList?.length ? (
          <Section title={titleNameMap?.awardList}>
            {awardList.map((award, idx) =>
              award ? (
                <div className="template2-award-item" key={idx.toString()}>
                  <span className="template2-award-dot" />
                  <span>
                    {award.award_info}
                    {award.award_rank && (
                      <span className="template2-sub-info" style={{ marginLeft: '8px' }}>
                        {award.award_rank}
                      </span>
                    )}
                  </span>
                </div>
              ) : null
            )}
          </Section>
        ) : null}
      </main>
    </div>
  );
};
