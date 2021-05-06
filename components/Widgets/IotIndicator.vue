<template>
  <card>
    <div slot="header">
      <h4 class="card-title">
        {{ config.selectedDevice.name }} -
        {{ config.variableFullName }}
      </h4>
    </div>
    <i class="fa" :class="[config.icon, getIconColorClass()]" style="font-size: 3rem"></i>
  </card>
</template>

<script>
export default {
  props: ["config"],
  data() {
    return {
      value: false,
    };
  },

  mounted() {
    const topic = `${this.config.userId}/${this.config.selectedDevice.dId}/${this.config.variable}/sdata`;
    console.log(`topic`, topic)
    this.$nuxt.$on(topic, this.processReceivedData);
  },
  beforeDestroy() {
    const topic = `${this.config.userId}/${this.config.selectedDevice.dId}/${this.config.variable}/sdata`;
    this.$nuxt.$off(topic);
  },
  methods: {
    processReceivedData(data) {
      console.log("received data: ", data)
      this.value = data.value;
    },
    getIconColorClass() {
      if (!this.value) {
        return "text-dark"
      }
        return `text-${this.config.class}`;
    }
  }
};
</script>