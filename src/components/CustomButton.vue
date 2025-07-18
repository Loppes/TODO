<template>
  <div class="justify-self-center">
    <button
      :disabled="disabled"
      @click="clickButton"
      class="flex items-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      <Icon v-if="icon" :icon="icon" class="mr-2" />
      <slot />
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
      if (!this.disabled) {
        this.$emit("click");
      }
    }
  }
};
</script>
