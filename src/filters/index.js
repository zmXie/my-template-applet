// 过滤器
import Vue from 'vue';
import * as filters from './filters';

/**
 * register filters in globals.
 */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
