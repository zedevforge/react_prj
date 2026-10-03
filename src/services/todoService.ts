import { BASE_URL } from "../constants";
import type {CreateTodoData,Todo,TodosResponse} from "../types/todo";


//getTodos
export const getTodos = async (): Promise<TodosResponse> => {
  const response = await fetch(`${BASE_URL}/todos`);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
};

//createTodo
export const createTodo = async (data: CreateTodoData): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/todos/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return response.json();
};

//updateTodo
export const updateTodo = async (
  id: number,
  data: CreateTodoData
): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
};

//deleteTodo
export const deleteTodo = async (
  id: number
): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }

  return response.json();
};