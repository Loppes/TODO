<template>
  <div class="item">
    <input type="checkbox" v-model="item.status" />
    <div>
      <h1 v-if="!isEditing" class="label-title" :class="through">
        {{ item.title }}
      </h1>
      <input v-else v-model="item.title" />
    </div>
    <button v-if="isEditing" @click="clickSaveButton">Salvar</button>
    <button v-else @click="clickUpdateButton(index)">Update</button>
    <button @click="clickDeleteButton(index)">Delete</button>
    <!-- <button @click="clickDeleteButton(index)">Excluir</button> -->
  </div>
</template>

<script>
export default {
  name: "Item",

  data() {
    return {
      isEditing: false,
    };
  },

  computed: {
    through() {
      return this.item.status ? "through" : "";
    },
  },

  emits: ["update"],

  props: {
    item: Object,
  },

  methods: {
    clickUpdateButton(index) {
      this.$emit("update");
      this.isEditing = true;
    },
    clickDeleteButton(index) {
      this.$emit("delete");
    },

    clickSaveButton(index) {
      this.isEditing = false;
    },

    // clickDeleteButton(index) {
    //   console.log("Excluir Tarefa");
    //   let task = this.todos[index];
    //   if (confirm("Deseja Excluir a tarefa: " + task.title)) {
    //     this.todos.splice(index, 1);
    //   }
    // },
  },
};
</script>

<style scoped>
button {
  border: 1px;
  border-style: solid;
}

.item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.through {
  text-decoration: line-through;
}
</style>
