<template>
  <div class="contact-section py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="text-center mb-5">
            <h2 class="section-title text-glow mb-3">📞 Contáctanos</h2>
            <p class="section-subtitle">¿Tienes alguna pregunta? Estamos aquí para ayudarte.</p>
          </div>

          <div class="row g-4">
          
            <div class="col-md-6">
              <div class="contact-info card card-hover-3d glow-effect h-100">
                <div class="card-body">
                  <h5 class="card-title text-glow mb-4">Información de Contacto</h5>
                  
                  <div class="contact-method d-flex align-items-start mb-4">
                    <i class="fas fa-map-marker-alt fa-2x text-primary me-3 mt-1"></i>
                    <div>
                      <h6 class="text-white mb-1">Dirección</h6>
                      <p class="text-light opacity-75 mb-0">Av. Principal s/n<br>Casa del Rio</p>
                    </div>
                  </div>

                  <div class="contact-method d-flex align-items-start mb-4">
                    <i class="fas fa-phone fa-2x text-success me-3 mt-1"></i>
                    <div>
                      <h6 class="text-white mb-1">Teléfono</h6>
                      <p class="text-light opacity-75 mb-0">+591 72494148</p>
                    </div>
                  </div>

                  <div class="contact-method d-flex align-items-start mb-4">
                    <i class="fas fa-envelope fa-2x text-warning me-3 mt-1"></i>
                    <div>
                      <h6 class="text-white mb-1">Email</h6>
                      <p class="text-light opacity-75 mb-0">colque@gmail.com</p>
                    </div>
                  </div>

                  <div class="contact-method d-flex align-items-start">
                    <i class="fas fa-clock fa-2x text-info me-3 mt-1"></i>
                    <div>
                      <h6 class="text-white mb-1">Horario de Atención</h6>
                      <p class="text-light opacity-75 mb-0">
                        Lunes a Sábado: 7:00 AM - 10:00 PM<br>
                        Domingo: 7:00 AM - 9:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          
            <div class="col-md-6">
              <div class="contact-form card card-hover-3d glow-effect h-100">
                <div class="card-body">
                  <h5 class="card-title text-glow mb-4">Envíanos un Mensaje</h5>
                  
                  <form @submit.prevent="submitForm">
                    <div class="mb-3">
                      <label for="name" class="form-label text-light">Nombre Completo</label>
                      <input 
                        type="text" 
                        class="form-control form-control-glow" 
                        id="name"
                        v-model="form.name"
                        required
                        maxlength="100"
                      >
                    </div>

                    <div class="mb-3">
                      <label for="email" class="form-label text-light">Correo Electrónico</label>
                      <input 
                        type="email" 
                        class="form-control form-control-glow" 
                        id="email"
                        v-model="form.email"
                        required
                        maxlength="100"
                      >
                    </div>

                    <div class="mb-3">
                      <label for="phone" class="form-label text-light">Teléfono</label>
                      <input 
                        type="tel" 
                        class="form-control form-control-glow" 
                        id="phone"
                        v-model="form.phone"
                        maxlength="20"
                      >
                    </div>

                    <div class="mb-3">
                      <label for="subject" class="form-label text-light">Asunto</label>
                      <select class="form-select form-control-glow" id="subject" v-model="form.subject" required>
                        <option value="">Selecciona un asunto</option>
                        <option value="consulta">Consulta General</option>
                        <option value="pedido">Información de Pedidos</option>
                        <option value="queja">Queja o Reclamo</option>
                        <option value="sugerencia">Sugerencia</option>
                        <option value="otros">Otros</option>
                      </select>
                    </div>

                    <div class="mb-4">
                      <label for="message" class="form-label text-light">Mensaje</label>
                      <textarea 
                        class="form-control form-control-glow" 
                        id="message" 
                        rows="4"
                        v-model="form.message"
                        required
                        maxlength="500"
                        placeholder="Escribe tu mensaje aquí..."
                      ></textarea>
                      <div class="form-text text-end text-light opacity-75">
                        {{ form.message.length }}/500 caracteres
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      class="btn btn-glow btn-primary w-100 py-2"
                      :disabled="loading"
                    >
                      <span v-if="loading">
                        <div class="spinner-border spinner-border-sm me-2" role="status"></div>
                        Enviando...
                      </span>
                      <span v-else>
                        <i class="fas fa-paper-plane me-2"></i> Enviar Mensaje
                      </span>
                    </button>
                  </form>
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
  name: 'ContactForm',
  data() {
    return {
      loading: false,
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    };
  },
  methods: {
    async submitForm() {
     
      const sanitizedForm = {
        name: this.$sanitize(this.form.name),
        email: this.$sanitize(this.form.email),
        phone: this.$sanitize(this.form.phone),
        subject: this.$sanitize(this.form.subject),
        message: this.$sanitize(this.form.message)
      };

      this.loading = true;

      try {
    
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        this.$showToast('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
        
       
        this.form = {
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        };
      } catch (error) {
        this.$showToast('Error al enviar el mensaje. Intenta nuevamente.', 'error');
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    console.log('ContactForm cargado con medidas de seguridad');
  }
};
</script>

<style scoped>
.contact-section {
  background: transparent;
}

.contact-info, .contact-form {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
}

.contact-method {
  transition: transform 0.3s ease;
}

.contact-method:hover {
  transform: translateX(5px);
}

.form-control-glow, .form-select.form-control-glow {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  transition: all 0.3s ease;
}

.form-control-glow:focus, .form-select.form-control-glow:focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: var(--primary-glow);
  box-shadow: 0 0 20px rgba(0, 102, 255, 0.3);
  color: white;
}

.form-control-glow::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-label {
  font-weight: 500;
}

.form-text {
  font-size: 0.875rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner-border {
  width: 1rem;
  height: 1rem;
}

@media (max-width: 768px) {
  .contact-method {
    text-align: center;
    flex-direction: column;
  }
  
  .contact-method i {
    margin-bottom: 0.5rem;
  }
}
</style>