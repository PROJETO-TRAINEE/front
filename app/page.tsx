'use client'

import React, { useState } from "react";
import { Trash2, ChevronDown, ChevronUp, Edit3 } from "lucide-react";
import { FaPlusCircle } from "react-icons/fa";

type Task = {
  id: number;
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
  updatedAt?: string;
  expanded?: boolean;
};

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleExpand = (id: number) => {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, expanded: !t.expanded } : t
    ));
  };

  const openAddModal = () => {
    setEditingTaskId(null);
    setNewTitle("");
    setNewDescription("");
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTaskId(task.id);
    setNewTitle(task.title);
    setNewDescription(task.description);
    setIsModalOpen(true);
  };

  const saveTask = () => {
    if (!newTitle.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (editingTaskId !== null) {
      // Editar tarefa existente e atualizar horário
      setTasks(tasks.map((t) =>
        t.id === editingTaskId
          ? {
              ...t,
              title: newTitle,
              description: newDescription,
              updatedAt: currentTime,
            }
          : t
      ));
    } else {
      // Criar nova tarefa
      const newTask: Task = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title: newTitle,
        description: newDescription,
        done: false,
        createdAt: currentTime,
      };
      setTasks([...tasks, newTask]);
    }

    setIsModalOpen(false);
    setNewTitle("");
    setNewDescription("");
    setEditingTaskId(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 relative">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          📌 Minha To-Do List
        </h1>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-3 rounded-xl shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <div>
                    <span
                      className={`block ${
                        task.done
                          ? "line-through text-gray-400"
                          : "text-gray-800 font-medium"
                      }`}
                    >
                      {task.title}
                    </span>

                    <div className="text-xs text-gray-500">
                      Criada às {task.createdAt}
                      {task.updatedAt && (
                        <span className="text-[11px] text-gray-400 ml-2 italic">
                          (editada às {task.updatedAt})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleExpand(task.id)}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    {task.expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <button
                    onClick={() => openEditModal(task)}
                    className="text-green-600 hover:text-green-800 transition-colors"
                  >
                    <Edit3 size={20} />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              {task.expanded && (
                <p className="mt-2 text-gray-600 text-sm border-t border-gray-300 pt-2">
                  {task.description || "Sem descrição."}
                </p>
              )}
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            Nenhuma tarefa por aqui 👀
          </p>
        )}

        <button
          onClick={openAddModal}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors shadow-md"
        >
          <FaPlusCircle size={18} />
          Adicionar Tarefa
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative text-gray-800">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
                {editingTaskId ? "Editar Tarefa ✏️" : "Nova Tarefa 🆕"}
              </h2>

              <input
                type="text"
                placeholder="Título"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-gray-900"
              />

              <textarea
                placeholder="Descrição"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-gray-900"
                rows={3}
              />

              <div className="flex justify-between">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveTask}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                >
                  {editingTaskId ? "Salvar" : "Adicionar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
