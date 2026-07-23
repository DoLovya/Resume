import React from 'react';
import { Rate, Tag } from 'antd';
import {
  MobileFilled,
  MailFilled,
  GithubFilled,
  ZhihuCircleFilled,
  TrophyFilled,
  CheckCircleFilled,
  ScheduleFilled,
  EnvironmentFilled,
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

const wrapper = ({ id, title, color }) => WrappedComponent => {
  return (
    <section>
      <div className="section-header">
        {id && (
          <img
            src={`images/${id}.png`}
            alt=""
            width="22px"
            height="22px"
            style={{
              position: 'relative',
              top: '2px',
            }}
          />
        )}
        <h1 style={{ background: color }}>{title}</h1>
      </div>
      <div className="section-body">{WrappedComponent}</div>
    </section>
  );
};

/**
 * @description 简历内容区
 */
export const Template4: React.FC<Props> = props => {
  const intl = useIntl();
  const { value, theme } = props;

  /** 个人基础信息 */
  const profile = _.get(value, 'profile');
  
  const titleNameMap = _.get(
    value,
    'titleNameMap',
    getDefaultTitleNameMap({ intl })
  );

  /** 教育背景 */
  const educationList = _.get(value, 'educationList');

  /** 工作经历 */
  const workExpList = _.get(value, 'workExpList');

  /** 项目经验 */
  const projectList = _.get(value, 'projectList');

  /** 个人技能 */
  const skillList = _.get(value, 'skillList');

  /** 更多信息 */
  const awardList = _.get(value, 'awardList');

  /** 自我介绍 */
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
      <div className="basic-info">
        {/* 头像 */}
        {!value?.avatar?.hidden && (
          <Avatar
            name={profile?.name}
            className="avatar"
            shape={value?.avatar?.shape}
            size={value?.avatar?.size}
          />
        )}
        {/* 个人信息 */}
        <div className="profile">
          {profile?.name && <div className="name">{profile.name}</div>}
          <div className="profile-list">
            {profile?.mobile && (
              <div className="email">
                <MobileFilled style={{ color: theme.color, opacity: 0.85 }} />
                {profile.mobile}
              </div>
            )}
            {profile?.email && (
              <div className="email">
                <MailFilled style={{ color: theme.color, opacity: 0.85 }} />
                <a
                  href={`mailto:${profile.email}`}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {profile.email}
                </a>
              </div>
            )}
            {profile?.age && (
              <div className="age">
                 <CheckCircleFilled style={{ color: theme.color, opacity: 0.85 }} />
                {profile.age}
              </div>
            )}
            {profile?.github && (
              <div className="github">
                <GithubFilled style={{ color: theme.color, opacity: 0.85 }} />
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {githubText}
                </a>
              </div>
            )}
            {profile?.zhihu && (
              <div className="github">
                <ZhihuCircleFilled
                  style={{ color: theme.color, opacity: 0.85 }}
                />
                <a
                  href={profile.zhihu}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {profile.zhihu}
                </a>
              </div>
            )}
            {profile?.workExpYear && (
              <div className="work-exp-year">
                <ScheduleFilled style={{ color: theme.color, opacity: 0.85 }} />
                <span>
                  <FormattedMessage id="工作经验" />: {profile.workExpYear}
                </span>
              </div>
            )}
            {profile?.workPlace && (
              <div className="work-place">
                <EnvironmentFilled
                  style={{ color: theme.color, opacity: 0.85 }}
                />
                <span>
                  <FormattedMessage id="期望工作地" />: {profile.workPlace}
                </span>
              </div>
            )}
            {profile?.positionTitle && (
              <div className="expect-job">
                <HeartFilled style={{ color: theme.color, opacity: 0.85 }} />
                <span>
                  <FormattedMessage id="职位" />: {profile.positionTitle}
                </span>
              </div>
            )}
          </div>
        </div>
        {/* 自我介绍 */}
        {!!_.trim(_.join(aboutme, '')) && (
          <section className="section section-aboutme">
            <div className="section-title" style={{ color: theme.color }}>
              <FormattedMessage id="自我介绍" />
            </div>
            {aboutme.map((d, idx) => (
              <div key={`${idx}`}>{d}</div>
            ))}
          </section>
        )}
        {/* 教育背景 */}
        {educationList?.length ? (
          <section className="section section-education">
            <div className="section-title" style={{ color: theme.color }}>
              {/* <FormattedMessage id="教育背景" /> */}
              {titleNameMap?.educationList}
            </div>
            {educationList.map((education, idx) => {
              const [start, end] = education.edu_time;
              return (
                <div key={idx.toString()} className="education-item">
                  <div>
                    <b>{education.school}</b>
                    <span className="sub-info" style={{ float: 'right' }}>
                      {start}
                      {end ? ` ~ ${end}` : <FormattedMessage id=" 至今" />}
                    </span>
                  </div>
                  <div>
                    {education.major && <span>{education.major}</span>}
                    {education.academic_degree && (
                      <span className="sub-info" style={{ marginLeft: '4px' }}>
                        ({education.academic_degree})
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </section>
        ) : null}
        {/* 专业技能 */}
        {skillList?.length ? (
          <section className="section section-skill">
            <div className="section-title" style={{ color: theme.color }}>
              {/* <FormattedMessage id="专业技能" /> */}
              {titleNameMap?.skillList}
            </div>
            {skillList.map((skill, idx) => {
              return skill ? (
                <React.Fragment key={`${idx}`}>
                  {_.split(skill.skill_desc, '\n').map((d, i) =>
                    d ? (
                      <div
                        className="skill-detail-item"
                        key={`${i}`}
                        style={{ marginTop: i === 0 ? '8px' : '0px' }}
                      >
                        <CheckCircleFilled
                          style={{
                            color: theme.skillIconColor,
                            marginRight: '4px',
                          }}
                        />
                        {i === 0 && (
                          <b
                            className="info-name"
                            style={{ marginRight: '4px' }}
                          >
                            {skill.skill_name}
                            <span style={{ marginRight: '4px' }}>:</span>
                          </b>
                        )}
                        {d}
                      </div>
                    ) : null
                  )}
                </React.Fragment>
              ) : null;
            })}
          </section>
        ) : null}
        {/* 更多信息 */}
        {awardList?.length ? (
          <section className="section section-award">
            <div className="section-title" style={{ color: theme.color }}>
              {titleNameMap?.awardList}
            </div>
            <table className="award-table">
              <tbody>
                {awardList.map((award, idx) => (
                  <tr key={idx.toString()}>
                    <td className="icon-col">
                      <TrophyFilled style={{ color: theme.awardIconColor }} />
                    </td>
                    <td className="name-col">
                      <b>{award.award_info}</b>
                    </td>
                    {award.award_time ? (
                      <>
                        <td className="rank-col">{award.award_rank}</td>
                        <td className="time-col">{`(${award.award_time})`}</td>
                      </>
                    ) : (
                      <td
                        className="rank-col-full"
                        style={{ textAlign: 'right' }}
                      >
                        {award.award_rank}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}
      </div>
      <div className="main-info">
        {workExpList?.length
          ? wrapper({
              id: 'work-experience',
              title: titleNameMap?.workExpList,
              color: theme.color,
            })(
              <div className="section section-work-exp">
                {_.map(workExpList, (work, idx) => {
                  const [start = null, end = null] =
                    typeof work.work_time === 'string'
                      ? `${work.work_time || ''}`.split(',')
                      : work.work_time;
                  return work ? (
                    <div className="section-item" key={idx.toString()}>
                      <div className="section-info">
                        <b className="info-name">
                          {work.company_name}
                          <span className="sub-info">
                            {work.department_name}
                          </span>
                        </b>
                        <span className="info-time">
                          {start}
                          {end ? ` ~ ${end}` : <FormattedMessage id=" 至今" />}
                        </span>
                      </div>
                      <div className="work-description">{work.work_desc}</div>
                    </div>
                  ) : null;
                })}
              </div>
            )
          : null}

        {projectList?.length
          ? wrapper({
              id: 'skill',
              title: titleNameMap?.projectList,
              color: theme.color,
            })(
              <div className="section section-project">
                {_.map(projectList, (project, idx) =>
                  project ? (
                    <div
                      className={`section-item section-item-${getProjectLevel(
                        idx
                      )}`}
                      key={idx.toString()}
                    >
                      <div className="section-info">
                        <b className="info-name">
                          {project.project_name}
                          <span className="info-time">
                            {project.project_time}
                          </span>
                        </b>
                        {project.project_role &&
                          (idx < 3 ? (
                            <Tag
                              className="project-role-tag"
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
                            <span className="project-role-text">
                              {project.project_role}
                            </span>
                          ))}
                      </div>
                      {idx < 2 ? (
                        <>
                          <div className="section-detail">
                            <b>
                              <FormattedMessage id="项目描述" />：
                            </b>
                            <span>{project.project_desc}</span>
                          </div>
                          {project.project_tech_stack && (
                            <div className="section-detail">
                              <b>
                                <FormattedMessage id="技术栈" />：
                              </b>
                              <span>{project.project_tech_stack}</span>
                            </div>
                          )}
                          <div className="section-detail">
                            <b>
                              <FormattedMessage id="主要工作" />：
                            </b>
                            <span className="project-content">
                              {project.project_content}
                            </span>
                          </div>
                        </>
                      ) : idx === 2 ? (
                        <>
                          {project.project_tech_stack && (
                            <div className="section-detail section-detail-compact">
                              <b>
                                <FormattedMessage id="技术栈" />：
                              </b>
                              <span>{project.project_tech_stack}</span>
                            </div>
                          )}
                          <div className="section-detail section-detail-compact">
                            <b>
                              <FormattedMessage id="主要工作" />：
                            </b>
                            <span className="project-content">
                              {project.project_content}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="section-detail section-detail-lite">
                          <span className="project-content">
                            {project.project_content}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            )
          : null}
      </div>
    </div>
  );
};
