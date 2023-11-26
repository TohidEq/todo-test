import TodoList from "@/components/TodoList";
import TodoAdd from "@/components/TodoAdd";

export const revalidate = 0;

export default function Home() {
  return (
    <main className="todos">
      <TodoAdd />
      <TodoList />
    </main>
  );
}
