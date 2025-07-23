<template>
  <div class="">
    <div>
      <div class="text-2xl justify-self-center p-4 font-bold">To-do List</div>
      <AddItems @addItem="onAddItem" />
      <div v-if="isLoading" class="p-8 font-bold">Carregando...</div>
      <TransitionGroup name="list" tag="ul" id="items" ref="sortableList">
        <li class="cursor-move" v-for="(item, index) in indexedTodos" :key="item.id">
          <Item
            @update="onUpdate(index)"
            @delete="onDelete(item)"
            :item="item"
          />
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
import AddItems from "@/components/AddItems.vue";
import { useTodoStore } from "@/stores/todos";
import api from "@/api";

import Sortable from 'sortablejs';

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

  computed: {
    storeTodos(){
      const store = useTodoStore();
      return store
    },

    indexedTodos(){
      return this.storeTodos.indexedTodos
    }
  },

  methods: {
    onAddItem(item) {
      this.storeTodos.createTodo(item);
    },

    onUpdate(newIndex, oldIndex) {
      this.storeTodos.switchTodoItems(newIndex, oldIndex)
    },

    onDelete(item) {
      this.storeTodos.deleteTodo(item.id);
    },
  },

  mounted() {
    var el = document.getElementById('items');
    var sortable = Sortable.create(el, {
      onUpdate:(value) => {
        this.onUpdate(value.newIndex, value.oldIndex)
      }
    });

    this.isLoading = true;
    this.storeTodos.fetchTodos().finally(() => (this.isLoading = false));
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
