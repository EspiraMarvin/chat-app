<template>
  <q-page class="flex flex-center q-pa-md">
    <q-card flat>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="red"
        align="justify"
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <login-register :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :tab="tab"/>
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import LoginRegister from '../components/LoginRegister'

export default {
  name: 'AuthPage',
  components: {
    'login-register': LoginRegister
  },
  data () {
    return {
      tab: 'login'
    }
  }
}
</script>

<style scoped>

</style>
