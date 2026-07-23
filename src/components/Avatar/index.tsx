import React, { useEffect, useState } from 'react';
import { Avatar as AntdAvatar, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getAvatar } from '@/helpers/avatar-storage';
import './index.less';

// 从姓名中提取首字母作为占位符展示内容
const getInitial = (name?: string): string => {
  if (!name) return '';
  const trimmed = name.trim();
  if (!trimmed) return '';
  // 中文取首字，英文取首字母并大写
  return trimmed.charAt(0).toUpperCase();
};

type AvatarProps = {
  /** 姓名用于无头像时生成首字母占位符 */
  name?: string;
  /** 自定义样式类名 */
  className?: string;
  /** 头像形状：'circle' | 'square'，透传给 antd Avatar */
  shape?: string;
  /** 头像尺寸：'large' | 'small' | 'default' | number，透传给 antd Avatar */
  size?: string | number;
};

export const Avatar: React.FC<AvatarProps> = ({
  name,
  className,
  shape = 'circle',
  size = 'default',
}) => {
  // 从 IndexedDB 读取到的头像 Base64 数据
  const [avatarData, setAvatarData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getAvatar()
      .then(data => {
        if (cancelled) return;
        setAvatarData(data);
      })
      .catch(error => {
        if (cancelled) return;
        console.error('从 IndexedDB 读取头像失败：', error);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // 占位符内容：优先显示姓名首字母，无 name 时显示默认用户图标
  const placeholder = name ? getInitial(name) : <UserOutlined />;

  return (
    <div className="avatar">
      {loading ? (
        <div className="avatar-loading">
          <Spin />
        </div>
      ) : avatarData ? (
        // @ts-ignore 透传给 antd Avatar 的 size 类型兼容
        <AntdAvatar
          className={className}
          src={avatarData}
          shape={shape as any}
          size={size as any}
        />
      ) : (
        // @ts-ignore 透传给 antd Avatar 的 size 类型兼容
        <AntdAvatar
          className={className}
          shape={shape as any}
          size={size as any}
        >
          {placeholder}
        </AntdAvatar>
      )}
    </div>
  );
};
