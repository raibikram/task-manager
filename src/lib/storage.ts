import { Task } from "@/components/TaskForm";

const KEY = "tasks";

export const getTasks = (): Task[] => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(KEY, JSON.stringify(tasks));
};
