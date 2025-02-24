import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue'
import Transactions from './views/Transactions.vue';
import Chars from './views/Chars.vue'


const routes = [
    { path: '/', component: Home },
    { path: '/transactions', component: Transactions },
    { path: '/chars', component: Chars }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;