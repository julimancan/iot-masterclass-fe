<template>
  <div class="container login-page">
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <card class="card-login card-white">
        <template>
          <img src="img//card-primary.png" alt="" />
          <h1 class="card-title">IoT GL</h1>
        </template>
        <div>
          <base-input
            name="name"
            v-model="user.name"
            placeholder="Name"
            addon-left-icon="tim-icons icon badge"
          />
          <base-input
            name="email"
            v-model="user.email"
            placeholder="Email"
            addon-left-icon="tim-icons icon badge"
          />
          <base-input
            name="password"
            v-model="user.password"
            placeholder="Password"
            addon-left-icon="tim-icons icon badge"
          />
        </div>
        <div slot="footer">
          <base-button
            native-type="submit"
            type="primary"
            class="mb-3"
            size="lg"
            @click="register"
            block
          >
            Register
          </base-button>
          <div class="pull-right">
            <h6><a href="#help!!!" class="link footer-link">Need Help?</a></h6>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/Inputs/BaseInput.vue';
export default {
  components: { BaseInput, BaseButton },
  layout: "auth",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
};
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 0.5rem;
}
</style>