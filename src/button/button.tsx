import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './button.module.css';

type TView = 'primary' | 'secondary' | 'apply' | 'cancel';

type TButton = {
  children: ReactNode;
  view?: TView;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, view = 'primary', ...props }: TButton) => {
  const className =
    view === 'primary'
      ? `${styles.button}`
      : view === 'secondary'
        ? `${styles.button_secondary}`
        : view === 'apply'
          ? `${styles.button_apply}`
          : `${styles.button_cancel}`;

  return (
    <button {...props} className={className} type="button">
      {children}
      {view === 'primary' && <p className={styles.arrow}>&gt;</p>}
    </button>
  );
};
