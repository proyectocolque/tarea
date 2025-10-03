<template>
  <div class="products-section py-5">
    <div class="container">
      <!-- Header Mejorado -->
      <div class="text-center mb-5">
        <h2 class="section-title text-glow mb-3">🛍️ Nuestros Productos</h2>
        <p class="section-subtitle">Descubre la mejor calidad al mejor precio</p>
        
        <!-- Filtros de Categoría -->
        <div class="category-filters mb-4">
          <button 
            v-for="category in categories" 
            :key="category"
            class="btn btn-outline-light btn-sm me-2 mb-2"
            :class="{ 'active': selectedCategory === category }"
            @click="filterByCategory(category)"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Grid de Productos Mejorado -->
      <div class="row g-4">
        <div 
          class="col-xl-3 col-lg-4 col-md-6" 
          v-for="product in filteredProducts" 
          :key="product.id"
        >
          <div class="card card-hover-3d glow-effect product-card h-100">
            <!-- Badge de Oferta -->
            <div v-if="product.discount" class="product-badge">
              <span class="badge bg-danger">-{{ product.discount }}%</span>
            </div>
            
            <!-- Imagen del Producto -->
            <div class="product-image position-relative overflow-hidden">
              <img 
                :src="product.image" 
                :alt="product.name"
                class="card-img-top img-fluid"
                @error="handleImageError"
                loading="lazy"
              >
              <div class="image-overlay">
                <button class="btn btn-glow btn-primary btn-sm" @click="quickView(product)">
                  <i class="fas fa-eye me-1"></i> Vista Rápida
                </button>
              </div>
            </div>

            <!-- Contenido de la Tarjeta -->
            <div class="card-body d-flex flex-column">
              <h5 class="card-title text-white mb-2">{{ product.name }}</h5>
              <p class="card-text text-light opacity-75 flex-grow-1">{{ product.description }}</p>
              
              <!-- Precio -->
              <div class="price-section mb-3">
                <span class="current-price h4 text-warning mb-0">Bs. {{ product.price }}</span>
                <span v-if="product.originalPrice" class="original-price text-muted text-decoration-line-through ms-2">
                  Bs. {{ product.originalPrice }}
                </span>
              </div>

              <!-- Acciones -->
              <div class="card-actions mt-auto">
                <button 
                  class="btn btn-glow btn-success w-100" 
                  @click="addToCart(product)"
                  :disabled="product.stock === 0"
                >
                  <i class="fas fa-cart-plus me-2"></i>
                  {{ product.stock > 0 ? 'Añadir al Carrito' : 'Agotado' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      loading: false,
      selectedCategory: 'Todos',
      categories: ['Todos', 'Abarrotes', 'Lácteos', 'Aceites', 'Bebidas'],
      products: [
        { 
          id: 1, 
          name: 'Arroz Integral Premium', 
          description: 'Arroz de alta calidad, rico en fibra y nutrientes esenciales.', 
          price: 15.50, 
          originalPrice: 18.00,
          discount: 15,
          image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          category: 'Abarrotes',
          stock: 25
        },
        { 
          id: 2, 
          name: 'Aceite de Oliva Extra Virgen', 
          description: 'Aceite premium para cocinar y aderezar tus comidas.', 
          price: 45.00, 
          originalPrice: 55.00,
          discount: 20,
          image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          category: 'Aceites',
          stock: 15
        },
        { 
          id: 3, 
          name: 'Leche Fresca Entera', 
          description: 'Leche 100% natural, pasteurizada y envasada al vacío.', 
          price: 8.00, 
          image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          category: 'Lácteos',
          stock: 0
        },
        { 
          id: 4, 
          name: 'Azúcar Orgánica', 
          description: 'Azúcar natural sin procesar, ideal para repostería.', 
          price: 12.00, 
          image: 'https://images.unsplash.com/photo-1589923186207-3e5c76b309cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          category: 'Abarrotes',
          stock: 40
        },
        { 
          id: 5, 
          name: 'Huevos Campesinos', 
          description: 'Huevos frescos de gallinas criadas en libertad.', 
          price: 18.00, 
          image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          category: 'Lácteos',
          stock: 30
        },
        { 
          id: 6, 
          name: 'Agua Mineral 2L', 
          description: 'Agua purificada y mineralizada, 6 botellas por pack.', 
          price: 22.00, 
          image: 'https://images.unsplash.com/photo-1548839140-29f70f1d9b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          category: 'Bebidas',
          stock: 20
        }
      ]
    };
  },
  computed: {
    filteredProducts() {
      if (this.selectedCategory === 'Todos') {
        return this.products;
      }
      return this.products.filter(product => product.category === this.selectedCategory);
    }
  },
  methods: {
    // Sanitizar entrada del usuario
    sanitizeInput(input) {
      return input.replace(/[<>]/g, '');
    },

    filterByCategory(category) {
      this.selectedCategory = this.sanitizeInput(category);
    },

    addToCart(product) {
      // Validación de stock
      if (product.stock <= 0) {
        this.showToast('Producto agotado', 'error');
        return;
      }

      // Simular añadir al carrito
      this.showToast(`${product.name} añadido al carrito`, 'success');
      
      // En una aplicación real, aquí iría la lógica del carrito
      console.log('Producto añadido:', product);
    },

    quickView(product) {
      // Vista rápida del producto
      this.showToast(`Vista rápida: ${product.name}`, 'info');
    },

    handleImageError(event) {
      // Imagen de respaldo si falla la carga
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjM0U0MDUxIi8+CjxwYXRoIGQ9Ik0yNTAgMTY3VjMzM00xNjcgMjUwSDMzMyIgc3Ryb2tlPSIjN0M4OEEwIiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
    },

    showToast(message, type = 'info') {
      // Crear notificación elegante
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
            ${this.sanitizeInput(message)}
          </div>
        </div>
      `;
      
      document.body.appendChild(toast);
      
      // Auto-eliminar después de 4 segundos
      setTimeout(() => {
        toast.remove();
      }, 4000);
    }
  },
  mounted() {
    console.log('ProductList cargado con medidas de seguridad');
  }
};
</script>

<style scoped>
.products-section {
  background: transparent;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.category-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.card-hover-3d {
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  overflow: hidden;
}

.card-hover-3d:hover {
  transform: rotateY(5deg) rotateX(5deg) translateY(-10px);
  box-shadow: 
    0 25px 50px rgba(0, 102, 255, 0.25),
    0 0 80px rgba(0, 102, 255, 0.1);
}

.product-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
}

.product-image {
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-hover-3d:hover .image-overlay {
  opacity: 1;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.current-price {
  color: #ffd700;
  font-weight: 700;
}

.original-price {
  font-size: 0.9rem;
}

.card-actions .btn:disabled {
  background: #6c757d;
  border-color: #6c757d;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .category-filters {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 1rem;
  }
}
</style>