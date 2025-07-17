<template>
  <div>
    <div class="form mb-4 justify-self-center">
      <div class="">Título</div>
      <input v-model="title" type="text" class="input" />
    </div>

    <customButton icon="mdi:plus" @click="clickAddButton">Adicionar</customButton>
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

  methods: {
    clickAddButton() {
      if (this.title == "") {
        return;
      }

      this.$emit("addItem", {
        title: this.title,
        description: this.description,
        status: false,
      });

      this.clearInputs();
    },

    clearInputs() {
      this.title = "";
      this.description = "";
    },
  },

  props: {},

  mounted() {},
};
</script>

<style>

</style>
