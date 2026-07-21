import React, { useEffect, useState } from 'react';
import { Avatar as AntdAvatar, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getAvatar } from '@/helpers/avatar-storage';
import './index.less';

// 表示头像数据存储于 IndexedDB 的特殊标识
const INDEXEDDB_AVATAR_FLAG = 'indexeddb://avatar';

// 从姓名中提取首字母作为占位符展示内容
const getInitial = (name?: string): string => {
  if (!name) return '';
  const trimmed = name.trim();
  if (!trimmed) return '';
  // 中文取首字，英文取首字母并大写
  return trimmed.charAt(0).toUpperCase();
};

type AvatarProps = {
  /** 头像地址；值为 'indexeddb://avatar' 时表示从 IndexedDB 异步读取 */
  avatarSrc?: string;
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
  avatarSrc,
  name,
  className,
  shape = 'circle',
  size = 'default',
}) => {
  // 是否需要从 IndexedDB 异步读取头像
  const needLoadFromIndexedDB = avatarSrc === INDEXEDDB_AVATAR_FLAG;

  // 从 IndexedDB 读取到的头像 Base64 数据
  const [avatarData, setAvatarData] = useState<string | null>(null);
  // 加载状态：仅在需要从 IndexedDB 读取时为 true
  const [loading, setLoading] = useState<boolean>(needLoadFromIndexedDB);

  useEffect(() => {
    // 仅当头像来源标记为 IndexedDB 时才发起读取
    if (!needLoadFromIndexedDB) {
      return;
    }

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
  }, [avatarSrc]);

  // 真正用于展示的头像地址：IndexedDB 来源时使用读取到的数据，否则使用传入的 avatarSrc
  const resolvedSrc = needLoadFromIndexedDB ? avatarData : avatarSrc;

  // 占位符内容：优先显示姓名首字母，无 name 时显示默认用户图标
  const placeholder = name ? getInitial(name) : <UserOutlined />;

  return (
    <div className="avatar">
      {loading ? (
        <div className="avatar-loading">
          <Spin />
        </div>
      ) : resolvedSrc ? (
        // @ts-ignore 透传给 antd Avatar 的 size 类型兼容
        <AntdAvatar
          className={className}
          src={resolvedSrc}
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
