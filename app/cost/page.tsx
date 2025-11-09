"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import data from "./data.json";

interface Item {
  id: number;
  name: string;
}

export default function Cost() {
  const router = useRouter();
  const [users, setUsers] = useState<Array<Item & { visible: boolean }>>([]);
  const [search, setSearch] = useState("");

  // Load JSON data
  useEffect(() => {
    setUsers(
      data.map((item: Item) => ({
        ...item,
        visible: false,
      }))
    );
  }, []);

  // Show cards when user searches certain term
  useEffect(() => {
    const shouldShow = search.trim().toLowerCase() === "broken bone";

    setUsers(prev =>
      prev.map(user => ({
        ...user,
        visible: shouldShow,
      }))
    );
  }, [search]);

  // Navigation handler based on card name
  const handleCardClick = (name: string) => {
    if (name === "Arm Fractures") {
      router.push("./cost/armfractureform"); 
      console.log("Clicked card:", name);
    } else if (name === "Skull Fractures") {
      //router.push("skullfractureform")
      console.log("Clicked card:", name);
    } else {
      console.log("Clicked card:", name);
    }
  };

  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <section className="text-xl font-semibold">My Cost page</section>

        <input
          type="text"
          placeholder="Type 'Broken Bone'"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full max-w-sm text-black"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {users.map((user) => (
            <div
              key={user.id}
              className={`border p-4 rounded bg-white text-black cursor-pointer ${
                user.visible ? "block" : "hidden"
              }`}
              onClick={() => handleCardClick(user.name)}
            >
              <strong>{user.name}</strong>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
