import { useState } from 'react';

import { SelectedPeriod } from '../selected-period/selected-period';

import styles from './super-date-picker.module.css';

export const SuperDatePicker = () => {
  const [start, setStart] = useState('fff');
  const [end, setEnd] = useState('');

  console.log(setStart, setEnd);
  return (
    <section className={styles.container}>
      <SelectedPeriod start={start} end={end} />
    </section>
  );
};
