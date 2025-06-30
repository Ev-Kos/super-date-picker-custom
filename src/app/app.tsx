import { SuperDatePicker } from '../super-date-picker/super-date-picker';

import styles from './app.module.css';

function App() {
  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Super Date Picker</h1>
      <SuperDatePicker />
    </main>
  );
}

export default App;
