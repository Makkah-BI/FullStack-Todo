import { useEffect, useState } from "react";
import api from "../services/api";
import type { Todo } from "../types/todo";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description || "");
    setPriority(todo.priority);
    setDueDate(todo.dueDate ? todo.dueDate.split("T")[0] : "");
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);

        setTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const createTodo = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/todos",
        {
          title,
          description,
          priority,
          dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      setTodos((prev) => [...prev, response.data]);

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDate("");
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.put(
        `/todos/${editingId}`,
        {
          title,
          description,
          priority,
          dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const updatedTodo = response.data;

      setTodos((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
      );

      setEditingId(null);
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDate("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.patch(
        `/todos/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const updatedTodo = response.data;

      setTodos((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
      );
    } catch (error) {
      console.log(error);
    }
  };
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase()),
  );

  const getDueDateStatus = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    if (due < today) {
      return "OVERDUE";
    }

    if (due.getTime() === today.getTime()) {
      return "TODAY";
    }

    return "UPCOMING";
  };

  return (
    //<div className="min-h-screen bg-gray-100 py-10 px-4">
    <div
      className={`min-h-screen py-10 px-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1
            className={`text-4xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            My Todos
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Form */}
        <div
          className={`p-6 rounded-2xl shadow-md mb-8 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? "Update Todo" : "Add New Todo"}
          </h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
            rows={4}
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")
            }
            className={`w-full border rounded-lg p-3 mb-4 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`w-full border rounded-lg p-3 mb-4 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
          />

          <button
            onClick={editingId ? updateTodo : createTodo}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {editingId ? "Update Todo" : "Add Todo"}
          </button>
        </div>

        {/* Todos */}
        <input
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full border rounded-lg p-3 mb-6 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300"
          }`}
        />
        <div className="space-y-4">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`p-5 rounded-2xl shadow-md ${
                darkMode ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="mt-1 h-5 w-5"
                  />

                  <div>
                    <h3
                      className={`text-xl font-semibold ${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.title}
                    </h3>

                    <p className="text-gray-600 mt-1">{todo.description}</p>
                    <p
                      className={`text-sm font-semibold mt-2 ${
                        todo.priority === "HIGH"
                          ? "text-red-500"
                          : todo.priority === "MEDIUM"
                            ? "text-yellow-500"
                            : "text-green-500"
                      }`}
                    >
                      {todo.priority}
                    </p>
                    {todo.dueDate && (
                      <p
                        className={`text-sm mt-2 ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Due: {new Date(todo.dueDate).toLocaleDateString()}
                      </p>
                    )}

                    {todo.dueDate && (
                      <p
                        className={`text-sm font-semibold mt-1 ${
                          getDueDateStatus(todo.dueDate) === "OVERDUE"
                            ? "text-red-500"
                            : getDueDateStatus(todo.dueDate) === "TODAY"
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      >
                        {getDueDateStatus(todo.dueDate)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(todo)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
