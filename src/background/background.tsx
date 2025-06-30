import { useEffect, type ReactNode } from 'react';

import styles from './background.module.css';

type TBackground = {
  children: ReactNode;
  onClose: VoidFunction;
};

export const Background = ({ children, onClose }: TBackground) => {
  useEffect(() => {
    const closeEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', closeEsc);

    return () => {
      document.removeEventListener('keydown', closeEsc);
    };
  }, [onClose]);

  return (
    <>
      <div
        className={styles.overlay}
        onClick={onClose}
        onKeyDown={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      ></div>
      <div className={styles.background_wrap}>
        <div className={styles.square}></div>
        <div className={styles.rectangle}>{children}</div>
      </div>
    </>
  );
};
