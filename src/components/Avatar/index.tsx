import React, { useState } from 'react';
import { Upload, Avatar as AntdAvatar } from 'antd';
import './index.less';
import defaultAvatar from '../../../static/images/defaultAvatar.jpg';

export const Avatar = ({
  avatarSrc,
  className,
  shape = 'circle',
  size = 'default',
}) => {
  return (
    <div className="avatar">
      {avatarSrc ? (
        // @ts-ignore
        <AntdAvatar
          className={className}
          src={avatarSrc}
          shape={shape as any}
          size={size as any}
        />
      ) : (
        <AntdAvatar
          className={className}
          src={defaultAvatar}
          shape={shape as any}
          size={size as any}
        />
      )}
    </div>
  );
};
