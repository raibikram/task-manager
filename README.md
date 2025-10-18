

# Mini Task Tracker – React + TypeScript

A **lightweight task management app** built with **Next.js**, **TypeScript**, and **Tailwind CSS**.
Add, edit, delete, and toggle tasks, with **debounced search**, filtering, and sorting.

---

## Features

* Add / Edit / Delete tasks (modal)
* Toggle status: Pending / Done
* **Debounced search** for smooth performance
* Filter by status: All / Pending / Done
* Sort by title or due date
* Persist tasks using **LocalStorage**
* Fully responsive UI with **Tailwind CSS**

---

## Tech Stack

Next.js 14+, React 18+, TypeScript, Tailwind CSS, LocalStorage

---

## Setup

```bash
git clone https://github.com/raibikram/task-manager.git
cd task-tracker
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Folder Structure

```
src/
 ├─ app/page.tsx
 ├─ components/TaskForm.tsx
 ├─ components/TaskItem.tsx
 ├─ hooks/useTasks.ts
 ├─ hooks/useDebounce.ts
 ├─ lib/storage.ts
 └─ types/TaskTypes.ts
```

---

## Author

**Bikram Rai** — Frontend Developer
🌐 [bikram-rai.com.np](https://bikram-rai.com.np)


