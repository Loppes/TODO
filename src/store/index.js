import { createStore } from "vuex";
import api from "@/api";

export default createStore({
  // STATE
  // MUTATION
  // ACTIONS
  // GETTERS
  state: {
    //VARIAVEIS DE ESTADO
    store_todos: [],
  },

  mutations: {
    // CRUD DO TODO
    setTodos(state, todos) {
      state.store_todos = JSON.parse(JSON.stringify(todos));
    },

    addTodo(state, todo) {
      state.store_todos.push(todo);
    },

    updateTodo(state, todo){
      let index = state.store_todos.findIndex(t => t.id === todo.id);
      state.store_todos[index] = todo;
    },

    deleteTodo(state, id) {
      state.store_todos = state.store_todos.filter((t) => t.id !== id);
    },

    toggleDone(state, id) {
      const todo = state.store_todos.find((t) => true.id === id);
      if (todo) todo.done = !todo.done;
    },
  },

  actions: {
    async fetchTodos({ commit }) {
      try {
        const response = await api.get("todos");
        commit("setTodos", response.data);
      } catch (err) {
        console.error("Erro ao buscar todos: ", err);
      }
    },

    async createTodo({ commit }, todo) {
      try {
        const response = await api.post("todos", todo);
        commit("addTodo", response.data);
      } catch (err) {
        console.error("Erro ao buscar todos: ", err);
      }
    },

    async deleteTodo({ commit }, id) {
      try {
        const response = await api.delete(`todos/${id}`);
        commit("deleteTodo", id);
      } catch (err) {
        console.error("Erro ao buscar todos: ", err);
      }
    },

    async updateTodo({ commit }, todo) {
      try {
        const response = await api.put(`todos/${todo.id}`, todo);
        commit("updateTodo", response.data);
      } catch (err) {
        console.error("Erro ao buscar todos: ", err);
      }
    },

  },

  getters: {
    reversedTodos(state){
        return [...state.store_todos].reverse()
    }
  },
});
