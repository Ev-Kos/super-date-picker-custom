import { useState } from 'react';

import { SelectedPeriod } from '../selected-period/selected-period';
import { QuickSelect } from '../quick-select/quick-select';
import { quickSelect } from '../utils/data';
import { parseTimeString } from '../utils/date';

import styles from './super-date-picker.module.css';

export const SuperDatePicker = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  return (
    <section className={styles.container}>
      <SelectedPeriod start={parseTimeString(start)} end={parseTimeString(end)} />
      <QuickSelect options={quickSelect} setStart={setStart} setEnd={setEnd} />
    </section>
  );
};
