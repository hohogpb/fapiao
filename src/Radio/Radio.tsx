import React from 'react';
import { RadioGroup } from './RadioGroup';

interface RadioProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  children?: React.ReactNode;
  name?: string;
}

export const Radio: any = (props: RadioProps) => {
  const { value, children, onChange, name } = props;
  return (
    <label>
      <input type="radio" name={name} value={value} onChange={onChange} />
      {children}
    </label>
  );
};

Radio.Group = RadioGroup;


