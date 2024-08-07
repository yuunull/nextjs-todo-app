import React, { useEffect, useState } from "react";
import styles from "./modal.module.css";
import { Todo } from "@/contexts/todoProviderContext";

type Props = {
  todo: Todo | null;
  onSubmit: (todo: Todo) => void;
  onClose: () => void;
};

export const Modal: React.FC<Props> = (props) => {
  const [todo, setTodo] = useState<Todo>(
    props.todo || { id: 0, title: "", completed: false }
  );

  useEffect(() => {
    if (props.todo) {
      setTodo(props.todo);
    }
  }, [props.todo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(todo);
    props.onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{props.todo ? "タスクを編集" : "タスクを追加"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            value={todo?.title || ""}
            onChange={handleChange}
            placeholder="タスク内容を入力"
          />
          <div className={styles["modal-button"]}>
            <button className={styles["button-ok"]} type="submit">
              {props.todo ? "更新" : "追加"}
            </button>
            <button
              className={styles["button-cancel"]}
              type="button"
              onClick={props.onClose}
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
