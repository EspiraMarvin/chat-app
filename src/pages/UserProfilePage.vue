<template>
  <div class="q-pa-md  items-start" v-if="this.ownUserDetails.userId === this.$route.params.otherUserId">
    <q-card flat class="my-card full-width q-px-md">
      <q-img
          src="../statics/no-profile-pic.jpg"
          :ratio="4/5"
          style="height: auto; max-height: 600px"
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
        <div class="text-subtitle2">User Name: {{ otherUserDetails.name }}</div>
        <div class="text-caption">Email: {{ otherUserDetails.email }}</div>
        <div class="text-caption">Joined: {{ otherUserDetails.joined | relativeDate }}</div>
        <q-card flat>
          {{ userD }}
          <q-input
            v-model="otherUserDetails.status" class="q-mt-sm" label="Status" readonly>
              <template v-slot:append v-if="ownUserDetails.userId === this.$route.params.otherUserId">
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
  mounted () {
  },
  computed: {
    ...mapGetters('chatstore', ['users', 'ownUserDetails', 'ownUserDt', 'otherUserDt']),
    // ...mapState('chatstore', ['users', 'userDetails'])
    userD () {
      // ownUserDt.keys("status")[0]
      return this.ownUserDt
    }
  },
  filters: {
    relativeDate (value) {
      return formatDistance(value, new Date())
    }
  },
  data () {
    return {
      editProfileDialog: false,
      disable: true,
      formData: {
        status: ''
      }
    }
  },
  methods: {
    ...mapActions('chatstore', ['FIREBASE_UPDATE_USER_PROFILE']),
    openDialog () {
      this.editProfileDialog = true
      this.formData.status = cloneDeep(this.otherUserDetails.status)
      console.log('this.otherUserDetails.status', this.otherUserDetails)
      console.log('this.ownUserDetails.status', this.ownUserDetails.userId)
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
    }
  }
}
</script>

<style scoped>

</style>
