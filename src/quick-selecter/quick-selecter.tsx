import { useMemo } from 'react';

import { Background } from '../background/background';
import { Button } from '../button/button';
import type { TSelecter } from '../utils/types';
import { SELECTER } from '../utils/constants';

import styles from './quick-selecter.module.css';

type TOption = {
  label: string;
  start: string;
  end: string;
};

type TQuickSelecter = {
  options: TOption[];
} & TSelecter;

export const QuickSelecter = ({
  options,
  setStart,
  setEnd,
  setActiveSelecter,
  activeSelecter,
}: TQuickSelecter) => {
  const onOpen = () => {
    setActiveSelecter(SELECTER.quick);
  };

  const onClose = () => {
    setActiveSelecter('');
  };

  const onClick = (item: TOption) => {
    setStart(item.start);
    setEnd(item.end);
  };

  const isDisabled = useMemo(() => {
    return activeSelecter !== SELECTER.quick && activeSelecter.length !== 0;
  }, [activeSelecter]);

  return (
    <div className={styles.quick_select}>
      <Button onClick={onOpen} disabled={isDisabled}>
        Быстрый доступ
      </Button>
      {activeSelecter === SELECTER.quick && (
        <Background onClose={onClose}>
          {options.map((item, index) => (
            <Button type="button" view="secondary" key={index} onClick={() => onClick(item)}>
              {item.label}
            </Button>
          ))}
        </Background>
      )}
    </div>
  );
};
