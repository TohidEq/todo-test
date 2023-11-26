import React from "react";
import TodoItem from "./TodoItem";
import fetchTodos from "@/lib/fetchTodos";

export default async function TodoList() {
  const todos = await fetchTodos();

  if (!todos?.length)
    return (
      <div className="todo-list">
        <h3>Nothing...</h3>
      </div>
    );

  const sortedTodos = todos.reverse();

  if (sortedTodos !== undefined)
    return (
      <div className="todo-list">
        {sortedTodos.map((item) => (
          <TodoItem {...item} key={item.id} />
        ))}
      </div>
    );
}
