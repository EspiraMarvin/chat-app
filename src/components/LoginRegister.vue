<template>
    <q-form @submit="submitForm">
      <q-input
        v-if="tab === 'register'"
        v-model="formData.name"
        class="q-mb-md"
        outlined
        label="Name" />
      <q-input
        v-model="formData.email"
        outlined
        class="q-mb-md"
        type="email"
        label="Email" />
      <q-input
        v-model="formData.password"
        outlined
        class="q-mb-md"
        type="password"
        label="Password" />
      <div class="row">
        <q-space />
        <q-btn
          type="submit"
          color="primary"
          :label="tab" />
      </div>
    </q-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginRegister',
  props: ['tab'],
  data () {
    return {
      formData: {
        name: '',
        email: 'espiramarvin@gmail.com',
        password: '12345678'
      }
    }
  },
  methods: {
    ...mapActions('chatstore', ['REGISTER_USER', 'LOGIN_USER']),
    submitForm () {
      if (this.tab === 'login') {
        this.LOGIN_USER(this.formData)
      } else {
        this.REGISTER_USER(this.formData)
      }
    }
  }
}
</script>

<style scoped>

</style>
