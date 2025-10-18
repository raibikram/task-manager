"use client";
import React, { useState, useEffect } from "react";
import { Task } from "../types/TaskTypes";

interface Props {
  task?: Task; // If editing
  onSave: (task: Task) => void;
  onClose: () => void;
}

export const TaskFormModal: React.FC<Props> = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [status, setStatus] = useState<Task["status"]>(task?.status || "pending");

  useEffect(() => {
    setTitle(task?.title || "");
    setDueDate(task?.dueDate || "");
    setStatus(task?.status || "pending");
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ ...task, title, dueDate, status, id: task?.id || crypto.randomUUID() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md w-full max-w-md shadow-lg space-y-3"
      >
        <h2 className="text-xl font-bold">{task ? "Edit Task" : "Add Task"}</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
          className="w-full p-2 border rounded-md"
        >
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
