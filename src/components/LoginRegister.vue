<template>
  <q-form @submit="submitForm" class="q-mt-xl" style="width: 80vw; height: 70vh">
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
        :type="isPwd ? 'password' : 'text'"
        outlined
        class="q-mb-md"
        label="Password"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
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
        email: 'espira@gmail.com',
        password: '12345678'
      },
      isPwd: true
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
