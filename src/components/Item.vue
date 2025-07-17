<template>
  <div class="shadow-md mb-4 p-4 m-4 rounded-lg flex justify-between border-gray-100 border-2 transition duration-300 hover:shadow-lg" :class="through">
    <div class="flex items-center" :class="throughText">
        <input class="mr-4 cursor-pointer w-6 h-6 border-gray-300 rounded-md border-2 checked:bg-sky-300 transition duration-400 " type="checkbox" v-model="item.status" />
      <div>
        <div v-if="!isEditing" class="font-medium" >
          {{ item.title }}
        </div>
        <input type="text" v-model="item.title" v-if="isEditing" class="input-text" />
      </div>
    </div>
    
    <div class="flex justify-end">
      <CustomButton class="mr-3" :disabled="item.status" v-if="!isEditing"  @click="clickEditButton(index)" icon="mdi:pencil">Editar</CustomButton>
      <CustomButton class="mr-3" v-if="isEditing" @click="clickSaveButton(index)" icon="mdi:content-save">Salvar</CustomButton>
      <CustomButton class="mr-3" @click="clickDeleteButton(index)" icon="mdi:delete">Excluir</CustomButton>
    </div>
    
  </div>
</template>

<script>
import CustomButton from './CustomButton.vue'

export default {
  name: "Item",
  components: {
    CustomButton,
  },
  data() {
    return {
      isEditing: false,
    };
  },

  computed: {
    through() {
      return this.item.status ? "bg-gray-200 border-gray-200 text-gray-500" : "";
    },
    throughText() {
      return this.item.status ? "line-through" : "";
    }
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

