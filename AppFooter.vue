<template>
  <footer class="custom-footer">
    <div class="container">
      <div class="row g-4">
       
        <div class="col-lg-4 col-md-6">
          <div class="footer-section">
            <h5 class="footer-title text-glow">📍 Contacto</h5>
            <div class="contact-info">
              <div class="contact-item d-flex align-items-center mb-3">
                <i class="fas fa-map-marker-alt fa-lg text-primary me-3"></i>
                <div>
                  <strong>Dirección:</strong>
                  <p class="mb-0">Av. Principal s/n, Casa del Rio</p>
                </div>
              </div>
              <div class="contact-item d-flex align-items-center mb-3">
                <i class="fas fa-phone fa-lg text-success me-3"></i>
                <div>
                  <strong>Teléfono:</strong>
                  <p class="mb-0">+591 72494148</p>
                </div>
              </div>
              <div class="contact-item d-flex align-items-center mb-3">
                <i class="fas fa-envelope fa-lg text-warning me-3"></i>
                <div>
                  <strong>Email:</strong>
                  <p class="mb-0">colque@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      
        <div class="col-lg-4 col-md-6">
          <div class="footer-section">
            <h5 class="footer-title text-glow">🌐 Síguenos</h5>
            <div class="social-links">
              <a href="#" class="social-link glow-effect" @click.prevent="safeRedirect('facebook')">
                <i class="fab fa-facebook-f fa-2x"></i>
                <span>Facebook</span>
              </a>
              <a href="#" class="social-link glow-effect" @click.prevent="safeRedirect('instagram')">
                <i class="fab fa-instagram fa-2x"></i>
                <span>Instagram</span>
              </a>
              <a href="#" class="social-link glow-effect" @click.prevent="safeRedirect('whatsapp')">
                <i class="fab fa-whatsapp fa-2x"></i>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Enlaces Rápidos -->
        <div class="col-lg-4">
          <div class="footer-section">
            <h5 class="footer-title text-glow">🔗 Enlaces Rápidos</h5>
            <div class="quick-links">
              <router-link to="/politica" class="quick-link hover-glow">
                📄 Política de Privacidad
              </router-link>
              <router-link to="/terminos" class="quick-link hover-glow">
                📝 Términos de Servicio
              </router-link>
              <router-link to="/nosotros" class="quick-link hover-glow">
                👥 Sobre Nosotros
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Línea divisoria -->
      <hr class="footer-divider">

      <!-- Copyright -->
      <div class="footer-bottom">
        <div class="row align-items-center">
          <div class="col-md-6">
            <p class="copyright-text mb-0">
              &copy; 2025 <strong>Casa del Rio Multi-Abarrotes</strong>. Todos los derechos reservados.
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <p class="mb-0">
              Hecho con <i class="fas fa-heart text-danger pulse"></i> para nuestra comunidad
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  methods: {
    safeRedirect(platform) {
      const urls = {
        facebook: 'https://facebook.com/casadelrio',
        instagram: 'https://instagram.com/casadelrio', 
        whatsapp: 'https://wa.me/59172494148'
      };
      
      if (urls[platform]) {
        window.open(urls[platform], '_blank', 'noopener,noreferrer');
      }
    }
  }
};
</script>

<style scoped>
.custom-footer {
  background: rgba(15, 23, 42, 0.95) !important;
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem 0 1.5rem;
  margin-top: 4rem;
}

.footer-section {
  padding: 1rem 0;
}

.footer-title {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #fff;
  font-weight: 600;
}

.contact-item {
  transition: transform 0.3s ease;
}

.contact-item:hover {
  transform: translateX(5px);
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.social-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.social-link i {
  margin-right: 1rem;
  width: 30px;
  text-align: center;
}

.quick-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.quick-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  border-radius: 0.25rem;
}

.quick-link:hover {
  color: #fff;
  padding-left: 0.5rem;
}

.footer-divider {
  border-color: rgba(255, 255, 255, 0.1);
  margin: 2rem 0 1.5rem;
}

.footer-bottom {
  padding-top: 1.5rem;
}

.copyright-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .custom-footer {
    text-align: center;
  }
  
  .social-links {
    align-items: center;
  }
  
  .contact-item {
    justify-content: center;
    text-align: center;
  }
}
</style>