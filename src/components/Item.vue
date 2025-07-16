<template>
  <div class="item">
    <input type="checkbox" v-model="item.status" />
    <div>
      <h1 class="label-title" :class="through">
        {{ item.title }}
      </h1>
    </div>
    <!-- <button @click="clickDeleteButton(index)">Excluir</button> -->
  </div>
</template>

<script>
export default {
  name: "Item",

  computed: {
    through() {
      return this.item.status ? "through" : "";
    },
  },

  props: {
    item: Object,
  },

  methods: {
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
