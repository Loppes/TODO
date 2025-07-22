<template>
  <div class="">
    <div>
      <div class="text-2xl justify-self-center p-4 font-bold">To-do List</div>
      <AddItems @addItem="onAddItem" />
      <div v-if="isLoading" class="p-8 font-bold">Carregando...</div>
      <TransitionGroup name="list" tag="ul">
        <div v-for="(item, index) in reversedTodos" :key="item.id">
          <Item
            @update="onUpdate(index)"
            @delete="onDelete(item)"
            :item="item"
          />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
import AddItems from "@/components/AddItems.vue";

import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

import api from "@/api";

export default {
  components: {
    Item,
    AddItems,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  watch: {
    todos: {
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
      deep: true,
    },
  },

  methods: {
    ...mapMutations(["toggleDone", "deleteTodo", "setTodos", "addTodo"]),
    ...mapActions(['createTodo', 'fetchTodos', 'deleteTodo']),


    onAddItem(item) {
      this.createTodo(item);
    },

    onUpdate(value) {
    },

    onDelete(item) {
      this.deleteTodo(item.id)
    },
  },

  mounted() {
    this.isLoading = true;
    this.fetchTodos().finally(() => (this.isLoading = false));
  },

  computed: {
    ...mapState(["store_todos"]),
    ...mapGetters(['reversedTodos'])
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
