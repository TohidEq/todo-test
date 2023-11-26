import getApiURL from "./getApiURL";

export default async function fetchTodo(id: string) {
  const res = await fetch(getApiURL() + `/todos/todos/${id}`);

  //if (!res.ok) return undefined;

  const todo: Todo = await res.json();

  return todo;
}
