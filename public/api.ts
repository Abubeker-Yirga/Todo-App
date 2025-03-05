import { ITasks } from "./types/tasks";

const baseUrl = 'http://localhost:3001/tasks';
export const getAllTodos = async (): Promise<ITasks[]> => {
    try {
        const res = await fetch(baseUrl, {
            cache: 'no-store'
        });
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

export const addTodo = async (todo: ITasks): Promise<ITasks | null> => {
    try {
        const res = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const newTodo = await res.json();
        return newTodo;
    } catch (error) {
        console.error("Failed to add todo:", error);
        return null; // Correctly return null
    }
}


export const editTodo = async (todo: ITasks): Promise<ITasks | null> => {
    try {
        const res = await fetch(`${baseUrl}/${todo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const updatedTodo = await res.json();
        return updatedTodo;
    } catch (error) {
        console.error("Failed to edit todo:", error);
        return null; // Correctly return null
    }
}


export const deleteTodo = async (id: string): Promise<void | null> => {
    try {
            await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
        });

    } catch (error) {
        console.error("Failed to delete todo:", error);
        return null; // Correctly return null
    }
}