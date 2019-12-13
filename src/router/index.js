
import Vue from 'vue'
import Router from 'vue-router'
import RouterPrefetch from 'vue-router-prefetch'
import HelloWorld from '../components/HelloWorld';

Vue.use(Router)
Vue.use(RouterPrefetch)

const router = new Router({
    mode: 'history',
    linkActiveClass: 'set-active',
    routes: [
        {
            path: '/stops',
            component: () => import('../components/BusStop')
        },
        {
            path: '/arc',
            component: () => import('../components/ArcLayer')
        },
        {
            path: '/garbage',
            component: () => import('../components/Garbage')
        },
         {
            path: '/heat',
            component: () => import('../components/HeatMap')
        },
        {
            path: '/hex',
            component: () => import('../components/HexGrid')
        },
        {
            path: '/path',
            component: () => import('../components/PathMap')
        },
        {
            path: '/',
            component: HelloWorld
        },
        { // redirect everything else to home
            path: '*',
            redirect: '/',
            meta: {
                guest: true
            }
        },
    ]
});

export default router;