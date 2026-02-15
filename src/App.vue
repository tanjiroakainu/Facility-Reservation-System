<template>
  <div class="app-root">
    <Particles />
    <div class="app-content">
      <router-view />
    </div>
    <footer class="app-footer">
      <p class="app-footer-title">Facility Reservation System</p>
      <div class="app-footer-pill">
        <span class="app-footer-pill-label">Fullstack Developer</span>
        <span class="app-footer-pill-name">Raminder Jangao</span>
      </div>
      <p class="app-footer-built">Built with</p>
      <FooterTechIcons />
    </footer>
  </div>
</template>

<script setup lang="ts">
import Particles from '@/components/Particles.vue'
import FooterTechIcons from '@/components/FooterTechIcons.vue'
</script>
