<template>
  <card>
    <template slot="header">
      <h5 class="card-category">
        {{ config.selectedDevice.name }} - {{ config.variableFullName }}
      </h5>
      <h3 class="card-title">
        <i
          class="fa"
          :class="[config.icon, getIconColorClass()]"
          aria-hidden="true"
          style="font-size: 3rem"
        ></i>
        <BaseSwitch
          @click="
            value = !value;
            sendValue();
          "
          :value="value"
          type="primary"
          on-text="ON"
          off-text="OFF"
          style="margin-top: 1rem"
          class="pull-right"
        />
      </h3>
    </template>
  </card>
</template>

<script>
import BaseSwitch from "../BaseSwitch";

export default {
  components: {
    BaseSwitch,
  },
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
      if (!this.value) {
        return "text-dark";
      }
      return `text-${this.config.class}`;
    },

    sendValue() {
      const dataToSend = {
        topic: `${this.config.userId}/${this.config.selectedDevice.dId}/${this.config.variable}/actdata`,
        message: this.value,
      };
      $nuxt.$emit("mqtt-sender", dataToSend);
      console.log(`this.config.class`, this.config.value);
    },
  },
};
</script>