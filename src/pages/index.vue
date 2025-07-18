<template>
  <div class="">
    <div>
      <div class="text-2xl justify-self-center p-4 font-bold">To-do List</div>
      <AddItems @addItem="onAddItem" />

      <TransitionGroup name="list" tag="ul">
        <div v-for="(item, index) in todos" :key="item">
          <Item @update="onUpdate(index)" @delete="onDelete(index)" :item="item" />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
import AddItems from "@/components/AddItems.vue";

export default {
  components: {
    Item,
    AddItems,
  },

  data() {
    return {
      todos: [],
      isEditing: false,
      editTaskIndex: null,
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
    onAddItem(item) {
      this.todos.push(item);
    },

    onUpdate(value) {
      this.isEditing = true;
      this.editTaskIndex = value;
    },

    onDelete(index) {
      this.todos.splice(index, 1);
    },
  },

  mounted() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
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
