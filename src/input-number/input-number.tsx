import type { InputHTMLAttributes } from 'react';

import styles from './input-number.module.css';

export const InputNumber = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return <input type="number" step={1} className={styles.input} {...props}></input>;
};
