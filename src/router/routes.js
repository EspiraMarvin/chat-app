
const routes = [
  {
    path: '/auth',
    meta: { requiresAuth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      { path: '/auth', component: () => import('pages/AuthPage.vue') }
    ]
  },
  {
    path: '/',
    meta: { requiresAuth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/UsersPage.vue') },
      { path: '/chat/:otherUserId', component: () => import('pages/ChatPage.vue') },
      { path: '/userprofile/:otherUserId', component: () => import('pages/UserProfilePage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
