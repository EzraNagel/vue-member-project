<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
  <link rel="stylesheet" href="./assets/main.css">
  <section class="hero is-small is-primary">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            <RouterLink to="/">People</RouterLink>
          </a>
          <a class="navbar-item">
            <RouterLink to="/events">Events</RouterLink>
          </a>
          <a class="navbar-item">
            <RouterLink to="/donations">Donations</RouterLink>
          </a>
        </div>
      </div>
    </nav>
  </section>

  <RouterView />
  
</template>

<script>

//import People from '@/components/People.vue'
//import Events from '@/components/Events.vue'
//import Donations from './components/Donations.vue';
import { useRouter, useRoute } from 'vue-router'

export default {
  name: "App",
  setup() {
    const router = useRouter();
    const route = useRoute();
  }
}


</script>



