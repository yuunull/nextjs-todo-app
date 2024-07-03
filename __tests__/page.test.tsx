import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../src/app/todos/page";

describe("Page Component", () => {
  it("renders correctly", () => {
    render(<Page />);
    expect(screen.getByText("タスクを追加する")).toBeInTheDocument();
  });

  // it("displays todo items correctly", () => {
  //   const todos = [
  //     { id: 1, title: "Test Todo 1", completed: false },
  //     { id: 2, title: "Test Todo 2", completed: true },
  //   ];
  //   render(<Page todos={todos} />);
  //   expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
  //   expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  // });

  // it("toggles todo completion status", () => {
  //   const todos = [{ id: 1, title: "Test Todo", completed: false }];
  //   render(<Page todos={todos} />);
  //   fireEvent.click(screen.getByText("完了にする"));
  //   // ここで完了状態の変更を検証する方法は、実際のコンポーネントの実装に依存します。
  //   // 例: expect(someFunctionToCheckCompletionStatus(todos[0].id)).toBe(true);
  // });
});
