import { useMemo, useState } from 'react';

import { SelectedPeriod } from '../selected-period/selected-period';
import { QuickSelecter } from '../quick-selecter/quick-selecter';
import { quickSelect } from '../utils/data';
import { parseTime } from '../utils/parseTime';
import { DatesSelecter } from '../dates-selecter/dates-selecter';
import { RelativeSelecter } from '../relative-selecter/relative-selecter';
import { Button } from '../button/button';

import styles from './super-date-picker.module.css';

export const SuperDatePicker = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [activeSelecter, setActiveSelecter] = useState('');

  const onClickCancel = () => {
    setStart('');
    setEnd('');
  };

  const isDisabled = useMemo(() => {
    return start?.length === 0 && end?.length === 0;
  }, [start, end]);

  return (
    <section className={styles.container}>
      <div className={styles.select_wrap}>
        <SelectedPeriod start={parseTime(start)} end={parseTime(end)} />
        <Button view="apply" disabled={isDisabled}>
          Применить
        </Button>
      </div>
      <div className={styles.selecters}>
        <QuickSelecter
          options={quickSelect}
          setStart={setStart}
          setEnd={setEnd}
          setActiveSelecter={setActiveSelecter}
          activeSelecter={activeSelecter}
        />
        <DatesSelecter
          start={start}
          end={end}
          setStart={setStart}
          setEnd={setEnd}
          setActiveSelecter={setActiveSelecter}
          activeSelecter={activeSelecter}
        />
        <RelativeSelecter
          end={end}
          setStart={setStart}
          setEnd={setEnd}
          setActiveSelecter={setActiveSelecter}
          activeSelecter={activeSelecter}
        />
        <Button view="cancel" onClick={onClickCancel} disabled={isDisabled}>
          Отменить
        </Button>
      </div>
    </section>
  );
};
