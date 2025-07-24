<template>
  <div class="flex justify-between">
    <div class="w-1/4">
      <input class="input" placeholder="Pesquisa" v-model="titleSearch" />
    </div>

    <!-- <select v-model="statusSearch" class="px-2">
      <option v-for="item in statusEnum" :value="item.key">
        {{ item.value }}
      </option>
    </select> -->

    <div class="px-2 flex">
      <div class="pr-2" v-for="(item, index) in statusEnum">
        <input
          type="radio"
          :id="`radio${index}`"
          v-model="statusSearch"
          :value="item.key"
        />
        <label for="`radio${index}`">{{ item.value }}</label>
      </div>
    </div>

    <div class="px-2 flex">
      <div class="pr-2">
        <input
          type="radio"
          id="radioPriority999"
          v-model="prioritySearch"
          :value="null"
        />
        <label for="radioPriority999">Todos</label>
      </div>
      <div class="pr-2" v-for="(item, index) in priorityEnum">
        <input
          type="radio"
          :id="`radioPriority${index}`"
          v-model="prioritySearch"
          :value="item.key"
        />
        <label :for="`radioPriority${index}`">{{ item.value }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { useTodoStore } from "@/stores/todos";

const STATUS_ENUM = {
  ALL: 0,
  NOT_DONE: 1,
  DONE: 2,
};

const PRIORITY_ENUM = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
};

export default {
  data() {
    return {
      statusSearch: 0,
      prioritySearch: null,
      titleSearch: "",
      statusEnum: [
        { key: STATUS_ENUM.ALL, value: "Todos" },
        { key: STATUS_ENUM.NOT_DONE, value: "Nao Realizados" },
        { key: STATUS_ENUM.DONE, value: "Realizados" },
      ],

      priorityEnum: [
        { key: PRIORITY_ENUM.LOW, value: "Baixo" },
        { key: PRIORITY_ENUM.MEDIUM, value: "Medio" },
        { key: PRIORITY_ENUM.HIGH, value: "Alto" },
      ],
    };
  },

  watch: {
    statusSearch(value) {
      switch (value) {
        case STATUS_ENUM.ALL:
          this.storeTodos.setStatusSearch(null);
          break;
        case STATUS_ENUM.NOT_DONE:
          this.storeTodos.setStatusSearch(false);
          break;
        case STATUS_ENUM.DONE:
          this.storeTodos.setStatusSearch(true);
          break;
      }
    },

    prioritySearch(value) {
      console.log(value);
      this.storeTodos.setPrioritySearch(value);
    },

    titleSearch(value) {
      this.storeTodos.setTitleSearch(value);
    },
  },

  computed: {
    storeTodos() {
      const store = useTodoStore();
      return store;
    },
  },

  methods: {
    updateTitleSearch(value) {
      this.storeTodos.setTitleSearch(value);
    },
  },
};
</script>
