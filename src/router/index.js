import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Hello from '@/components/Hello'
import Masonry_multi_columns from '@/components/Masonry_multi_columns.vue';
import Masonry_flex from '@/components/Masonry_flex.vue';

Vue.use(Router)
Vue.use(ElementUI);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      redirect:'/Masonry_multi_columns',
      children: [  //这里就是二级路由的配置
        {
          path: '/Masonry_multi_columns',
          name: 'Masonry_multi_columns',
          component: Masonry_multi_columns
        },
        {
          path: '/Masonry_flex',
          name: 'Masonry_flex',
          component: Masonry_flex
        }
      ]
    }
  ]
})
