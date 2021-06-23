<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions('chatstore', ['HANDLE_AUTH_STATE_CHANGED']),
    ...mapActions('themestore', ['GET_THEME'])
  },
  created () {
  },
  computed: {
    ...mapGetters('themestore', ['appTheme'])
  },
  mounted () {
    this.HANDLE_AUTH_STATE_CHANGED()
  }
}
</script>
