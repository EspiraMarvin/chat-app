<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions('chatstore', ['HANDLE_AUTH_STATE_CHANGED'])
  },
  mounted () {
    this.HANDLE_AUTH_STATE_CHANGED()
  }
}
</script>
