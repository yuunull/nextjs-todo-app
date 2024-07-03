import React from "react";
import styles from "./todo.module.css";
import { StatusLabel } from "@/components/statusLabel";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoRow: React.FC<Todo> = (todo) => {
  return (
    <>
      <div className={styles["todo-item-title"]}>{todo.title}</div>
      <div className={styles["todo-item-completed"]}>
        <StatusLabel completed={todo.completed} />
      </div>
      <div className={styles["todo-item-action"]}>
        <ul className={styles["todo-item-action-list"]}>
          <li>
            <button className={styles["todo-item-edit"]}>編集する</button>
          </li>
          <li>
            {todo.completed ? (
              <button className={styles["todo-item-un-done"]}>
                未完了に戻す
              </button>
            ) : (
              <button className={styles["todo-item-done"]}>完了にする</button>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default TodoRow;