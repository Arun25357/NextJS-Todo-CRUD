"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, description, status, dueDate }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newStatus, setNewStatus] = useState(status); // New status state
  const [newDueDate, setNewDueDate] = useState(dueDate); // New dueDate state

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ 
          newTitle, 
          newDescription, 
          newStatus, 
          newDueDate 
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      {/* Dropdown สำหรับเปลี่ยนสถานะ */}
      <select 
        onChange={(e) => setNewStatus(e.target.value)} 
        value={newStatus} 
        className="border border-slate-500 px-8 py-2"
      >
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </select>

      {/* ฟิลด์สำหรับเลือกวันที่ครบกำหนด */}
      <input
        onChange={(e) => setNewDueDate(e.target.value)}
        value={newDueDate}
        className="border border-slate-500 px-8 py-2"
        type="date"
        placeholder="Due Date"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
}
