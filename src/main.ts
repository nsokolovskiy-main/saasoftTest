import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createRulesPlugin } from 'vuetify/labs/rules'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .use(createRulesPlugin({}, vuetify.locale))
  .mount('#app')
