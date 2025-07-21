<template>
  <div class="">

    <div class="form mb-4 justify-self-center">
      <div class="">Título</div>
      <input v-model="title" type="text" class="input" />
    </div>

    <customButton icon="mdi:plus" @click="clickAddButton">Adicionar</customButton>
  </div>
</template>

<script>
import customButton from "./CustomButton.vue";
import { mapState, mapMutations } from 'vuex'


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
      });

      this.clearInputs();
    },

    clearInputs() {
      this.title = "";
      this.description = "";
    },
  },

  props: {},

  computed: {
    ...mapState(['store_todos'])
  },

  mounted() {
    this.title = localStorage.getItem("title") || ""
    console.log(mapState(['state_todos']))
  },
};
</script>

<style>

</style>
