import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import('../views/Main.vue'),
      children: [
        {
          path: "show",
          component: () => import('../views/Show.vue'),
        },
        {
          path: "save",
          component: () => import('../views/SaveUser.vue'),
        },
      ]
    }
  ],
}); 
// 导出路由
export default router