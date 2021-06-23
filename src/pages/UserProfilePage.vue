<template>
  <div class="q-pa-xs">
    <q-card flat class="my-card full-width q-px-md">
      <q-img
        src="../statics/no-profile-pic.jpg"
        :ratio="4/5"
        style="height: auto; max-height: 580px"
        >
          <div class="absolute-bottom text-subtitle1 text-center" style="height: 60px">
            <q-chip
              :label="otherUserDetails.online ? 'Online' : 'Offline'"
              :color="otherUserDetails.online ? 'green' : 'grey'"
              class="text-white"
            />
          </div>
        </q-img>
      <q-card-section class="q-pt-md q-pb-sm">
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">User Name: {{ otherUserDetails.name }}</div>
        <div class="text-subtitle2">
          Email: {{ otherUserDetails.email }} <br>
          Joined: {{ otherUserDetails.joined | relativeDate }} ago
        </div>
        <q-card flat v-if="ownUserDetails.userId === this.$route.params.otherUserId">
          <q-input
            v-model="otherUserDetails.status" class="q-mt-sm" label="Status" readonly>
              <template v-slot:append>
                <q-icon name="edit" @click="openDialog" class="cursor-pointer" />
              </template>
          </q-input>
          <q-dialog v-model="editProfileDialog" position="bottom">
            <q-card style="width: 450px">
              <q-form class="q-pa-md" @submit="save">
                <q-input v-model="formData.status" class="q-mt-sm" label="Status" />
                <div class="row">
                  <q-space />
                  <q-btn color="primary" outline flat class="q-mt-md q-mr-sm" label="Cancel" @click="closeDialog" />
                  <q-btn class="q-mt-md" outline flat type="submit" color="primary" label="Save" />
                </div>
              </q-form>
            </q-card>
          </q-dialog>
        </q-card>
      </q-card-section>
      <q-expansion-item
        v-if="ownUserDetails.userId === this.$route.params.otherUserId"
        class="q-pt-sm hidden"
        icon="settings"
        label="Account settings"
        caption="Appearance"
        dense-toggle
      >
        <q-card>
            <q-list class="q-ml-xl" separator>
              <div class="q-ml-md">
                <q-item clickable v-ripple @click="setTheme('true')">
                  <q-item-section>
                    <q-item-label>Dark Mode</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple @click="setTheme('false')">
                  <q-item-section>
                    <q-item-label>Light Mode</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </q-list>
        </q-card>
      </q-expansion-item>

    </q-card>
  </div>
</template>

<script>
import commonMixins from 'src/mixins/commonMixins'
import { cloneDeep } from 'lodash'
import { formatDistance } from 'date-fns'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UserProfilePage',
  mixins: [commonMixins],
  computed: {
    ...mapGetters('chatstore', ['ownUserDetails'])
  },
  filters: {
    relativeDate (value) {
      return formatDistance(value, new Date())
    }
  },
  data () {
    return {
      editProfileDialog: false,
      formData: {
        status: ''
      },
      originFormData: {}
    }
  },
  methods: {
    ...mapActions('chatstore', ['FIREBASE_UPDATE_USER_PROFILE']),
    openDialog () {
      this.editProfileDialog = true
      this.formData.status = cloneDeep(this.otherUserDetails.status)
      this.originFormData = this.formData.status
    },
    closeDialog () {
      this.editProfileDialog = false
    },
    save () {
      const updates = []
      updates.push(this.ownUserDetails.userId)
      updates.push(this.formData.status)
      this.FIREBASE_UPDATE_USER_PROFILE(updates)
      this.closeDialog()
      if (this.originFormData !== this.formData.status) {
        this.$q.notify({ message: 'Status Updated', color: 'primary' })
      }
    }
  }
}
</script>

<style>
@media (prefers-color-scheme: dark) {
  body{
    background: #222222;
  }
  h1 {
    color: #eeeeee;
  }
}
</style>
