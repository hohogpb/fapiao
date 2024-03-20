import { forwardRef } from 'react';
import styles from './input.module.scss';
import React from 'react';

interface InputProps {
  placeholder?: string;
  ref?: any;
}

export const Input = forwardRef<
  HTMLInputElement,
  InputProps & React.HTMLProps<HTMLInputElement>
>((props, ref) => {
  const { ...rest } = props;

  return (
    <div ref={ref} className={styles.wrap}>
      <input {...rest} />
    </div>
  );
});

export default Input;
