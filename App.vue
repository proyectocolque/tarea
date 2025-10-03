<template>
  <div id="app" class="min-vh-100">
    <!-- Navbar Mejorado -->
    <AppNavbar />
    
    <!-- Main Content -->
    <main class="main-content">
      <router-view></router-view>
    </main>

    <!-- Footer Mejorado -->
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter,
  },
  mounted() {
    this.applySecurityMeasures();
  },
  methods: {
    applySecurityMeasures() {
      // Prevenir vulnerabilidad XSS en inputs
      document.addEventListener('input', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
          e.target.value = e.target.value.replace(/[<>]/g, '');
        }
      });
      
      // Prevenir clickjacking
      if (self === top) {
        document.documentElement.style.visibility = 'visible';
      } else {
        top.location = self.location;
      }
    }
  }
};
</script>

<style>
/* Variables globales modernas */
:root {
  --primary-glow: #0066ff;
  --secondary-glow: #00ff88;
  --accent-glow: #ff0080;
  --dark-bg: #0f172a;
  --card-bg: #1e293b;
  --text-light: #f8fafc;
}

#app {
  font-family: 'Segoe UI', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(-45deg, #0f172a, #1e293b, #334155, #475569);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  min-height: 100vh;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.main-content {
  padding-top: 80px;
  min-height: calc(100vh - 160px);
}

/* Efectos globales mejorados */
.glow-effect {
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.glow-effect:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 
    0 10px 25px rgba(0, 102, 255, 0.3),
    0 0 30px rgba(0, 102, 255, 0.1),
    inset 0 0 15px rgba(255, 255, 255, 0.1);
}

.btn-glow {
  background: linear-gradient(135deg, #0066ff, #00ccff);
  border: none;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
}

.btn-glow::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s;
}

.btn-glow:hover::before {
  left: 100%;
}

.btn-glow:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 102, 255, 0.4);
}

.text-glow {
  text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
  animation: textPulse 2s infinite;
}

@keyframes textPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.card-hover-3d {
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
}

.card-hover-3d:hover {
  transform: rotateY(5deg) rotateX(5deg) translateY(-10px);
  box-shadow: 
    0 25px 50px rgba(0, 102, 255, 0.25),
    0 0 80px rgba(0, 102, 255, 0.1);
}

.hover-glow {
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem !important;
}

.hover-glow:hover {
  background: rgba(255, 255, 255, 0.1);
  text-shadow: 0 0 10px currentColor;
  transform: translateY(-2px);
}
</style>