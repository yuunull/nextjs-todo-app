import React, { useState } from "react";
import styles from "./index.module.css";
import { Todo, useTodos } from "@/contexts/todoProviderContext";
import { Modal } from "@/components/modal";
import { TodoList } from "./todoList";

export const TodoLayout = () => {
  const { todos, addTodo } = useTodos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [editIndex, setEditIndex] = useState(null);

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
    addTodo(todo);
    handleCloseModal();
  };

  return (
    <div>
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
    </div>
  );
};
