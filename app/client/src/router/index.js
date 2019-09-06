import Vue from 'vue';
import Router from 'vue-router';
import GenerateResume from '@/components/GenerateResume';
import UploadResume from '@/components/UploadResume';
import ViewResume from '@/components/ViewResume';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Index from '@/components/Index';
import Admin from '@/components/Admin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      //   path: '/login',
      path: '*',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/view/resume/',
      name: 'view-resume',
      component: ViewResume
    },
    {
      path: '/generate/resume',
      name: 'generate-resume',
      component: GenerateResume
    },
    {
      path: '/upload/resume',
      name: 'upload-resume',
      component: UploadResume
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
});
