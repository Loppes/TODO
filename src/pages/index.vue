<template>
  <div class="">
    <div>
      <div class="text-2xl justify-self-center p-4 font-bold">To-Do List</div>
      <AddItems class="mb-4" @addItem="onAddItem" />
      <Filter />

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
import Filter from "@/components/Filter.vue";
import { useTodoStore } from "@/stores/todos";

import Sortable from 'sortablejs';

export default {
  components: {
    Item,
    AddItems,
    Filter
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

    onUpdate(item) {
      item.updated = new Date()
      this.storeTodos.updateTodo(item)
    },

    onDelete(item) {
      this.storeTodos.deleteTodo(item.id);
    },
  },

  mounted() {
    var el = document.getElementById('items');
    var sortable = Sortable.create(el, {

      onUpdate:(value) => {
        let item = this.indexedTodos[value.oldIndex];
        item.index = value.newIndex;
        this.onUpdate(item)
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
