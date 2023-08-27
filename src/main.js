import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import store from './store/index.js'



const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    defaultTheme: 'dark'
  }
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)

app.mount('#app')
