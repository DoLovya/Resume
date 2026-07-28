import React from 'react';
import { ContactsTwoTone } from '@ant-design/icons';
import _ from 'lodash-es';
import type { ResumeConfig } from '@/components/types';

/**
 * ① 内置的简历模块
 * ② 后续支持添加自定义模块
 */
export const MODULES = ({
  intl,
  titleNameMap,
}: {
  intl: any;
  titleNameMap?: ResumeConfig['titleNameMap'];
}) => {
  return [
    {
      name: intl.formatMessage({ id: '头像设置' }),
      icon: <ContactsTwoTone />,
      key: 'avatar',
    },
  ].map(d => {
    const name = _.get(titleNameMap, d.key);
    return { ...d, name: _.isNil(name) ? d.name : name };
  });
};

/**
 * 模块对应配置内容
 */
export const CONTENT_OF_MODULE = ({ intl }) => {
  return {
    avatar: [
      {
        type: 'checkbox',
        attributeId: 'hidden',
        displayName: intl.formatMessage({ id: '隐藏头像' }),
        formItemProps: {
          valuePropName: 'checked',
        },
        cfg: {
          checked: false,
        },
      },
      {
        type: 'avatar-upload',
        attributeId: 'src',
        displayName: intl.formatMessage({ id: '头像地址' }),
      },
      {
        type: 'select',
        attributeId: 'shape',
        displayName: intl.formatMessage({ id: '头像形状' }),
        cfg: {
          defaultValue: 'circle',
          options: [
            { value: 'circle', label: intl.formatMessage({ id: '圆形' }) },
            { value: 'square', label: intl.formatMessage({ id: '方形' }) },
          ],
        },
      },
    ],
  };
};
