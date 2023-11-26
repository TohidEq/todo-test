"use client";

import getApiURL from "@/lib/getApiURL";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { IoIosAddCircle } from "react-icons/io";

const initState: Partial<Todo> = {
  // userId: 1,
  title: "",
};

export default function TodoAdd() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(initState);

  const isMutating = isFetching || isPending;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title } = data;

    setIsFetching(true);

    const res = await fetch(`${getApiURL()}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });

    await res.json();

    setIsFetching(false);

    setData((prevData) => ({
      ...prevData,
      title: "",
    }));

    startTransition(() => {
      if (pathname === "/add") {
        router.push("/");
      } else {
        // Refresh the current route and fetch new data
        // from the server without losing
        // client-side browser or React state.
        router.refresh();
      }
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    setData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  return (
    <div className="todo-add">
      <form
        className="todo-add-form"
        onSubmit={handleSubmit}
        style={{ opacity: !isMutating ? 1 : 0.7 }}
        aria-disabled={isMutating}
      >
        <input
          onInvalid={(e) =>
            (e.target as any).setCustomValidity("Enter Something 🙂")
          }
          onInput={(e) => (e.target as any).setCustomValidity("")}
          required
          type="text"
          id="title"
          name="title"
          value={data.title}
          onChange={handleChange}
          className="flex-grow p-1 w-full text-2xl rounded-lg"
          placeholder="New Todo"
          autoFocus
        />
        <button type="submit">
          <IoIosAddCircle />
        </button>
      </form>
    </div>
  );
}
