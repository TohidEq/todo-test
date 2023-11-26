"use client";

import { IoIosRemoveCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState, useTransition, ChangeEvent, MouseEvent } from "react";
import Link from "next/link";
import getApiURL from "@/lib/getApiURL";

export default function TodoItem(todo: Todo) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isFetching || isPending;

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    setIsFetching(true);

    const res = await fetch(`${getApiURL()}/todos/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
      }),
    });

    await res.json();

    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route and fetch new data
      // from the server without losing
      // client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <div className="todo-item" style={{ opacity: !isMutating ? 1 : 0.5 }}>
      <p className="title">{todo.title}</p>
      <div className="btns">
        <button onClick={handleDelete} disabled={isPending} className="btn">
          <IoIosRemoveCircle />
        </button>
      </div>
    </div>
  );
}
