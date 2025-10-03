import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '../components/HomePage.vue';
import ProductList from '../components/ProductList.vue';
import ImageGallery from '../components/ImageGallery.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import ContactForm from '../components/ContactForm.vue';

Vue.use(VueRouter);

const routes = [
  { 
    path: '/', 
    name: 'Home',
    component: HomePage,
    meta: { title: 'Inicio - Casa del Río' }
  },
  { 
    path: '/productos', 
    name: 'Products',
    component: ProductList,
    meta: { title: 'Productos - Casa del Río' }
  },
  { 
    path: '/galeria', 
    name: 'Gallery',
    component: ImageGallery,
    meta: { title: 'Galería - Casa del Río' }
  },
  { 
    path: '/carrito', 
    name: 'Cart',
    component: ShoppingCart,
    meta: { title: 'Carrito - Casa del Río' }
  },
  { 
    path: '/contacto', 
    name: 'Contact',
    component: ContactForm,
    meta: { title: 'Contacto - Casa del Río' }
  },
  // Ruta para manejar 404
  { 
    path: '*', 
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

// Guard de navegación para cambiar el título de la página
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Casa del Río - Multi-Abarrotes';
  next();
});

export default router;