export default [
  {
    path: '/',
    component: '../layout/BasicLayout',
    redict:'/home',
    routes:[
      { path: '/', redirect: '/home' },
      {
        path:'/home',
        component:'./home/Home'
      }
    ]
  },
]