// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Bulma from '../node_modules/bulma/css/bulma.css';
import { sync } from 'vuex-router-sync';
import store from '@/store/store';
import VueGoodTable from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';

/** Need both of the following to use font-awesome in our app */
import 'vue-awesome/icons';
import Icon from '../node_modules/vue-awesome/components/Icon';

Vue.config.productionTip = false;

Vue.use(Bulma);
Vue.use(VueGoodTable);
Vue.component('icon', Icon); // https://github.com/Justineo/vue-awesome#es-modules-with-npm--vue-loader-recommended

sync(store, router);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});
