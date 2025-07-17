<template>
  <div class="flex justify-center">
    <button @click="clickButton" :disabled="disabled">
      <div class="flex items-center">
        <Icon v-if="icon" :icon="icon" />
        <slot></slot>
      </div>
  </button>
  </div>

</template>

<script>
export default {
  props: {
    icon: String,
    disabled: Boolean,
  },

  methods: {
    clickButton() {
      this.$emit("click");
    },
  },
};
</script>

