import TodoList from "@/components/todoList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <TodoList />
      </div>
    </main>
  );
}
