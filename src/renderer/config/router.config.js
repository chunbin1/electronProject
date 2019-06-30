export default [
  {
    path: '/',
    component: '../layout/BasicLayout',
    redict: '/home',
    routes: [
      { path: '/', redirect: '/top' },
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
