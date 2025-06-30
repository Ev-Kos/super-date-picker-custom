import styles from './selected-period.module.css';

type TSelectedPeriod = {
  start: string;
  end: string;
};

export const SelectedPeriod = ({ start, end }: TSelectedPeriod) => {
  return (
    <div className={styles.selected}>
      <p className={styles.title}>Выбранный период:</p>
      <div className={start.length !== 0 ? styles.values_wrap : styles.values_wrap_empty}>
        <p className={styles.value}>{start}</p>
        {end.length !== 0 && (
          <div className={styles.value_end_wrap}>
            <span className={styles.arrow}>-{'>'}</span>
            <p className={styles.value}>{end}</p>
          </div>
        )}
      </div>
    </div>
  );
};
