import Vue from 'vue'
import Router from 'vue-router'
import FormInput from '@/components/FormInput'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FormInput',
      component: FormInput
    }
  ]
})
