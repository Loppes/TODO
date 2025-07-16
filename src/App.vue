<template>
  <div class="Todo">
    {{  todos }}
    <div>
      <h1>To-do</h1>
      <AddItems @addItem="onAddItem" />

      <div v-for="(item, index) in todos">
        <Item 
          @update="onUpdate(index)"
          @delete="onDelete(index)" 
          :item="item" />
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
      newTask: "",
      isEditing: false,
      editTaskIndex: null,

    };
  },

  methods: {
    onAddItem(item) {
      console.log(item);
      this.todos.push(item);
    },


    onUpdate(value){
      console.log(value)
      this.isEditing = true
      this.editTaskIndex = value
    },

    onDelete(index){
      this.todos.splice(index, 1)
    }

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
