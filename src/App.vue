<template>
  <div class="Todo">
    <div>
      <h1>To-do</h1>

      <AddItems @addItem="onAddItem" />

      <div v-for="(item, index) in todos">
        <Item @editItem="onEditItem(index)" @deleteItem="onDeleteItem(index)" :item="item" />
      </div>


      <!--bloco de edicao-->
      <div v-if="isEditing">
        <input type="text" v-model="todos[editingIndex].title" />

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
      isEditing: false,
      editingIndex: null,
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
      this.todos.splice(index, 1);
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.Todo {
  display: flex;
  margin: 30% 30%;
}
</style>
