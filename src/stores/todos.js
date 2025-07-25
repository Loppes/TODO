import { defineStore } from "pinia";
import api from "@/api";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    store_todos: [],
    titleSearch: "",
    statusSearch: [],
    prioritySearch: [],
  }),

  actions: {
    setTitleSearch(value) {
      this.titleSearch = value;
    },

    setStatusSearch(value) {
      this.statusSearch = value;
    },

    setPrioritySearch(value) {
      this.prioritySearch = value;
    },

    async fetchTodos() {
      try {
        const response = await api.get("todos");
        this.store_todos = JSON.parse(JSON.stringify(response.data));
      } catch (err) {
        console.error("Erro ao buscar todos: ", err);
      }
    },

    async createTodo(todo) {
      try {
        todo.index = this.store_todos.length;
        const response = await api.post("todos", todo);
        this.store_todos.push(response.data);
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

    async updateTodo(todo) {
      try {
        todo.updated = new Date();
        const response = await api.put(`todos/${todo.id}`, todo);
        let index = this.store_todos.findIndex((t) => t.id === response.id);
        this.store_todos[index] = todo;
      } catch (err) {
        console.error("Erro ao atualizar todo: ", err);
      }
    },
  },

  getters: {
    filteredTodos: (state) =>
      state.store_todos.filter(
        (e) =>
          (state.statusSearch.length == 0 || state.statusSearch.length == 2  || state.statusSearch.includes(e.status)) &&
          e.title.toLowerCase().includes(state.titleSearch.toLowerCase()) &&
          (state.prioritySearch.length == 0  || state.prioritySearch.includes(e.priority))
      ),
    indexedTodos: (state) =>
      [...state.store_todos].sort((a, b) => {
        if (a.index !== b.index) {
          return a.index - b.index;
        }
        return new Date(b.updated) - new Date(a.updated);
      }),
    reversedTodos: (state) => [...state.store_todos].reverse(),
  },
});
