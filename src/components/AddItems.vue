<template>
  <div>
    <div class="form m-4 justify-self-center">
      <div>Título:</div>
      <input v-model="title" type="text" class="input-text" />
    </div>

    <customButton @click="clickAddButton" icon="mdi:plus">Adicionar</customButton>
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

<!-- <style>
.form {
  display: flex;
  margin-bottom: 10px;
}
</style> -->
