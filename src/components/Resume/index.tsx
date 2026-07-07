import React from 'react';
import { Template1 } from './Template1';
import { Template2 } from './Template2';
import { Template5 } from './Template5';

export const Resume: React.FC<any> = ({ template, ...restProps }) => {
  const Template = React.useMemo(() => {
    switch (template) {
      case 'template2':
        return Template2;
      case 'template5':
        return Template5;
      default:
        return Template1;
    }
  }, [template]);

  return Template ? <Template {...restProps} /> : null;
};
