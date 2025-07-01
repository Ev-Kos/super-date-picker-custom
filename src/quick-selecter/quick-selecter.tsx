import { useMemo, type Dispatch, type SetStateAction } from 'react';

import { Background } from '../background/background';
import { Button } from '../button/button';
import { SELECTER } from '../super-date-picker/super-date-picker';

import styles from './quick-selecter.module.css';

type TOption = {
  label: string;
  start: string;
  end: string;
};

type TSelect = {
  options: TOption[];
  setStart: Dispatch<SetStateAction<string>>;
  setEnd: Dispatch<SetStateAction<string>>;
  setActiveSelecter: Dispatch<SetStateAction<string>>;
  activeSelecter: string;
};

export const QuickSelecter = ({
  options,
  setStart,
  setEnd,
  setActiveSelecter,
  activeSelecter,
}: TSelect) => {
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
