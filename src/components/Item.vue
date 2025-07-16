<template>
  <div class="item">
    <input type="checkbox" v-model="item.status" />
    <div>
      <h1 v-if="!isEditing" class="label-title" :class="through">
        {{ item.title }}
      </h1>
      <input type="text" v-model="item.title" v-if="isEditing" />
    </div>
    <button v-if="!isEditing" @click="clickEditButton(index)">✏️</button>
    <button v-if="isEditing" @click="clickSaveButton(index)">💾</button>
    <button @click="clickDeleteButton(index)">❌</button>
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

  emits: ["editItem"],

  props: {
    item: Object,
    modelValue: Object,
  },

  methods: {
    clickEditButton(index) {
      this.$emit("editItem");
      this.isEditing = true;
    },

    clickDeleteButton(index) {
      this.$emit("deleteItem", this.item);
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
.item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.through {
  text-decoration: line-through;
}
</style>
