
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '/createCategory',
        name: 'createCategory',
        component: () => import('pages/CreateCategory.vue')
      },
      {
        path: '/settingsCategory',
        name: 'settingsCategory',
        component: () => import('pages/SettingsCategory.vue')
      },
      {
        path: '/createProduct',
        name: 'createProduct',
        component: () => import('pages/CreateProduct.vue')
      },
      {
        path: '/settingsProduct',
        name: 'settingsProduct',
        component: () => import('pages/SettingsProduct.vue')
      },
      {
        path: '/calcInstalments',
        name: 'calcInstalments',
        component: () => import('pages/CalcInstalments.vue')
      }
    ]
  }
]

// // Always leave this as last one
// if (process.env.MODE !== 'ssr') {
//   routes.push({
//     path: '*',
//     component: () => import('pages/Error404.vue')
//   })
// }

export default routes
