<template>
  <div class="">
    <div>
      <div class="text-2xl font-bold justify-self-center p-4 font-medium">To-do List</div>

      <AddItems @addItem="onAddItem" />

      <div v-for="(item, index) in todos">
        <Item @editItem="onEditItem(index)" @deleteItem="onDeleteItem(index)" :item="item" />
      </div>
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
    };
  },

  methods: {
    onAddItem(item) {
      this.todos.push(item);
    },
    onEditItem(index) {
      this.editingIndex = index;
      this.isEditing = true;
    },
    onDeleteItem(index) {
      if (confirm("Tem certeza que deseja excluir este item?")) {
        this.todos.splice(index, 1);
      }
    },
  },
};
</script>
<!-- 
<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.Todo {
  display: flex;
  margin: 30% 30%;
}
</style> -->
