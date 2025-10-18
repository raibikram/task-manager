// import { useState, useEffect, useCallback } from "react";

// import * as api from "@/lib/storage";
// import { Task } from "@/components/TaskFormTypes";

// export const useTasks = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);

//   useEffect(() => {
//     setTasks(api.getTasks());
//   }, []);

//   const persist = useCallback((updated: Task[]) => {
//     setTasks(updated);
//     api.saveTasks(updated);
//   }, []);

//   const addTask = (task: Task) => persist([...tasks, task]);
//   const updateTask = (task: Task) =>
//     persist(tasks.map((t) => (t.id === task.id ? task : t)));
//   const deleteTask = (id: string) => persist(tasks.filter((t) => t.id !== id));
//   const toggleStatus = (id: string) =>
//     persist(
//       tasks.map((t) => ({
//         ...t,
//         status: t.id === id ? (t.status === "done" ? "pending" : "done") : t.status,
//       }))
//     );

//   return { tasks, addTask, updateTask, deleteTask, toggleStatus };
// };
import { useState, useEffect, useCallback } from "react";
import * as api from "@/lib/storage";
import { Task } from "@/components/TaskFormTypes";


export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load from localStorage once
  useEffect(() => {
    setTasks(api.getTasks());
  }, []);

  const persist = useCallback((updated: Task[]) => {
    setTasks(updated);
    api.saveTasks(updated);
  }, []);

  const addTask = useCallback(
    (task: Task) => persist([...tasks, task]),
    [tasks, persist]
  );

  const updateTask = useCallback(
    (task: Task) => persist(tasks.map((t) => (t.id === task.id ? task : t))),
    [tasks, persist]
  );

  const deleteTask = useCallback(
    (id: string) => {
      if (!window.confirm("Are you sure you want to delete this task?")) return;
      persist(tasks.filter((t) => t.id !== id));
    },
    [tasks, persist]
  );

  const toggleStatus = useCallback(
    (id: string) =>
      persist(
        tasks.map((t) =>
          t.id === id
            ? { ...t, status: t.status === "done" ? "pending" : "done" }
            : t
        )
      ),
    [tasks, persist]
  );

  return { tasks, addTask, updateTask, deleteTask, toggleStatus };
};
