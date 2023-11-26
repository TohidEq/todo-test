import getApiURL from "./getApiURL";

export default async function fetchTodos() {
  const res = await fetch(`${getApiURL()}/todos`);

  if (!res.ok) return undefined;

  const todos: Todo[] = await res.json();

  return todos;
}
