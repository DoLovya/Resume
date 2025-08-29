import { FormattedMessage } from 'react-intl';
import React, { useEffect } from 'react';
import { Input } from 'antd';
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

export const ConfigTheme: React.FC<Props> = props => {
  useEffect(() => {
    let $style = document.getElementById('dynamic');
    if (!$style) {
      $style = document.createElement('style');
      $style.setAttribute('id', 'dynamic');
      document.head.insertBefore($style, null);
    }
    const styles = `
      :root {
        --primary-color: ${props.color};
        --tag-color: ${props.tagColor};
        --skill-icon-color: ${props.skillIconColor};
        --award-icon-color: ${props.awardIconColor};
      }
    `;
    $style.innerHTML = styles;
  }, [props.color, props.tagColor, props.skillIconColor, props.awardIconColor]);

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
