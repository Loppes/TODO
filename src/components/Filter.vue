<template>
  <div class="flex justify-between px-10">
    <div class="w-1/4">
      <input class="input" placeholder="Pesquisa" v-model="titleSearch" />
    </div>

    <div class="gap-5 px-2 flex">
      <div v-for="(item, index) in statusEnum">
        <input
          type="checkbox"
          :id="`radio${index}`"
          v-model="statusSearch"
          :value="item.key"
          >
            <label :for="`radio${index}`">{{ item.value }}</label>
        </input>
      </div>
    </div>

    <div class="gap-5 px-2 flex">
      <div v-for="(item, index) in priorityEnum">
        <input
          type="checkbox"
          :id="`radioPriority${index}`"
          v-model="prioritySearch"
          :value="item.key"
        >
          <label :for="`radioPriority${index}`">{{ item.value }}</label>
        </input>
      </div>
    </div>
  </div>
</template>

<script>
import { useTodoStore } from "@/stores/todos";
import {PRIORITY_ENUM, STATUS_ENUM} from "@/enums.js"


export default {
  data() {
    return {
      statusSearch: [1,2],
      prioritySearch: [],
      titleSearch: "",
      statusEnum: [
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
    titleSearch(value) {
      localStorage.setItem("titleSearch", JSON.stringify(value));
      this.storeTodos.setTitleSearch(value);
    },

    statusSearch(value) {
      localStorage.setItem("statusSearch", JSON.stringify(value));
      this.storeTodos.setStatusSearch(value);
    },

    prioritySearch(value) {
      localStorage.setItem("prioritySearch", JSON.stringify(value));
      this.storeTodos.setPrioritySearch(value);
    },
  },

  computed: {
    storeTodos() {
      const store = useTodoStore();
      return store;
    },
  },

  mounted(){
      this.statusSearch = JSON.parse(localStorage.getItem("statusSearch")) || [];
      this.prioritySearch = JSON.parse(localStorage.getItem("prioritySearch")) || []
      this.titleSearch = JSON.parse(localStorage.getItem("titleSearch")) || ""
  }
};
</script>
