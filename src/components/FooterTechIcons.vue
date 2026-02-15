<template>
  <div class="footer-tech-icons" aria-label="Built with Vue, TypeScript, Vite, Tailwind CSS, Pinia, Vue Router">
    <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer" class="footer-tech-icon" title="Vue 3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="footer-tech-svg"><path fill="currentColor" d="M78.8 10L64 35.4 49.2 10H0l64 110 64-110H78.8zM64 75.6L18.9 18h28.2L64 52.6 80.9 18h28.2L64 75.6z"/></svg>
    </a>
    <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" class="footer-tech-icon" title="TypeScript">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="footer-tech-svg"><path fill="currentColor" d="M2 0v128h124V0H2zm71.5 107.5h-10.2V67.2h10.2v40.3zm10.2-45.4c.5 4.9 2.2 8.6 5.1 11.2 2.9 2.6 7.2 3.9 12.8 3.9 4.2 0 7.8-.8 10.7-2.3 2.9-1.5 5-3.5 6.2-5.9 1.2-2.4 1.8-4.9 1.8-7.5 0-3.2-.7-5.9-2.2-8.1-1.4-2.2-3.9-4.3-7.3-6.4l-3.2-2.1c-3.4-2.2-5.8-4.5-7.1-6.8-1.3-2.3-2-4.8-2-7.4 0-2 .4-3.8 1.1-5.4.8-1.6 1.8-3 3.2-4.1 1.4-1.1 3-2 4.9-2.6 1.9-.6 4-1 6.3-1 2.3 0 4.4.3 6.3 1 1.9.7 3.5 1.6 4.9 2.8 1.4 1.2 2.5 2.6 3.3 4.2.8 1.6 1.2 3.3 1.2 5.1v25.2h10.2V72.6c0-3.1-.6-5.8-1.7-8.2-1.2-2.4-2.8-4.5-5-6.2-2.2-1.8-4.8-3.1-7.9-4-3.1-.9-6.5-1.3-10.3-1.3-3.8 0-7.2.5-10.2 1.4-3 .9-5.6 2.2-7.8 3.9-2.2 1.7-3.9 3.6-5.1 5.8-1.2 2.2-1.8 4.5-1.8 7.1 0 3.2.8 5.9 2.3 8.1 1.5 2.2 4 4.3 7.4 6.4l3.2 2.1c3.4 2.2 5.8 4.5 7.1 6.8 1.3 2.3 2 4.8 2 7.4 0 2-.4 3.8-1.1 5.4-.8 1.6-1.8 3-3.2 4.1-1.4 1.1-3 2-4.9 2.6-1.9.6-4 1-6.3 1-2.3 0-4.4-.3-6.3-1-1.9-.7-3.5-1.6-4.9-2.8-1.4-1.2-2.5-2.6-3.3-4.2-.8-1.6-1.2-3.3-1.2-5.1V62.1H54.5v20.1z"/></svg>
    </a>
    <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" class="footer-tech-icon" title="Vite">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="footer-tech-svg"><path fill="currentColor" d="M124.2 44.9L67.4 2.3c-1.2-.9-2.7-1.4-4.2-1.4-1.5 0-2.9.5-4.2 1.4L3.8 44.9c-2.5 1.9-4.1 4.8-4.1 8 0 3.2 1.6 6.1 4.1 8l27.2 20.9 55.1 42.3c1.2.9 2.7 1.4 4.2 1.4 1.5 0 2.9-.5 4.2-1.4l55.1-42.3 27.2-20.9c2.5-1.9 4.1-4.8 4.1-8s-1.6-6.1-4.1-8zM64 88.5c-2.3 0-4.5-.6-6.4-1.7L12.2 63.1 64 25.2l51.8 37.9-45.4 23.7c-1.9 1.1-4.1 1.7-6.4 1.7z"/></svg>
    </a>
    <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" class="footer-tech-icon" title="Tailwind CSS">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="footer-tech-svg"><path fill="currentColor" d="M64 26.2c-17 0-27.8 8.5-32.4 25.5 6.4-8.5 13.8-11.7 22.2-9.6 4.8 1.2 8.2 4.6 12 8.5 6.5 6.5 14 14 24.4 14 17 0 27.8-8.5 32.4-25.5-6.4 8.5-13.8 11.7-22.2 9.6-4.8-1.2-8.2-4.6-12-8.5-6.5-6.5-14-14-24.4-14zM31.6 52.2C14.6 52.2 0 65.4 0 82.2s14.6 30 31.6 30c17 0 27.8-8.5 32.4-25.5-6.4 8.5-13.8 11.7-22.2 9.6-4.8-1.2-8.2-4.6-12-8.5-6.5-6.5-14-14-24.4-14-17 0-31.6 13.2-31.6 30s14.6 30 31.6 30c17 0 27.8-8.5 32.4-25.5-6.4 8.5-13.8 11.7-22.2 9.6-4.8-1.2-8.2-4.6-12-8.5C49.2 87 41.6 79.5 31.6 79.5c-17 0-31.6 13.2-31.6 30s14.6 30 31.6 30c17 0 32.4-13.2 32.4-30s-15.4-27.3-32.4-27.3z"/></svg>
    </a>
    <a href="https://pinia.vuejs.org" target="_blank" rel="noopener noreferrer" class="footer-tech-icon" title="Pinia">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="footer-tech-svg"><path fill="currentColor" d="M64 8.2L16 128h32l16-48 16 48h32L64 8.2zm0 32l8 24h-16l8-24z"/></svg>
    </a>
    <a href="https://router.vuejs.org" target="_blank" rel="noopener noreferrer" class="footer-tech-icon" title="Vue Router">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="footer-tech-svg"><path fill="currentColor" d="M64 8.2c-31.5 0-57 25.5-57 57s25.5 57 57 57 57-25.5 57-57-25.5-57-57-57zm0 10.2c25.8 0 46.8 21 46.8 46.8S89.8 112 64 112 17.2 91 17.2 65.2 38.2 18.4 64 18.4zM64 32c-18.2 0-33 14.8-33 33s14.8 33 33 33 33-14.8 33-33-14.8-33-33-33zm0 10.2c12.6 0 22.8 10.2 22.8 22.8S76.6 87.8 64 87.8 41.2 77.6 41.2 65 51.4 42.2 64 42.2z"/></svg>
    </a>
  </div>
</template>

<script setup lang="ts">
</script>
