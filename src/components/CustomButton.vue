<template>
  <div class="justify-self-center">
    <button :disabled="disabled" @click="clickButton">
      <div class="flex items-center">
        <Icon v-if="icon" :icon="icon" class="mr-1" />
        <slot></slot>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    disabled: Boolean
  },

  methods: {
    clickButton() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="css"></style>
