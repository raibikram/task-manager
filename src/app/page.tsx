"use client";
import React, { useState, useMemo } from "react";
import { TaskFormModal } from "@/components/TaskForm";
import { TaskItem } from "@/components/TaskItem";
import { useTasks } from "@/hooks/useTasks";
import { useDebounce } from "@/hooks/useDebounce";
import { Task } from "@/components/TaskFormTypes";

export default function Page() {
  const { tasks, addTask, updateTask, deleteTask, toggleStatus } = useTasks();
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  const visibleTasks = useMemo(() => {
    let list = [...tasks];
    if (filter !== "all") list = list.filter((t) => t.status === filter);
    if (debouncedSearch)
      list = list.filter((t) =>
        t.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    list.sort((a, b) => {
      const valA = sortBy === "title" ? a.title : a.dueDate || "";
      const valB = sortBy === "title" ? b.title : b.dueDate || "";
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
    return list;
  }, [tasks, filter, debouncedSearch, sortBy, sortOrder]);

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Mini Task Tracker</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 p-2 border rounded-md"
        />
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | "pending" | "done")
          }
          className="p-2 border rounded-md"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "title" | "date")}
          className="p-2 border rounded-md"
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-3 py-1 bg-gray-300 rounded-md"
        >
          {sortOrder === "asc" ? "↑" : "↓"}
        </button>
        <button
          onClick={() =>
            setEditingTask({
              id: "",
              title: "",
              dueDate: "",
              status: "pending",
            })
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-2">
        {visibleTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={setEditingTask}
            onDelete={deleteTask}
            onToggle={toggleStatus}
          />
        ))}
      </ul>

      {editingTask && (
        <TaskFormModal
          task={editingTask.id ? editingTask : undefined}
          onSave={(t) => (editingTask.id ? updateTask(t) : addTask(t))}
          onClose={() => setEditingTask(null)}
        />
      )}
    </section>
  );
}
