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

  const handleSubmitTask = async (todo: Todo) => {
    const requestOptions = {
      method: editIndex !== null ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    };

    const endpoint =
      editIndex !== null ? `/api/todos/${todo.id}` : "/api/todos";

    try {
      const response = await fetch(endpoint, requestOptions);
      const result = await response.json();
      if (response.ok) {
        if (editIndex !== null) {
          const updatedTasks = [...todos];
          updatedTasks[editIndex] = result;
          setTodos(updatedTasks);
        } else {
          setTodos([...todos, result]);
        }
        handleCloseModal();
      } else {
        // エラーハンドリング
        console.error("Failed to save the todo:", result);
      }
    } catch (error) {
      console.error("Error saving the todo:", error);
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
