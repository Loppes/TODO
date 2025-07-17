<template>
  <div class="">
    <div>
      <div class="
      text-2xl 
      justify-self-center
      p-4
      font-bold
      ">To-do List</div>
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

<style>

</style>
