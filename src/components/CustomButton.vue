<template>
  <div class="button" @click="clickButton">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {},

  methods: {
    clickButton() {
      this.$emit("click");
    },
  },
};
</script>

<style>
.button {
  display: inline-block;
  border-radius: 7px;
  border: none;
  background: #0191b6;
  color: white;
  font-family: inherit;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  width: 100%;
  padding: 1em;
  transition: all 0.4s;
  cursor: pointer;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.4s;
}

.button:hover span {
  padding-right: 3.55em;
}

.button:hover span:after {
  opacity: 4;
  right: 0;
}
</style>
