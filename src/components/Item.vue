<template>
  <div
    class="select-none shadow mb-4 p-4 m-4 rounded"
    :class="[through, priorityClass]"
  >
    <div class="flex mb-4">
      <input
        @change="handleInputChange"
        class="mr-4 cursor-pointer"
        type="checkbox"
        v-model="item.status"
      />
      <div class="">
        <div v-show="!isEditing" class="font-medium" :class="throughTitle">
          {{item.index}} - {{ item.title }}
        </div>
        <input class="input" v-show="isEditing" v-model="item.title" />
      </div>
    </div>

    <div class="flex justify-between">
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

        <custom-button @mouseup="clickDeleteButton" icon="mdi:trash"
          >Delete</custom-button
        >
      </div>

      <div class="flex">
        <custom-button
          v-for="(item, index) in priorityEnum"
          :icon="`mdi:signal-cellular-${index + 1}`"
          class="mr-3"
          @click="clickChangePriorityButton(item.key)"
          :color="item.color"
        >
          {{ item.value }}
        </custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import customButton from "./CustomButton.vue";
import { useTodoStore } from "@/stores/todos";
const PRIORITY_ENUM = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
};

export default {
  components: {
    customButton,
  },
  name: "Item",

  data() {
    return {
      isEditing: false,
      priorityEnum: [
        { key: PRIORITY_ENUM.LOW, value: "Baixo", color: "gray" },
        { key: PRIORITY_ENUM.MEDIUM, value: "Medio", color: "blue" },
        { key: PRIORITY_ENUM.HIGH, value: "Alto", color: "red" },
      ],
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
    storeTodos() {
      const store = useTodoStore();
      return store;
    },
    priorityClass() {
      const temp = {
        2: "bg-red-50",
        1: "bg-blue-50",
        0: "bg-gray-50",
      };

      return temp[this.item.priority]
    },
  },

  emits: ["update", "delete"],

  props: {
    item: Object,
  },

  methods: {
    handleInputChange() {
      this.storeTodos.updateTodo(this.item);
    },

    clickChangePriorityButton(priority){
      this.item.priority = priority;
      this.storeTodos.updateTodo(this.item);
    },

    clickUpdateButton() {
      this.$emit("update");
      this.isEditing = true;
    },
    clickDeleteButton() {
      this.$emit("delete");
    },
    clickSaveButton() {
      this.storeTodos.updateTodo(this.item);
      this.isEditing = false;
    },
  },
};
</script>

<style scoped></style>
