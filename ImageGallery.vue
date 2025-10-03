<template>
  <div class="gallery-section py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="section-title text-glow mb-3">📸 Nuestra Galería</h2>
        <p class="section-subtitle">Momentos y productos de Casa del Río</p>
      </div>
      
      <div class="row g-4">
        <div class="col-md-6 col-lg-4" v-for="(image, index) in images" :key="index">
          <div class="gallery-card card-hover-3d glow-effect" @click="openLightbox(index)">
            <img :src="image.url" :alt="image.alt" class="img-fluid rounded-3" loading="lazy">
            <div class="image-overlay">
              <i class="fas fa-search-plus fa-2x text-white"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="lightboxOpen" class="lightbox-overlay" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="lightbox-close btn btn-glow btn-danger" @click="closeLightbox">
          <i class="fas fa-times"></i>
        </button>
        <button class="lightbox-nav lightbox-prev" @click="prevImage">
          <i class="fas fa-chevron-left"></i>
        </button>
        <img :src="currentImage.url" :alt="currentImage.alt" class="lightbox-image">
        <button class="lightbox-nav lightbox-next" @click="nextImage">
          <i class="fas fa-chevron-right"></i>
        </button>
        <div class="lightbox-caption">
          <h5 class="text-white">{{ currentImage.title }}</h5>
          <p class="text-light">{{ currentImage.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageGallery',
  data() {
    return {
      lightboxOpen: false,
      currentIndex: 0,
      images: [
        { 
          url: 'https://images.unsplash.com/photo-1604719312566-8912e7067b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
          alt: 'Pasillo de Abarrotes', 
          title: 'Pasillos Organizados', 
          description: 'Encuentra todo de manera fácil y rápida.' 
        },
        { 
          url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
          alt: 'Sección de Limpieza', 
          title: 'Todo para el Hogar', 
          description: 'Amplia variedad de productos de limpieza.' 
        },
        { 
          url: 'https://images.unsplash.com/photo-1566842600170-0bea8cb9dde6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
          alt: 'Fachada', 
          title: 'Nuestra Tienda', 
          description: 'Te esperamos con los brazos abiertos en Casa del Río.' 
        },
        { 
          url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
          alt: 'Snacks', 
          title: 'Snacks y Dulces', 
          description: 'Disfruta de la mejor selección de aperitivos.' 
        },
        { 
          url: 'https://images.unsplash.com/photo-1578911372312-8d179131a4c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
          alt: 'Bebidas', 
          title: 'Bebidas Refrescantes', 
          description: 'Gran variedad de bebidas para todos los gustos.' 
        },
        { 
          url: 'https://images.unsplash.com/photo-1587332278433-97428a9786c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
          alt: 'Atención al Cliente', 
          title: 'Atención Personalizada', 
          description: 'Nuestro equipo siempre listo para ayudarte.' 
        }
      ]
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    }
  },
  methods: {
    openLightbox(index) {
      this.currentIndex = index;
      this.lightboxOpen = true;
      document.body.style.overflow = 'hidden';
    },
    closeLightbox() {
      this.lightboxOpen = false;
      document.body.style.overflow = 'auto';
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    handleKeydown(event) {
      if (this.lightboxOpen) {
        if (event.key === 'Escape') this.closeLightbox();
        if (event.key === 'ArrowRight') this.nextImage();
        if (event.key === 'ArrowLeft') this.prevImage();
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeydown);
  }
};
</script>

<style scoped>
.gallery-section {
  background: transparent;
}

.gallery-card {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gallery-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-card:hover img {
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

.gallery-card:hover .image-overlay {
  opacity: 1;
}

/* Lightbox Styles */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 0.5rem;
}

.lightbox-close {
  position: absolute;
  top: -50px;
  right: 0;
  z-index: 10000;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 1rem;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.3);
}

.lightbox-prev {
  left: -70px;
}

.lightbox-next {
  right: -70px;
}

.lightbox-caption {
  position: absolute;
  bottom: -60px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
}

@media (max-width: 768px) {
  .lightbox-nav {
    width: 40px;
    height: 40px;
    padding: 0.5rem;
  }
  
  .lightbox-prev {
    left: -50px;
  }
  
  .lightbox-next {
    right: -50px;
  }
  
  .lightbox-close {
    top: -40px;
  }
}
</style>