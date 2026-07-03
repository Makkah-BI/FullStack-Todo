export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string | null;
}
