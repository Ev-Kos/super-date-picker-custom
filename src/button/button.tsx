import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './button.module.css';

type TView = 'primary' | 'secondary';

type TButton = {
  children: ReactNode;
  view?: TView;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, view = 'primary', ...props }: TButton) => {
  const className = view === 'primary' ? `${styles.button}` : `${styles.button_secondary} : `;
  return (
    <button {...props} className={className}>
      {children}
      {view === 'primary' && <p className={styles.arrow}>&gt;</p>}
    </button>
  );
};
