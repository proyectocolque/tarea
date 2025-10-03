<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section min-vh-100 d-flex align-items-center">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1 class="hero-title text-glow mb-4">
                Bienvenidos a <span class="text-primary">Casa del Río</span>
              </h1>
              <p class="hero-subtitle mb-4">
                Tu almacén de confianza con los mejores productos, precios competitivos 
                y atención de primera calidad. Más de 20 años sirviendo a la comunidad.
              </p>
              <div class="hero-stats row mb-4">
                <div class="col-4" v-for="stat in stats" :key="stat.value">
                  <div class="stat-item text-center">
                    <h3 class="text-glow text-warning mb-1">{{ stat.value }}</h3>
                    <small>{{ stat.label }}</small>
                  </div>
                </div>
              </div>
              <div class="hero-buttons">
                <button class="btn btn-glow btn-primary btn-lg me-3" @click="scrollToSection('products')">
                  🛒 Ver Productos
                </button>
                <button class="btn btn-glow btn-outline-light btn-lg" @click="scrollToSection('about')">
                  📖 Nuestra Historia
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image">
              <div class="floating-card card-hover-3d glow-effect">
                <div class="placeholder-image">
                  <i class="fas fa-store fa-8x text-primary opacity-50"></i>
                  <p class="mt-3 text-light">Imagen del almacén</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Productos Destacados -->
    <section id="products" class="products-preview py-5">
      <div class="container">
        <div class="row mb-5">
          <div class="col-12 text-center">
            <h2 class="section-title text-glow mb-3">⭐ Productos Destacados</h2>
            <p class="section-subtitle">Los más vendidos de nuestra tienda</p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-md-3" v-for="product in featuredProducts" :key="product.id">
            <div class="card card-hover-3d glow-effect h-100">
              <div class="product-image position-relative">
                <img :src="product.image" :alt="product.name" class="card-img-top">
                <span v-if="product.badge" class="position-absolute top-0 end-0 m-2 badge bg-danger">
                  {{ product.badge }}
                </span>
              </div>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title text-white">{{ product.name }}</h5>
                <p class="card-text text-light opacity-75 flex-grow-1">{{ product.description }}</p>
                <div class="d-flex justify-content-between align-items-center mt-auto">
                  <span class="h5 text-warning mb-0">Bs. {{ product.price }}</span>
                  <button class="btn btn-glow btn-primary btn-sm" @click="addToCart(product)">
                    <i class="fas fa-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <router-link to="/productos" class="btn btn-glow btn-outline-light btn-lg">
            Ver Todos los Productos
          </router-link>
        </div>
      </div>
    </section>

    <!-- Sobre Nosotros -->
    <section id="about" class="about-section py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="about-image">
              <div class="floating-card card-hover-3d glow-effect">
                <div class="placeholder-image">
                  <i class="fas fa-history fa-8x text-warning opacity-50"></i>
                  <p class="mt-3 text-light">Nuestra historia</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="about-content">
              <h2 class="section-title text-glow mb-4">🏪 Nuestra Historia</h2>
              <p class="about-text mb-4">
                Desde 2003, <strong class="text-warning">Casa del Río</strong> ha sido el almacén de confianza 
                para miles de familias. Comenzamos como un pequeño negocio familiar 
                y hoy somos referentes en calidad y servicio.
              </p>
              <div class="about-features">
                <div class="feature-item d-flex align-items-center mb-3" v-for="feature in features" :key="feature">
                  <i class="fas fa-check-circle text-success me-3"></i>
                  <span>{{ feature }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      stats: [
        { value: '500+', label: 'Productos' },
        { value: '20+', label: 'Años' },
        { value: '100%', label: 'Confianza' }
      ],
      featuredProducts: [
        {
          id: 1,
          name: 'Arroz Premium',
          price: 15.50,
          image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Arroz de la mejor calidad',
          badge: 'Popular'
        },
        {
          id: 2,
          name: 'Aceite de Oliva',
          price: 45.00,
          image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Extra virgen, primera prensada',
          badge: 'Oferta'
        },
        {
          id: 3,
          name: 'Leche Fresca',
          price: 8.00,
          image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: '100% natural y pasteurizada'
        },
        {
          id: 4,
          name: 'Azúcar Orgánica',
          price: 12.00,
          image: 'https://images.unsplash.com/photo-1589923186207-3e5c76b309cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Natural sin procesar',
          badge: 'Nuevo'
        }
      ],
      features: [
        'Productos de primera calidad',
        'Precios competitivos',
        'Atención personalizada',
        'Entrega a domicilio',
        'Garantía de satisfacción'
      ]
    };
  },
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    addToCart(product) {
      this.$showToast(`${product.name} añadido al carrito`, 'success');
    }
  },
  mounted() {
    console.log('HomePage cargado con diseño elegante');
  }
};
</script>

<style scoped>
.home-page {
  background: transparent;
}

.hero-section {
  padding-top: 2rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.hero-stats {
  margin: 2rem 0;
}

.stat-item {
  padding: 1rem;
}

.floating-card {
  animation: float 6s ease-in-out infinite;
  padding: 2rem;
  text-align: center;
}

.placeholder-image {
  padding: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  border: 2px dashed rgba(255, 255, 255, 0.2);
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #fff;
}

.section-subtitle {
  font-size: 1.1rem;
  opacity: 0.8;
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.8);
}

.products-preview, .about-section {
  padding: 5rem 0;
}

.product-image {
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card-hover-3d:hover .product-image img {
  transform: scale(1.1);
}

.about-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
}

.feature-item {
  padding: 0.5rem 0;
  color: rgba(255, 255, 255, 0.9);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-buttons .btn {
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>