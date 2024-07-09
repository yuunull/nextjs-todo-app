import React from "react";
import styles from "./todoList.module.css";
import { Todo } from "@/contexts/todoProviderContext";
import { TodoRow } from "./todo";

type Props = {
  todos: Todo[];
  openModal: (todo: Todo | null) => void;
  done: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ todos, openModal, done }) => {
  return todos ? (
    <>
      <ul>
        {todos.map((todo) => (
          <li className={styles["todo-item"]} key={todo.id}>
            <TodoRow todo={todo} openModal={openModal} done={done} />
          </li>
        ))}
      </ul>
    </>
  ) : (
    <div>Not Todos</div>
  );
};
