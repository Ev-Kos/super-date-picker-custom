import { useState } from 'react';

import { SelectedPeriod } from '../selected-period/selected-period';
import { QuickSelecter } from '../quick-selecter/quick-selecter';
import { quickSelect } from '../utils/data';
import { parseTimeString } from '../utils/date';
import { DatesSelecter } from '../dates-selecter/dates-selecter';

import styles from './super-date-picker.module.css';

export const SELECTER = {
  quick: 'quick',
  dates: 'dates',
} as const;

export const SuperDatePicker = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [activeSelecter, setActiveSelecter] = useState('');

  return (
    <section className={styles.container}>
      <SelectedPeriod start={parseTimeString(start)} end={parseTimeString(end)} />
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
      </div>
    </section>
  );
};
