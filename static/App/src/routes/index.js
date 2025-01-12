const routes = [
    {
      path: "/",
      component: Home,
      name:'Home',
    },
    {
      path: "/game/",
      component: Game,
      name:'Game',
    },
   
   
  ];

  const router = new VueRouter({
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
    // mode: "history",
    // base: `/`,
  });