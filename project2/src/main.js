import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//import './assets/main.scss'

import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'

/* import fontawesome core  and icons 
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas)
library.add(far)
library.add(fab)

/* Create the application */
createApp(App)
    .use(Oruga)
    .use(router)
    .use(createPinia())
    //.use(router)
    //.component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
