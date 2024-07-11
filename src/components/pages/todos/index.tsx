import React from "react";
import styles from "./index.module.css";
import { Todo, useTodos } from "@/contexts/todoProviderContext";
import { Modal } from "@/components/modal";
import { TodoList } from "./todoList";
import useModal from "@/hooks/useModal";

export const TodoLayout = () => {
  const { todos, addTodo, editTodo, done } = useTodos();
  const { isModalOpen, currentTodo, openModal, closeModal } = useModal();

  const handleSubmitModal = (todo: Todo) => {
    todo.id === 0 ? addTodo(todo) : editTodo(todo);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles["todo-item-create-container"]}>
          <button
            className={styles["todo-item-create"]}
            onClick={() => openModal()}
          >
            タスクを追加する
          </button>
        </div>
        <div className={styles["todo-item-container"]}>
          <TodoList todos={todos} openModal={openModal} done={done} />
        </div>
      </div>
      <div>
        {isModalOpen && (
          <Modal
            onClose={closeModal}
            onSubmit={handleSubmitModal}
            todo={currentTodo}
          />
        )}
      </div>
    </div>
  );
};
