"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { Modal } from "@/components/modal";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const handleOpenModal = (task = null, index = null) => {
    setCurrentTodo(task);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTodo(null);
    setEditIndex(null);
  };

  const handleSubmitTask = (todo: Todo) => {
    if (editIndex !== null) {
      const updatedTasks = [...todos];
      updatedTasks[editIndex] = todo;
      setTodos(updatedTasks);
    } else {
      setTodos([...todos, todo]);
    }
  };

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.todoItemCreateContainer}>
          <button
            className={styles.todoItemCreate}
            onClick={() => handleOpenModal()}
          >
            タスクを追加する
          </button>
        </div>
        <div className={styles.todoItemContainer}>
          <ul>
            {todos.map((todo) => (
              <li className={styles.todoItem} key={todo.id}>
                <div className={styles.todoItemTitle}>{todo.title}</div>
                <div className={styles.todoItemCompleted}>
                  {todo.completed ? "完了" : "未完了"}
                </div>
                <div className={styles.todoItemAction}>
                  <ul className={styles.todoItemActionList}>
                    <li>
                      <button className={styles.todoItemEdit}>編集する</button>
                    </li>
                    <li>
                      {todo.completed ? (
                        <button className={styles.todoItemUnDone}>
                          未完了に戻す
                        </button>
                      ) : (
                        <button className={styles.todoItemDone}>
                          完了にする
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        {isModalOpen && (
          <Modal
            onClose={handleCloseModal}
            onSubmit={handleSubmitTask}
            todo={currentTodo}
          />
        )}
      </div>
    </main>
  );
}
