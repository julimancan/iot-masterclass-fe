<template>
  <div>
    <h1>IOT SWITCH</h1>
  </div>
</template>

<script>
export default {
  name: "iotswitch",
  props: ["config"],
  data() {
    return {
      value: true,
    };
  },
  watch: {
    config: {
      immediate: true,
      deep: true,
      handler() {},
    },
  },
  methods: {
    getIconColorClass() {
      !this.value ? "text-dark" : `text-${this.config.class}`;
    },
  },
};
</script>