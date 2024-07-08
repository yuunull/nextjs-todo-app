import React from "react";
import styles from "./todoList.module.css";
import { Todo } from "@/contexts/todoProviderContext";
import { TodoRow } from "./todo";

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return todos ? (
    <>
      <ul>
        {todos.map((todo) => (
          <li className={styles["todo-item"]} key={todo.id}>
            <TodoRow {...todo} />
          </li>
        ))}
      </ul>
    </>
  ) : (
    <div>Not Todos</div>
  );
};
