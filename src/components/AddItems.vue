<template>
  <div class="">

    <div class="form mb-4 justify-self-center">
      <input v-model="title" placeholder="Titulo" type="text" class="input" />
    </div>

    <customButton color="sky" icon="mdi:plus" @click="clickAddButton">Adicionar</customButton>
  </div>
</template>

<script>
import customButton from "./CustomButton.vue";

export default {
  components: {
    customButton,
  },
  data() {
    return {
      title: "",
      description: "",
    };
  },

  emits: ["addItem"],

  watch: {
    title() {
      localStorage.setItem("title", this.title);
    },
  },

  methods: {
    clickAddButton() {
      if (this.title == "") {
        return;
      }

      this.$emit("addItem", {
        title: this.title,
        description: this.description,
        status: false,
        priority: 0,
        updated: new Date(),
      });

      this.clearInputs();
    },

    clearInputs() {
      this.title = "";
      this.description = "";
    },
  },

  mounted() {
    this.title = localStorage.getItem("title") || ""
  },
};
</script>

<style>

</style>
