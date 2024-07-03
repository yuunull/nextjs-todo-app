import React from "react";
import styles from "./todoList.module.css";
import TodoRow, { Todo } from "./todo";

export type Props = {
  todos: Todo[];
};

const TodoList: React.FC<Props> = ({ todos }) => {
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

export default TodoList;
