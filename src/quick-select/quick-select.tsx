import { useState, type Dispatch, type SetStateAction } from 'react';

import { Background } from '../background/background';
import { Button } from '../button/button';

import styles from './quick-select.module.css';

type TOption = {
  label: string;
  start: string;
  end: string;
};

type TSelect = {
  options: TOption[];
  setStart: Dispatch<SetStateAction<string>>;
  setEnd: Dispatch<SetStateAction<string>>;
};

export const QuickSelect = ({ options, setStart, setEnd }: TSelect) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onClick = (item: TOption) => {
    setStart(item.start);
    setEnd(item.end);
  };

  return (
    <div className={styles.quick_select}>
      <Button onClick={onOpen}>Quick</Button>
      {isOpen && (
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
