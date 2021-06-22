export default {
  computed: {
    otherUserDetails () {
      // if user exists return that user details otherwise return an empty object
      if (this.$store.state.chatstore.users[this.$route.params.otherUserId]) {
        return this.$store.state.chatstore.users[this.$route.params.otherUserId]
      }
      return {}
    }
  },
  methods: {
    hasWhiteSpacesOnly (val) {
      return val.replace(/\s/g, '').length || 'field is empty'
    }
  }
}
