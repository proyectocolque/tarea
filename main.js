import Vue from 'vue';
import App from './App.vue';
import router from './router';

// Bootstrap con temas personalizados
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Iconos FontAwesome para efectos elegantes
import '@fortawesome/fontawesome-free/css/all.min.css';

// Configuración de seguridad global
Vue.config.productionTip = false;

// Protección global contra XSS
Vue.directive('safe-html', {
  inserted: function (el, binding) {
    if (typeof binding.value === 'string') {
      el.innerHTML = binding.value.replace(/[<>]/g, '');
    }
  }
});

// Mixin global para sanitización
Vue.mixin({
  methods: {
    $sanitize(input) {
      if (typeof input !== 'string') return input;
      return input.replace(/[<>]/g, '').substring(0, 1000);
    },
    $safeRedirect(url) {
      if (url && !url.includes('javascript:')) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    $showToast(message, type = 'info') {
      const toast = document.createElement('div');
      toast.className = `position-fixed top-0 end-0 p-3`;
      toast.style.zIndex = '9999';
      
      const bgColor = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-info';
      
      toast.innerHTML = `
        <div class="toast show" role="alert">
          <div class="toast-header ${bgColor} text-white">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}-circle me-2"></i>
            <strong class="me-auto">${type === 'success' ? 'Éxito' : type === 'error' ? 'Error' : 'Info'}</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
          </div>
          <div class="toast-body bg-dark text-white">
            ${this.$sanitize(message)}
          </div>
        </div>
      `;
      
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    }
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

console.log('🚀 Multi-Abarrotes Casa del Río - Cargado con diseño elegante y seguridad');