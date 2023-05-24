import Vue from 'vue';
import App from './App';
import store from './store';
import frame from './plugin/frame';

Vue.config.productionTip = false;
Vue.use(frame);
App.mpType = 'app';

const app = new Vue({
  store,
  ...App
});
app.$mount();
