/* eslint-disable prefer-const */
import Vue from 'vue'
import { firebaseAuth, firebaseDb } from 'boot/firebase'

let messagesRef

const state = {
  userDetails: {},
  users: {},
  messages: {}
}

const mutations = {
  setUserDetails (state, payload) {
    state.userDetails = payload
  },
  addUser (state, payload) {
    // console.log(payload)
    Vue.set(state.users, payload.userId, payload.userDetails)
  },
  updateUser (state, payload) {
    // object assign copies user details of the payload to the corresponding user in users state
    Object.assign(state.users[payload.userId], payload.userDetails)
  },
  addMessage (state, payload) {
    // use vue.set to write new message to our messages object in store
    Vue.set(state.messages, payload.messageId, payload.messageDetails)
  },
  clearMessages (state) {
    state.messages = {}
  }
}

const actions = {
  // eslint-disable-next-line no-empty-pattern
  registerUser ({}, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log(response)
        // save user to database
        const userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + userId).set({
          name: payload.name,
          email: payload.email,
          online: true
        })
      })
      .catch(error => console.log(error.message))
  },

  // eslint-disable-next-line no-empty-pattern
  loginUser ({}, payload) {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => console.log(res))
      .catch(error => console.log(error.message))
  },

  logoutUser () {
    firebaseAuth.signOut()
  },

  // Checks when user logs in or logs out then grab user details and store in our state -userDetails when he's logged in
  handleAuthStateChanged ({ commit, dispatch, state }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // User is logged in.
        const userId = firebaseAuth.currentUser.uid
        firebaseDb.ref(`users/${userId}`).once('value', snapshot => {
          const userDetails = snapshot.val()
          commit('setUserDetails', {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          })
        })
        // adding a method in between a method use dispatch to update user online status
        dispatch('firebaseUpdateUser', {
          userId: userId,
          updates: {
            online: true
          }
        })
        // fetching all users from the DB when a user logs in
        dispatch('firebaseGetUsers')
        this.$router.push('/')
      } else {
        // User is logged out change user online status to false and redirect to login page
        dispatch('firebaseUpdateUser', {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        })
        commit('setUserDetails', {})
        this.$router.replace('/auth')
      }
    })
  },

  // update user
  // eslint-disable-next-line no-empty-pattern
  firebaseUpdateUser ({}, payload) {
    if (payload.userId) {
      firebaseDb.ref(`users/${payload.userId}`).update(payload.updates)
    }
  },

  // get all users from the db when user logs in
  firebaseGetUsers ({ commit }) {
    firebaseDb.ref('users').on('child_added', snapshot => {
      let userDetails = snapshot.val()
      // get user ID from the snapshot
      let userId = snapshot.key
      commit('addUser', {
        userId,
        userDetails
      })
    })

    // update user details to online or offline when user logs in our out
    firebaseDb.ref('users').on('child_changed', snapshot => {
      let userDetails = snapshot.val()
      // get user ID from the snapshot
      let userId = snapshot.key
      commit('updateUser', {
        userId,
        userDetails
      })
    })
  },

  // get messages
  firebaseGetMessages ({ commit, state }, otherUserId) {
    let userId = state.userDetails.userId
    messagesRef = firebaseDb.ref(`chats/${userId}/${otherUserId}`)
    messagesRef.on('child_added', snapshot => {
      let messageDetails = snapshot.val()
      let messageId = snapshot.key
      commit('addMessage', {
        messageId,
        messageDetails
      })
    })
  },

  firebaseStopGettingMessages ({ commit }) {
    if (messagesRef) {
      messagesRef.off('child_added')
      commit('clearMessages')
    }
  },

  // send message
  // eslint-disable-next-line no-empty-pattern
  firebaseSendMessage ({}, payload) {
    console.log(payload)
    firebaseDb.ref('chats/' + state.userDetails.userId + '/' + payload.otherUserId).push(payload.message)
    // write data to other user's data and set message from to them (coming from them to me)
    payload.message.from = 'them'
    firebaseDb.ref('chats/' + payload.otherUserId + '/' + state.userDetails.userId).push(payload.message)
  }
}

const getters = {
  users: state => {
    // get users that are not ourselves/ get other users but not us
    const usersFiltered = {}
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId) {
        usersFiltered[key] = state.users[key]
      }
    })
    return usersFiltered
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
