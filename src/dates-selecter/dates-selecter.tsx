import { useCallback, useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import type { Value } from 'react-calendar/dist/shared/types.js';

import { Button } from '../button/button';
import { Background } from '../background/background';
import { time } from '../utils/data';
import type { TSelecter } from '../utils/types';
import { SELECTER } from '../utils/constants';

import styles from './dates-selecter.module.css';

export const DatesSelecter = ({
  start,
  end,
  setStart,
  setEnd,
  setActiveSelecter,
  activeSelecter,
}: TSelecter) => {
  const startDate = useMemo(() => (start && start.length ? new Date(start) : new Date()), [start]);

  const endDate = useMemo(() => (end && end.length ? new Date(end) : new Date()), [end]);

  const [value, setValue] = useState<Value>([null, null]);

  const [startTime, setStartTime] = useState<string>(() => startDate.toTimeString().slice(0, 9));

  const [endTime, setEndTime] = useState<string>(() => endDate.toTimeString().slice(0, 9));

  useEffect(() => {
    setStartTime(startDate.toTimeString().slice(0, 9));
    if (endDate.toTimeString().slice(0, 9).includes('59')) {
      setEndTime(`${time[0]}:00`);
    } else {
      setEndTime(endDate.toTimeString().slice(0, 9));
    }
  }, [startDate, endDate]);

  const onOpen = () => {
    setActiveSelecter(SELECTER.dates);
  };

  const onClose = () => {
    setActiveSelecter('');
    setValue([null, null]);
    setStartTime('');
    setEndTime('');
  };

  const handleCalendarChange = (newValue: Value) => {
    console.log(1)
    if (Array.isArray(newValue)) {
      const [start, end] = newValue as Date[];
      setValue([start, end]);
      setStart(String(start));
      setEnd(String(end));
    }
  };

  const onSelectTime = useCallback(
    (item: string, value: Value, index: number) => {
      if (Array.isArray(value)) {
        const ind = String(value[index]).indexOf(':');
        const startPart = String(value[index]).slice(0, ind - 2);
        if (index === 0) {
          const endPart = String(value[index]).slice(ind + 3);
          setStart(startPart + item + endPart);
          setStartTime(item);
        } else {
          const endPart = String(value[index]).slice(ind + 6);
          if (item === time[0]) {
            setEnd(startPart + '23:59' + endPart);
          } else {
            setEnd(startPart + item + endPart);
          }
          setEndTime(`${item}:00`);
        }
      }
    },
    [setStart, setEnd],
  );

  const disabledTime = useMemo(() => {
    if (Array.isArray(value) && !value[0]) return true;
    return false;
  }, [value]);

  const isDisabled = useMemo(() => {
    return activeSelecter !== SELECTER.dates && activeSelecter.length !== 0;
  }, [activeSelecter]);

  return (
    <div className={styles.dates_selecter}>
      <Button onClick={onOpen} disabled={isDisabled}>
        Выбор дат
      </Button>
      {activeSelecter === SELECTER.dates && (
        <Background onClose={onClose}>
          <div className={styles.calendar_wrap}>
            <Calendar
              onChange={handleCalendarChange}
              value={value}
              selectRange={true}
              locale="ru-RU"
              className={styles.calendar}
            />
            <div className={styles.time_wrap}>
              <p className={styles.time_title}>Начало:</p>
              <ul className={disabledTime ? styles.time_list_disabled : styles.time_list}>
                {time.map((item, index) => (
                  <li
                    className={startTime.slice(0, 5) === item ? styles.time_active : styles.time}
                    key={index}
                  >
                    <Button view="secondary" onClick={() => onSelectTime(item, value, 0)}>
                      {item}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.time_wrap}>
              <p className={styles.time_title}>Конец:</p>
              <ul className={disabledTime ? styles.time_list_disabled : styles.time_list}>
                {time.map((item, index) => (
                  <li
                    className={endTime.slice(0, 5) === item ? styles.time_active : styles.time}
                    key={index}
                  >
                    <Button view="secondary" onClick={() => onSelectTime(item, value, 1)}>
                      {item}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Background>
      )}
    </div>
  );
};
