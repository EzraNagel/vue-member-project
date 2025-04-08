import { createRouter, createWebHistory } from 'vue-router'
import People from '@/views/PeopleView.vue'

const routes = [
    
    { path: '/', name: 'people', component: People },
    { path: '/donations', name: 'donations', component: () => import('@/views/DonationsView.vue') },
    { path: '/events', name: 'events', component: () => import('@/views/EventsView.vue') }
  ]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
