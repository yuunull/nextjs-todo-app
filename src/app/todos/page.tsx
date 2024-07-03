"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { Modal } from "@/components/modal";
import { Todo } from "@/components/todos/todo";
import TodoList from "@/components/todos/todoList";

export default function Todos() {
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
        <div className={styles["todo-item-create-container"]}>
          <button
            className={styles["todo-item-create"]}
            onClick={() => handleOpenModal()}
          >
            タスクを追加する
          </button>
        </div>
        <div className={styles["todo-item-container"]}>
          <TodoList todos={todos} />
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
