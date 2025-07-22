import { defineStore } from "pinia";
import api from "@/api";

export const useTodoStore = defineStore( 'todo', {
  state: () => ({
    store_todos: []
  }),

  actions: {
    async fetchTodos() {
      try {
        const response = await api.get("todos");
        this.store_todos = JSON.parse(JSON.stringify(response.data))
      } catch (err) {
        console.error("Erro ao buscar todos: ", err);
      }
    },

    async createTodo(todo) {
      try {
        const response = await api.post("todos", todo);
        this.store_todos.push(response.data)
      } catch (err) {
        console.error("Erro ao criar todo: ", err);
      }
    },

    async deleteTodo(id) {
      try {
        const response = await api.delete(`todos/${id}`);
        this.store_todos = this.store_todos.filter((t) => t.id !== id);
      } catch (err) {
        console.error("Erro ao deletar todo: ", err);
      }
    },

    async updateTodo( todo) {
      try {
        const response = await api.put(`todos/${todo.id}`, todo);
        let index = this.store_todos.findIndex(t => t.id === response.id);
        this.store_todos[index] = todo;
      } catch (err) {
        console.error("Erro ao atualizar todo: ", err);
      }
    },
  },

  getters: {
    reversedTodos: (state) => [...state.store_todos].reverse()
  },
});
