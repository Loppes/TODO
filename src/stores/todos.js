import { defineStore } from "pinia";
import api from "@/api";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    store_todos: [],
    titleSearch: "",
    statusSearch: null,
    prioritySearch: null,
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
        const response = await api.put(`todos/${todo.id}`, todo);
        let index = this.store_todos.findIndex((t) => t.id === response.id);
        this.store_todos[index] = todo;
      } catch (err) {
        console.error("Erro ao atualizar todo: ", err);
      }
    },

    async switchTodoItems(item) {
      // try {
      //   let todo = this.store_todos.find((t) => t.index === oldIndex);
      //   let todo2 = this.store_todos.find((t) => t.index === newIndex);
      //   todo.index = newIndex;
      //   todo2.index = oldIndex;
      //   await api.put(`todos/${todo.id}`, todo);
      //   await api.put(`todos/${todo2.id}`, todo2);
      // } catch (err) {
      //   console.error("Erro ao atualizar todo: ", err);
      // }
    },
  },

  getters: {
    filteredTodos: (state) =>
      state.store_todos.filter(
        (e) =>
          (state.statusSearch === null || e.status === state.statusSearch) &&
          e.title.toLowerCase().includes(state.titleSearch.toLowerCase()) &&
          (state.prioritySearch === null || e.priority === state.prioritySearch)
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
