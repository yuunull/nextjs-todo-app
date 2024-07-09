import React from "react";
import styles from "./todo.module.css";
import { StatusLabel } from "@/components/statusLabel";
import { Todo } from "@/contexts/todoProviderContext";

type Props = {
  todo: Todo;
  openModal: (todo: Todo | null) => void;
  done: (todo: Todo) => void;
};

export const TodoRow: React.FC<Props> = ({ todo, openModal, done }) => {
  return (
    <>
      <div className={styles["todo-item-title"]}>{todo.title}</div>
      <div className={styles["todo-item-completed"]}>
        <StatusLabel completed={todo.completed} />
      </div>
      <div className={styles["todo-item-action"]}>
        {!todo.completed ? (
          <ul className={styles["todo-item-action-list"]}>
            <li>
              <button
                className={styles["todo-item-edit"]}
                onClick={() => openModal(todo)}
              >
                編集する
              </button>
            </li>
            <li>
              <button
                className={styles["todo-item-done"]}
                disabled={todo.completed}
                onClick={() => done({ ...todo, completed: true })}
              >
                完了にする
              </button>
            </li>
          </ul>
        ) : null}
      </div>
    </>
  );
};
