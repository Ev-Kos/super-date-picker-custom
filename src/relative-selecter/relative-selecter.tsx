import { useCallback, useEffect, useMemo, useState, type ChangeEvent } from 'react';

import type { TSelecter } from '../utils/types';
import { SELECTER } from '../utils/constants';
import { Button } from '../button/button';
import { Background } from '../background/background';
import { InputNumber } from '../input-number/input-number';
import { Select, type TOption } from '../select/select';
import { relativeSelect } from '../utils/data';
import {
  getDayLabel,
  getHourLabel,
  getMinuteLabel,
  getMonthLabel,
  getSecondLabel,
  getWeekLabel,
  getYearLabel,
} from '../utils/parseTime';

import styles from './relative-selecter.module.css';

export const RelativeSelecter = ({
  end,
  setStart,
  setEnd,
  activeSelecter,
  setActiveSelecter,
}: TSelecter) => {
  const [value, setValue] = useState('1');
  const [selected, setSelected] = useState<TOption | null>(relativeSelect[0]);

  const isDisabled = useMemo(() => {
    return activeSelecter !== SELECTER.relative && activeSelecter.length !== 0;
  }, [activeSelecter]);

  const onOpen = useCallback(() => {
    setActiveSelecter(SELECTER.relative);
    if (end && end.length === 0) {
      setEnd('now');
    }
  }, [end, setActiveSelecter, setEnd]);

  const onClose = useCallback(() => {
    setActiveSelecter('');
  }, [setActiveSelecter]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (activeSelecter === SELECTER.relative) {
      setStart(`now-${value}${selected?.value}`);
      if (end !== 'now') {
        setEnd('now');
      }
    }
  }, [value, selected]);

  const label = useMemo(() => {
    return selected?.label === 'Дней назад'
      ? getDayLabel(Number(value))
      : selected?.label === 'Часов назад'
        ? getHourLabel(Number(value))
        : selected?.label === 'Месяцев назад'
          ? getMonthLabel(Number(value))
          : selected?.label === 'Лет назад'
            ? getYearLabel(Number(value))
            : selected?.label === 'Недель назад'
              ? getWeekLabel(Number(value))
              : selected?.label === 'Минут назад'
                ? getMinuteLabel(Number(value))
                : getSecondLabel(Number(value));
  }, [selected, value]);

  return (
    <div className={styles.relative_selecter}>
      <Button onClick={onOpen} disabled={isDisabled}>
        Относительное время
      </Button>
      {activeSelecter === SELECTER.relative && (
        <Background onClose={onClose}>
          <div className={styles.inputs}>
            <InputNumber onChange={onChange} value={value} />
            <Select
              options={relativeSelect}
              value={selected}
              onChange={setSelected}
              label={label}
            />
          </div>
        </Background>
      )}
    </div>
  );
};
