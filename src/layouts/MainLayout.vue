<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- v-go-back.single is the same as v-go-back=" '/' "
          its used to go back to previous route/page-->
        <q-btn
          v-if="$route.fullPath.includes('/chat') || $route.fullPath.includes('/userprofile')"
          v-go-back.single
          icon="arrow_back"
          size="12px"
          flat
          no-caps
          dense
        />
        <q-toolbar-title class="text-center text-subtitle1" @click="checkOtherUserProfile">
          <div class="flex justify-center">
            <q-icon size="sm" name="account_circle" class="q-pr-xs" v-if="$route.fullPath.includes('/chat')" />
            {{ title }}
          </div>
        </q-toolbar-title>
        <q-btn-dropdown
         v-if="$route.fullPath === '/'"
          :label="userDetails.name"
          flat color="white" icon="account_circle" no-caps
        >
          <q-list separator>
            <q-item clickable v-close-popup class="text-center" @click="checkOwnProfile">
            <q-item-section>
              <q-item-label>Update Profile</q-item-label>
            </q-item-section>
          </q-item>
            <q-item clickable v-close-popup @click="LOGOUT_USER" class="text-center">
            <q-item-section>
              <q-item-label>logout</q-item-label>
            </q-item-section>
          </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn
         v-else
          class="absolute-right q-pr-sm float-right"
          :class="userDetails.userId ? 'hidden' : 'hidden'"
          label="Login"
          flat color="white" icon="account_circle"
          no-caps
        >
        </q-btn>
<!--        <q-toggle-->
<!--          v-else-->
<!--          :false-value="this.$q.dark.set(theme)"-->
<!--          :true-value="this.$q.dark.set(theme)"-->
<!--          v-model="theme"-->
<!--          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"-->
<!--          color="black"-->
<!--          size="lg"-->
<!--        />-->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import commonMixins from 'src/mixins/commonMixins.js'

export default {
  mixins: [commonMixins],
  data () {
    return {
      logout: 'logout'
    }
  },
  computed: {
    ...mapState('chatstore', ['userDetails']),
    // eslint-disable-next-line vue/return-in-computed-property
    title () {
      const currentPath = this.$route.fullPath
      if (currentPath === '/') return 'Chat'
      else if (currentPath.includes('/chat')) return this.otherUserDetails.name
      else if (currentPath === '/auth') return 'Login'
    }
  },
  methods: {
    ...mapActions('chatstore', ['LOGOUT_USER']),
    checkOtherUserProfile () {
      const currentPath = this.$route.fullPath
      const otherUserId = this.$route.params.otherUserId
      if (currentPath.includes('/chat')) {
        this.$router.push(`/userprofile/${otherUserId}`)
      }
    },
    checkOwnProfile () {
      this.$router.push(`/userprofile/${this.userDetails.userId}`)
    }
  },
  filters: {
    lowerCase (val) {
      return val.toLowerCase()
    }
  }
}
</script>

<style>
  .q-toolbar q.btn{
    line-height: 1.2
  }
</style>
