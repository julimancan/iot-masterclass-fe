<template>
  <card>
    <div slot="header">
      <h4 class="card-title">
        {{ config.selectedDevice.name }} -
        {{ config.variableFullName }}
      </h4>
    </div>
    <i
      class="fa"
      :class="[config.icon, getIconColorClass()]"
      style="font-size: 3rem"
    ></i>

    <BaseButton
      :type="config.class"
      class="mb-3 pull-right"
      size="lg"
      @click="sendValue()"
    >
      Add
    </BaseButton>
  </card>
</template>

<script>
export default {
  props: ["config"],
  data() {
    return {
      sending: false,
    };
  },

  methods: {
    sendValue() {
      this.sending = true;

      setTimeout(() => {
        this.sending = false;
      }, 400);

      const dataToSend = {
        topic: `${this.config.userId}/${this.config.selectedDevice.dId}/${this.config.variable}/actdata`,
        message: {
          value: this.config.message,
        },
      };
      console.log(`dataToSend`, dataToSend);
      this.$nuxt.$emit("mqtt-sender", dataToSend);
    },
    getIconColorClass() {
      !this.value ? "text-dark" : `text-${this.config.class}`;
    },
  },
};
</script>