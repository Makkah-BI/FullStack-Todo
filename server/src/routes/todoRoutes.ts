import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  toggleTodo,
} from "../controllers/todoController";

const router = Router();

router.post("/", protect, createTodo);
router.get("/", protect, getTodos);
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);
router.patch("/:id/toggle", protect, toggleTodo);

export default router;
