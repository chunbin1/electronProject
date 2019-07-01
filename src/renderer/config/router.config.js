export default [
  {
    path:'/detail',
    routes:[
      {
        path:'/detail',
        component:'./Detail'
      }
    ]
  },

  {
    path: '/',
    component: '../layout/BasicLayout',
    routes: [
      { path: '/home', redirect: '/top' },
      {
        path: '/top',
        component: './Top',
      },
      {
        path: '/north',
        component: './North',
      },
      {
        path: '/search',
        component: './Search',
      },
    ],
  },

];
