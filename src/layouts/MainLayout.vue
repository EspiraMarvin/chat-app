<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- prop of flat removes border in the back button below -->
        <!-- prop of dense makes button smaller -->
        <!-- v-go-back.single is the same as v-go-back=" '/' "
          its used to go back to previous route/page-->
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          v-go-back.single
          icon="arrow_back"
          flat
          dense
          label="Back" />
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn
          v-if="!userDetails.userId"
          to="/auth"
          class="absolute-right q-pr-sm"
          no-caps
          icon="account_circle"
          flat
          dense
          label="Login" />

        <q-btn
          v-else
          @click="LOGOUT_USER"
          class="absolute-right q-pr-sm"
          no-caps
          icon="account_circle"
          flat
          dense
          >
          logout<br>
          {{userDetails.name}}
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import mixinsOtherUserDetails from 'src/mixins/mixins-other-user-details.js'

export default {
  mixins: [mixinsOtherUserDetails],
  computed: {
    ...mapState('chatstore', ['userDetails']),
    // eslint-disable-next-line vue/return-in-computed-property
    title () {
      const currentPath = this.$route.fullPath
      if (currentPath === '/') return 'Quasar Chat'
      else if (currentPath.includes('/chat')) return this.otherUserDetails.name
      else if (currentPath === '/auth') return 'Login'
    }
  },
  methods: {
    ...mapActions('chatstore', ['LOGOUT_USER'])
  }
}
</script>

<style>
  .q-toolbar q.btn{
    line-height: 1.2
  }
</style>
