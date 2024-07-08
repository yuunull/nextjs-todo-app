import { useState } from "react";
import { Todo } from "@/contexts/todoProviderContext";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const openModal = (todo: Todo | null = null) => {
    setCurrentTodo(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTodo(null);
  };

  return {
    isModalOpen,
    currentTodo,
    openModal,
    closeModal,
  };
};

export default useModal;
