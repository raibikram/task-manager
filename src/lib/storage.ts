// import { Task } from "@/components/TaskFormTypes";

// const KEY = "tasks";

// export const getTasks = (): Task[] => {
//   const data = localStorage.getItem(KEY);
//   return data ? JSON.parse(data) : [];
// };

// export const saveTasks = (tasks: Task[]) => {
//   localStorage.setItem(KEY, JSON.stringify(tasks));
// };

import { Task } from "@/types/TaskTypes";

const STORAGE_KEY = "tasks";

// Safe localStorage access (avoids SSR errors in Next.js)
export const getTasks = (): Task[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTasks = (tasks: Task[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
