"use client";
import React, { memo } from "react";
import { Task } from "../types/TaskTypes";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItemComponent: React.FC<Props> = ({
  task,
  onEdit,
  onToggle,
  onDelete,
}) => (
  <li className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm border">
    <div>
      <p
        className={`${
          task.status === "done" ? "line-through text-gray-500" : ""
        }`}
      >
        {task.title}
      </p>
      {task.dueDate && (
        <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
      )}
    </div>
    <div className="flex gap-2">
      <button
        onClick={() => onToggle(task.id)}
        className={`px-2 py-1 rounded-md text-white ${
          task.status === "done" ? "bg-yellow-500" : "bg-green-500"
        }`}
      >
        {task.status === "done" ? "Undo" : "Done"}
      </button>
      <button
        onClick={() => onEdit(task)}
        className="px-2 py-1 bg-blue-500 text-white rounded-md"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(task.id)}
        className="px-2 py-1 bg-red-500 text-white rounded-md"
      >
        Delete
      </button>
    </div>
  </li>
);

export const TaskItem = memo(TaskItemComponent);
TaskItem.displayName = "TaskItem";
