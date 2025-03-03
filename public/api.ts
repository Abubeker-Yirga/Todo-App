import { ITasks } from "./types/tasks";

const baseUrl = 'http://localhost:3001/tasks';
export const getAllTodos = async (): Promise<ITasks[]> => {
    try {
        const res = await fetch(baseUrl);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const todos = await res.json();
        return todos;
    } catch (error) {
        console.error("Failed to fetch todos:", error);
        return [];
    }
}