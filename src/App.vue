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
    ...mapActions('chatstore', ['handleAuthStateChanged'])
  },
  mounted () {
    this.handleAuthStateChanged()
  }
}
</script>
