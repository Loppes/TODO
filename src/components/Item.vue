<template>
  <div class="select-none shadow mb-4 p-4 m-4 rounded bg-gray-200" :class="through">
    <div class="flex mb-4">
      <input class="mr-4 cursor-pointer" type="checkbox" v-model="item.status" />
      <div class="">
        <div v-show="!isEditing" class="font-medium" :class="throughTitle">
          {{ item.title }}
        </div>
        <input class="input" v-show="isEditing" v-model="item.title" />
      </div>
    </div>

    <div class="flex">
      <custom-button
        icon="mdi:content-save"
        class="mr-3"
        v-show="isEditing"
        @click="clickSaveButton"
      >
        Salvar
      </custom-button>

      <custom-button
        :disabled="throughButton"
        class="mr-3"
        v-show="!isEditing"
        icon="mdi:edit"
        @click="clickUpdateButton()"
      >
        Update
      </custom-button>

      <custom-button @mouseup="clickDeleteButton" icon="mdi:trash">Delete</custom-button>
    </div>
  </div>
</template>

<script>
import customButton from "./CustomButton.vue";
import { useTodoStore } from "@/stores/todos";

export default {
  components: {
    customButton,
  },
  name: "Item",

  data() {
    return {
      isEditing: false,
    };
  },

  computed: {
    through() {
      return this.item.status ? "bg-gray-100 text-gray-400" : "";
    },
    throughTitle() {
      return this.item.status ? "line-through" : "";
    },
    throughButton() {
      return this.item.status;
    },
  },

  emits: ["update", "delete"],

  props: {
    item: Object,
  },

  methods: {
    clickUpdateButton() {
      this.$emit("update");
      this.isEditing = true;
    },
    clickDeleteButton() {
      this.$emit("delete");
    },
    clickSaveButton() {
      const store = useTodoStore();
      store.updateTodo(this.item)
      this.isEditing = false;
    },
  },
};
</script>

<style scoped></style>
