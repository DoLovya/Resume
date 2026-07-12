import { FormattedMessage } from 'react-intl';
import React, { useEffect } from 'react';
import { Input, Select } from 'antd';
import { ColorPicker } from '../../FormCreator/ColorPicker';
import type { ThemeConfig } from '../../types';

type Props = ThemeConfig & {
  onChange: (v: Partial<ThemeConfig>) => void;
};

const FormItemStyle = {
  display: 'flex',
  alignItems: 'center',
  minWidth: '100px',
};

const FONT_FAMILY_OPTIONS = [
  {
    value: 'default',
    labelId: '默认字体',
    cssFamily:
      "'roboto-regular', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
  },
  {
    value: 'system-ui',
    labelId: '系统无衬线',
    cssFamily:
      "system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
  },
  {
    value: 'pingfang',
    labelId: '苹方',
    cssFamily:
      "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
  },
  {
    value: 'yahei',
    labelId: '微软雅黑',
    cssFamily: "'Microsoft YaHei', 'PingFang SC', sans-serif",
  },
  {
    value: 'songti',
    labelId: '宋体',
    cssFamily: "'Songti SC', 'STSong', 'SimSun', serif",
  },
  {
    value: 'inter',
    labelId: 'Inter',
    cssFamily:
      "'Inter', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
  },
  {
    value: 'noto-sans-sc',
    labelId: '思源黑体',
    cssFamily:
      "'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
  },
  {
    value: 'noto-serif-sc',
    labelId: '思源宋体',
    cssFamily: "'Noto Serif SC', 'Songti SC', 'STSong', 'SimSun', serif",
  },
  {
    value: 'serif-cn',
    labelId: '中文衬线',
    cssFamily:
      "'Noto Serif SC', 'Songti SC', 'STSong', 'SimSun', 'Times New Roman', serif",
  },
];

const getFontFamilyCssValue = (fontFamily = 'default') =>
  FONT_FAMILY_OPTIONS.find(option => option.value === fontFamily)?.cssFamily ||
  FONT_FAMILY_OPTIONS[0].cssFamily;

export const ConfigTheme: React.FC<Props> = props => {
  useEffect(() => {
    let $style = document.getElementById('dynamic');
    if (!$style) {
      $style = document.createElement('style');
      $style.setAttribute('id', 'dynamic');
      document.head.insertBefore($style, null);
    }
    const currentFontFamily = getFontFamilyCssValue(props.fontFamily);
    const styles = `
      :root {
        --primary-color: ${props.color};
        --resume-font-family: ${currentFontFamily};
        --resume-font-family-medium: ${currentFontFamily};
        --resume-font-family-light: ${currentFontFamily};
        --tag-color: ${props.tagColor};
        --skill-icon-color: ${props.skillIconColor};
        --award-icon-color: ${props.awardIconColor};
      }
    `;
    $style.innerHTML = styles;
  }, [
    props.color,
    props.fontFamily,
    props.tagColor,
    props.skillIconColor,
    props.awardIconColor,
  ]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <div style={FormItemStyle}>
          <span style={{ marginRight: '4px' }}>
            <FormattedMessage id="字体" />
          </span>
          <Select
            value={props.fontFamily || 'default'}
            onChange={value => props.onChange({ fontFamily: value })}
            style={{ width: '220px' }}
          >
            {FONT_FAMILY_OPTIONS.map(option => (
              <Select.Option key={option.value} value={option.value}>
                <FormattedMessage id={option.labelId} />
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <div style={FormItemStyle}>
          <span style={{ marginRight: '4px' }}>
            <FormattedMessage id="主题色" />
          </span>
          <ColorPicker
            value={props.color}
            onChange={v => props.onChange({ color: v })}
          />
        </div>
        <div style={FormItemStyle}>
          <span style={{ marginRight: '4px' }}>
            <FormattedMessage id="Tag 标签色" />
          </span>
          <ColorPicker
            value={props.tagColor}
            onChange={v => props.onChange({ tagColor: v })}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <div style={FormItemStyle}>
          <span style={{ marginRight: '4px' }}>
            <FormattedMessage id="技能图标色" />
          </span>
          <ColorPicker
            label={<FormattedMessage id="技能图标色" />}
            value={props.skillIconColor}
            onChange={v => props.onChange({ skillIconColor: v })}
          />
        </div>
        <div style={FormItemStyle}>
          <span style={{ marginRight: '4px' }}>
            <FormattedMessage id="奖项图标色" />
          </span>
          <ColorPicker
            label={<FormattedMessage id="奖项图标色" />}
            value={props.awardIconColor}
            onChange={v => props.onChange({ awardIconColor: v })}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <div style={FormItemStyle}>
            <span style={{ marginRight: '4px' }}>
              <FormattedMessage id="上边距" />
            </span>
            <Input
              value={props.margin?.top}
              onChange={e => props.onChange({ margin: { ...props.margin, top: e.target.value } })}
              placeholder="20px"
              style={{ width: '80px' }}
            />
          </div>
          <div style={FormItemStyle}>
            <span style={{ marginRight: '4px' }}>
              <FormattedMessage id="下边距" />
            </span>
            <Input
              value={props.margin?.bottom}
              onChange={e => props.onChange({ margin: { ...props.margin, bottom: e.target.value } })}
              placeholder="20px"
              style={{ width: '80px' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <div style={FormItemStyle}>
            <span style={{ marginRight: '4px' }}>
              <FormattedMessage id="左边距" />
            </span>
            <Input
              value={props.margin?.left}
              onChange={e => props.onChange({ margin: { ...props.margin, left: e.target.value } })}
              placeholder="20px"
              style={{ width: '80px' }}
            />
          </div>
          <div style={FormItemStyle}>
            <span style={{ marginRight: '4px' }}>
              <FormattedMessage id="右边距" />
            </span>
            <Input
              value={props.margin?.right}
              onChange={e => props.onChange({ margin: { ...props.margin, right: e.target.value } })}
              placeholder="20px"
              style={{ width: '80px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
