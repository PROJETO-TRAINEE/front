'use client'

import React, { useState } from "react";
import { Trash2 } from "lucide-react"; 
import { FaPlusCircle } from "react-icons/fa";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Estudar React", done: false },
    { id: 2, text: "Fazer exercícios de lógica", done: false },
    { id: 3, text: "Criar layout no Figma", done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = () => {
    const newTask: Task = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      text: "Nova Tarefa",
      done: false,
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          📌 Minha To-Do List
        </h1>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-3 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span
                  className={`${
                    task.done
                      ? "line-through text-gray-400"
                      : "text-gray-800 font-medium"
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            Nenhuma tarefa por aqui 👀
          </p>
        )}

        <button
          onClick={addTask}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors shadow-md"
        >
          <FaPlusCircle size={18} />
          Adicionar Tarefa
        </button>
      </div>
    </div>
  );
}
