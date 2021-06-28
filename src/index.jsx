import TodoList from 'components/TodoList';
import styles from './index.scss';
import './__general.scss';

const App = () => (
  <section className={styles.main}>
    <header className={styles.header}>
      <h1>Travel-List</h1>
    </header>
    <TodoList />
  </section>
);

export default App;
