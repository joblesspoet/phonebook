
require('./bootstrap');

window.Vue = require('vue');

//require vueRouter
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// require the application routes
let Myheader = require('./components/Myheader.vue');
let Myfooter = require('./components/Myfooter.vue');
let Home     = require('./components/Home.vue');
let About    = require('./components/About.vue');

// list down all route array
const routes = [
    {path:'/home',component: Home},
    {path:'/about',component: About}
];

// initialize VueRouter object
const router = new VueRouter({routes,
 //   mode:'history'
});

const app = new Vue({
    el: '#app',
    router,
    components:{ Myheader,Myfooter},

    created(){
        console.log("Hello World"); 
    }
});
