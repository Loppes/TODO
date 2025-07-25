<template>
  <div class="justify-self-center">
    <button
      :disabled="disabled"
      @click="clickButton"
      :class="buttonClass"
    >
      <Icon v-if="icon" :icon="icon" class="mr-2" />
      <slot />
    </button>
  </div>
</template>

<script>

const COLORS = {
  red: 'bg-red-100 text-red-950 hover:bg-red-200',
  blue: 'bg-blue-100 text-blue-950 hover:bg-blue-200',
  sky: 'bg-sky-100 text-sky-950 hover:bg-sky-200',
  gray: 'bg-gray-100 text-gray-950 hover:bg-gray-200',

}

export default {
  props: {
    icon: String,
    disabled: Boolean,
    color: {type: String, default: 'sky'},
  },

  methods: {
    clickButton() {
      if (!this.disabled) {
        this.$emit("click");
      }
    },

    colorTest(){
      return this.color
    }
  },

  computed: {
    buttonClass(){
      return COLORS[this.color] //`bg-${this.color}-100 text-${this.color}-950 hover:bg-${this.color}-200`
    },
  }
};
</script>
