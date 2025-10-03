<template>
  <div class="shopping-cart py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
        
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="text-glow mb-0">🛒 Tu Carrito de Compras</h2>
            <span class="badge bg-primary fs-6">{{ cartItems.length }} items</span>
          </div>

       
          <div v-if="cartItems.length === 0" class="empty-cart text-center py-5">
            <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
            <h4 class="text-white">Tu carrito está vacío</h4>
            <p class="text-light opacity-75">¡Empieza a añadir productos!</p>
            <router-link to="/productos" class="btn btn-glow btn-primary btn-lg mt-3">
              Explorar Productos
            </router-link>
          </div>

          <div v-else class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-item card card-hover-3d glow-effect mb-4">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-2">
                    <img :src="item.image" :alt="item.name" class="img-fluid rounded-3">
                  </div>
                  <div class="col-md-4">
                    <h5 class="text-white mb-1">{{ item.name }}</h5>
                    <p class="text-light opacity-75 mb-0 small">{{ item.description }}</p>
                  </div>
                  <div class="col-md-2 text-center">
                    <div class="quantity-controls d-flex align-items-center justify-content-center">
                      <button class="btn btn-outline-light btn-sm" @click="decreaseQuantity(item)">
                        <i class="fas fa-minus"></i>
                      </button>
                      <span class="mx-3 text-white fw-bold">{{ item.quantity }}</span>
                      <button class="btn btn-outline-light btn-sm" @click="increaseQuantity(item)">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-2 text-center">
                    <span class="h5 text-warning mb-0">Bs. {{ item.price * item.quantity }}</span>
                    <small class="text-muted d-block">Bs. {{ item.price }} c/u</small>
                  </div>
                  <div class="col-md-2 text-center">
                    <button class="btn btn-danger btn-sm" @click="removeFromCart(item)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    
        <div class="col-lg-4">
          <div class="order-summary card card-hover-3d glow-effect sticky-top">
            <div class="card-body">
              <h5 class="card-title text-glow mb-4">Resumen del Pedido</h5>
              
              <div class="summary-item d-flex justify-content-between mb-3">
                <span class="text-light">Subtotal:</span>
                <span class="text-light">Bs. {{ subtotal }}</span>
              </div>
              
              <div class="summary-item d-flex justify-content-between mb-3">
                <span class="text-light">Envío:</span>
                <span class="text-light">{{ shippingCost === 0 ? 'Gratis' : `Bs. ${shippingCost}` }}</span>
              </div>
              
              <div class="summary-item d-flex justify-content-between mb-3">
                <span class="text-light">Descuento:</span>
                <span class="text-success">-Bs. {{ discount }}</span>
              </div>
              
              <hr class="my-3 border-secondary">
              
              <div class="summary-total d-flex justify-content-between mb-4">
                <strong class="text-white">Total:</strong>
                <strong class="text-warning h4">Bs. {{ totalAmount }}</strong>
              </div>

              <div class="d-grid gap-2">
                <button class="btn btn-glow btn-success btn-lg" @click="proceedToCheckout" :disabled="cartItems.length === 0">
                  <i class="fas fa-credit-card me-2"></i> Proceder al Pago
                </button>
                <button class="btn btn-outline-light btn-lg" @click="continueShopping">
                  <i class="fas fa-shopping-bag me-2"></i> Seguir Comprando
                </button>
              </div>

           
              <div class="promo-code mt-4">
                <label class="form-label text-light">Código de Descuento</label>
                <div class="input-group">
                  <input type="text" class="form-control form-control-glow" v-model="promoCode" placeholder="Ingresa tu código">
                  <button class="btn btn-glow btn-primary" @click="applyPromoCode">Aplicar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  data() {
    return {
      promoCode: '',
      discount: 0,
      shippingCost: 0,
      cartItems: [
        { 
          id: 1, 
          name: 'Arroz Integral Premium', 
          description: 'Arroz de alta calidad, rico en fibra.', 
          price: 15.50, 
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        },
        { 
          id: 3, 
          name: 'Leche Fresca Entera', 
          description: 'Leche 100% natural, pasteurizada.', 
          price: 8.00, 
          quantity: 3,
          image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        }
      ]
    };
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    },
    totalAmount() {
      return (parseFloat(this.subtotal) + this.shippingCost - this.discount).toFixed(2);
    }
  },
  methods: {
    increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
    removeFromCart(item) {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
      this.$showToast(`${item.name} eliminado del carrito`, 'info');
    },
    applyPromoCode() {
      const code = this.promoCode.trim().toUpperCase();
      if (code === 'CASA10') {
        this.discount = parseFloat(this.subtotal) * 0.1;
        this.$showToast('¡Código aplicado! 10% de descuento', 'success');
      } else if (code) {
        this.$showToast('Código inválido', 'error');
      }
    },
    proceedToCheckout() {
      this.$showToast(`¡Pedido procesado! Total: Bs. ${this.totalAmount}`, 'success');
      
    },
    continueShopping() {
      this.$router.push('/productos');
    }
  },
  mounted() {
    console.log('ShoppingCart cargado');
  }
};
</script>

<style scoped>
.shopping-cart {
  background: transparent;
  min-height: 80vh;
}

.empty-cart {
  padding: 4rem 2rem;
}

.cart-item {
  transition: all 0.3s ease;
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.quantity-controls .btn {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.order-summary {
  top: 100px;
}

.summary-item, .summary-total {
  padding: 0.5rem 0;
}

.promo-code .input-group {
  margin-top: 0.5rem;
}

.sticky-top {
  position: sticky;
  top: 100px;
}

@media (max-width: 768px) {
  .cart-item .row > div {
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .quantity-controls {
    justify-content: center;
  }
}
</style>