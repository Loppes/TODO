<template>
  <div class="Todo">
    <div>
      <h1>To-do</h1>

      <AddItems @addItem="onAddItem" />

      <div v-for="(item, index) in todos">
        <Item :item="item" />
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
      console.log(item);
      this.todos.push(item);
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
