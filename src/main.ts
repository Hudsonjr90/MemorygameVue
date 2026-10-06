import { createApp } from 'vue'
import {
  Quasar,
  Notify,
  Dialog,
  Loading,
  LoadingBar,
  Dark,
} from 'quasar'
import iconSet from 'quasar/icon-set/mdi-v7'
import '@quasar/extras/mdi-v7/mdi-v7.css'
import 'quasar/src/css/index.sass'
import './assets/styles/quasar-custom.sass'
import App from './App.vue'


const app = createApp(App)

app.use(Quasar, {
  iconSet,

  plugins: {
    Notify,
    Dialog,
    Loading,
    LoadingBar,
    Dark,
  },

  config: {
    loading: {
      message: 'Carregando...',
      spinnerColor: 'primary',
      spinnerSize: 140,
      backgroundColor: 'white',
    },

    notify: {
      position: 'top',
      timeout: 2500,
    },
  },
})

app.mount('#app')