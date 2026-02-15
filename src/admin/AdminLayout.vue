<template>
  <div class="min-h-screen bg-transparent">
    <nav class="nav-bar nav-bar-admin">
      <div class="nav-inner">
        <router-link to="/admin" class="nav-brand">
          <img src="/favicon.svg" alt="" class="nav-brand-icon" width="28" height="28" />
          <span>Facility Reservation — Admin</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/admin/facilities" class="nav-link" active-class="nav-link-active">Facilities</router-link>
          <router-link to="/admin/reservations" class="nav-link" active-class="nav-link-active">Reservations</router-link>
          <router-link to="/admin/users" class="nav-link" active-class="nav-link-active">Users</router-link>
          <button type="button" class="nav-link nav-link-btn" @click="logout">Logout</button>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const auth = useAuthStore()

function logout() {
  auth.logoutAdmin()
  router.push('/admin/login')
}
</script>
