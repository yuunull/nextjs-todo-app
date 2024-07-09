"use client";

import { TodoProvider } from "@/contexts/todoProviderContext";
import { TodoLayout } from "@/components/pages/todos";

export default function Todos() {
  return (
    <TodoProvider>
      <main>
        <TodoLayout />
      </main>
    </TodoProvider>
  );
}
