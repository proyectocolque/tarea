<template>
  <nav class="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
    <div class="container">
      <!-- Logo con efectos -->
      <router-link class="navbar-brand d-flex align-items-center glow-effect" to="/">
        <div class="logo-icon me-2">
          <i class="fas fa-store fa-lg text-primary"></i>
        </div>
        <span class="brand-text fw-bold">CASA DEL RÍO</span>
      </router-link>

      <!-- Botón hamburguesa -->
      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menú de navegación -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item mx-1" v-for="item in navItems" :key="item.name">
            <router-link 
              class="nav-link hover-glow d-flex align-items-center" 
              :to="item.path"
              active-class="active"
            >
              <i :class="item.icon" class="me-2"></i>
              {{ item.name }}
            </router-link>
          </li>
        </ul>

        <!-- Carrito con contador -->
        <div class="ms-3 position-relative">
          <router-link to="/carrito" class="btn btn-glow btn-primary position-relative">
            <i class="fas fa-shopping-cart me-2"></i>
            Carrito
            <span v-if="cartCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger pulse">
              {{ cartCount }}
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      cartCount: 3,
      navItems: [
        { name: 'Inicio', path: '/', icon: 'fas fa-home' },
        { name: 'Productos', path: '/productos', icon: 'fas fa-box' },
        { name: 'Galería', path: '/galeria', icon: 'fas fa-images' },
        { name: 'Contacto', path: '/contacto', icon: 'fas fa-phone' }
      ]
    };
  }
};
</script>

<style scoped>
.custom-navbar {
  background: rgba(15, 23, 42, 0.95) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.3);
  padding: 1rem 0;
  transition: all 0.3s ease;
}

.brand-text {
  background: linear-gradient(135deg, #00ff88, #0066ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.4rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 102, 255, 0.1);
  border-radius: 10px;
  border: 2px solid rgba(0, 102, 255, 0.3);
}

.hover-glow {
  color: rgba(255, 255, 255, 0.8) !important;
}

.hover-glow:hover,
.hover-glow.active {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #fff !important;
  text-shadow: 0 0 10px currentColor;
  transform: translateY(-2px);
}

.hover-glow.active {
  border-left: 3px solid #0066ff;
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.1); }
  100% { transform: translate(-50%, -50%) scale(1); }
}

@media (max-width: 991.98px) {
  .navbar-nav {
    text-align: center;
    margin: 1rem 0;
  }
  
  .hover-glow {
    margin: 0.5rem 0;
  }
}
</style>