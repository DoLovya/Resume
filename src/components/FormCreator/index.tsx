import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Checkbox,
  Select,
  Upload,
  Spin,
  message,
} from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import _ from 'lodash-es';
import { ColorPicker } from './ColorPicker';
import { FormattedMessage } from 'react-intl';
import {
  compressImage,
  saveAvatar,
  removeAvatar,
} from '@/helpers/avatar-storage';

type Props = {
  /** 表单配置 */
  config: Array<{
    type: string /** 组件类型 */;
    attributeId: string;
    displayName: string;
    formItemProps?: FormItemProps;
    cfg?: {
      [k: string]: any /**其它和组件本身有关的配置 */;
    };
  }>;
  /** 表单已配置内容 */
  value: {
    [key: string]: any;
  };
  onChange: (v: any) => void;
  /** 列表型内容 */
  isList: boolean;
};

type AvatarUploadProps = {
  /** 当前值，indexeddb://avatar 表示已上传，空字符串表示未上传 */
  value?: string;
  /** 值变更回调 */
  onChange?: (v: string) => void;
};

// 头像上传组件：使用 IndexedDB 本地存储，避免图片以 Base64 形式存在简历配置中
const AvatarUpload: React.FC<AvatarUploadProps> = ({ value, onChange }) => {
  const [uploading, setUploading] = useState<boolean>(false);

  // 处理文件选择：压缩、保存到 IndexedDB、更新表单值
  const handleBeforeUpload = async (
    file: File
  ): Promise<boolean> => {
    // 只允许图片类型
    if (!file.type.startsWith('image/')) {
      message.error('请选择图片文件');
      return false;
    }

    setUploading(true);
    try {
      // 压缩图片并转 Base64
      const base64 = await compressImage(file);
      // 保存到 IndexedDB
      await saveAvatar(base64);
      // 通过特殊协议标识头像来源
      onChange?.('indexeddb://avatar');
      message.success('头像上传成功');
    } catch (error) {
      message.error('头像上传失败');
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setUploading(false);
    }

    // 返回 false 阻止 antd 自动上传
    return false;
  };

  // 清除头像：删除 IndexedDB 中的记录并清空表单值
  const handleClear = async () => {
    setUploading(true);
    try {
      await removeAvatar();
      onChange?.('');
      message.success('已清除头像');
    } catch (error) {
      message.error('清除头像失败');
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const hasAvatar = !!value;

  return (
    <Spin spinning={uploading}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={handleBeforeUpload}
          fileList={[]}
        >
          <Button icon={<UploadOutlined />} disabled={uploading}>
            上传头像
          </Button>
        </Upload>
        {hasAvatar && (
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={handleClear}
            disabled={uploading}
          >
            清除头像
          </Button>
        )}
      </div>
    </Spin>
  );
};

const FormItemComponentMap = (type: string) => (
  props: { value: any; onChange?: (v) => void } = { value: null }
) => {
  switch (type) {
    case 'checkbox':
      return <Checkbox {...props} />;
    case 'select':
      return <Select {...props} />;
    case 'input':
      return <Input {...props} />;
    case 'number':
      return <InputNumber {...props} />;
    case 'textArea':
      return <Input.TextArea {...props} />;
    case 'color-picker':
      return <ColorPicker {...props} />;
    case 'avatar-upload':
      return <AvatarUpload {...props} />;
    default:
      return <Input />;
  }
};

export const FormCreator: React.FC<Props> = props => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const datas = Object.keys(props.value || {}).map(d => ({
      name: [d],
      value: props.value[d],
    }));
    setFields(datas);
  }, [props.value]);

  const handleChange = (values: any) => {
    if ('edu_time' in values && typeof values.edu_time === 'string') {
      values.edu_time = values.edu_time.split(',');
    }
    if ('work_time' in values) {
      values.work_time = values.work_time.split(',');
    }
    props.onChange(values);
  };
  const formProps = {
    [props.isList ? 'onFinish' : 'onValuesChange']: handleChange,
  };

  return (
    <div>
      <Form
        labelCol={{ span: 6 }}
        initialValues={props.value}
        fields={fields}
        {...formProps}
      >
        {_.map(props.config, c => {
          return (
            <Form.Item
              key={c.attributeId}
              label={c.displayName}
              wrapperCol={c.displayName ? { span: 18 } : { span: 24 }}
              name={c.attributeId}
              {...(c.formItemProps || {})}
            >
              {FormItemComponentMap(c.type)({
                ...(c.cfg || {}),
                value: _.get(props.value, [c.attributeId]),
              })}
            </Form.Item>
          );
        })}
        {props.isList && (
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button type="primary" htmlType="submit">
              <FormattedMessage id="提交" />
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};
