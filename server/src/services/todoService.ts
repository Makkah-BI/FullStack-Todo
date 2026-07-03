import prisma from "../config/prisma";

export const createTodoService = async (
  title: string,
  description: string | undefined,
  priority: "LOW" | "MEDIUM" | "HIGH",
  dueDate: string | undefined,
  userId: string,
) => {
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      userId,
    },
  });

  return todo;
};

export const getTodosService = async (userId: string) => {
  const todos = await prisma.todo.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return todos;
};

export const updateTodoService = async (
  todoId: string,
  title: string,
  description: string | undefined,
  priority: "LOW" | "MEDIUM" | "HIGH",
  dueDate: string | undefined,
  completed: boolean | undefined,
  userId: string,
) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id: todoId,
    },
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  if (todo.userId !== userId) {
    throw new Error("Forbidden");
  }

  const updatedTodo = await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: {
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      completed,
    },
  });

  return updatedTodo;
};

export const deleteTodoService = async (todoId: string, userId: string) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id: todoId,
    },
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  if (todo.userId !== userId) {
    throw new Error("Forbidden");
  }

  await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });
};

export const toggleTodoService = async (id: string) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  const updatedTodo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      completed: !todo.completed,
    },
  });

  return updatedTodo;
};
