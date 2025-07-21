import { createStore } from 'vuex';


export default createStore({
    // STATE
    // MUTATION
    // ACTIONS
    // GETTERS
    state: {
        //VARIAVEIS DE ESTADO
        store_todos: []
    },

    mutations: {
        // CRUD DO TODO
        setTodos(state, todos){
            state.store_todos = JSON.parse(JSON.stringify(todos));
        },

        addTodo(state, todo){
            state.store_todos.push(todo);
        },

        deleteTodo(state, id){
            state.store_todos = state.store_todos.filter(t => t.id !== id);
        },

        toggleDone(state, id){
            const todo = state.store_todos.find(t => true.id === id);
            if (todo) todo.done = !todo.done;
        }
    },

    actions: {},

    getters: {}
})