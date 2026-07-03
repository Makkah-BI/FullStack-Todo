import { Request, Response } from "express";
import {
  createTodoService,
  getTodosService,
  updateTodoService,
  deleteTodoService,
  toggleTodoService,
} from "../services/todoService";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const userId = (req as any).user.id;

    const todo = await createTodoService(
      title,
      description,
      priority,
      dueDate,
      userId,
    );

    res.status(201).json(todo);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const todos = await getTodosService(userId);

    res.status(200).json(todos);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const todoId = req.params.id as string;
    const userId = (req as any).user.id;

    const { title, description, priority, dueDate, completed } = req.body;

    const updatedTodo = await updateTodoService(
      todoId,
      title,
      description,
      priority,
      dueDate,
      completed,
      userId,
    );

    res.status(200).json(updatedTodo);
  } catch (error: any) {
    if (error.message === "Todo not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.message === "Forbidden") {
      return res.status(403).json({
        message: error.message,
      });
    }

    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todoId = req.params.id as string;
    const userId = (req as any).user.id;

    await deleteTodoService(todoId, userId);

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error: any) {
    if (error.message === "Todo not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.message === "Forbidden") {
      return res.status(403).json({
        message: error.message,
      });
    }

    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const toggleTodo = async (req: Request, res: Response) => {
  try {
    const todo = await toggleTodoService(req.params.id as string);

    res.status(200).json(todo);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(400).json({
      message,
    });
  }
};
