import React, { createContext, useContext, useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoContext = createContext<{
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  editTodo: (todo: Todo) => void;
  done: (todo: Todo) => void;
}>({
  todos: [],
  addTodo: () => {},
  editTodo: () => {},
  done: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = async (todo: Todo) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    };

    try {
      const response = await fetch("/api/todos", requestOptions);
      const result = await response.json();
      if (response.ok) {
        setTodos([...todos, result]);
      } else {
        console.error("Failed to save the todo:", result);
      }
    } catch (error) {
      console.error("Error saving the todo:", error);
    }
  };

  const editTodo = async (editedTodo: Todo) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedTodo),
    };

    try {
      const response = await fetch(
        `/api/todos/${editedTodo.id}`,
        requestOptions
      );
      const result = await response.json();
      if (response.ok) {
        setTodos(
          todos.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
        );
      } else {
        console.error("Failed to edit the todo:", result);
      }
    } catch (error) {
      console.error("Error editing the todo:", error);
    }
  };

  const done = async (doneTodo: Todo) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doneTodo),
    };

    try {
      const response = await fetch(
        `/api/todos/${doneTodo.id}/complete`,
        requestOptions
      );
      const result = await response.json();
      if (response.ok) {
        setTodos(
          todos.map((todo) => (todo.id === doneTodo.id ? doneTodo : todo))
        );
      } else {
        console.error("Failed to edit the todo:", result);
      }
    } catch (error) {
      console.error("Error editing the todo:", error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, done }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
