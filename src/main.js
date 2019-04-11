// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueI18nSimple from './handbooks/vuePlugin/vue-i18n-simple'

Vue.config.productionTip = false

const locale = 'zh-cn'
const message = {
    en: {
        hello: 'hello! { name }, { greet }',
        name: 'John: {0}{1}'
    },
    'zh-cn': {
        hello: '哈喽！{ name }, { greet }',
        name: '囧: {0}{1}'
    }
}

Vue.use(vueI18nSimple, {
    locale,
    message
})



import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
