<template>
  <div class="min-h-screen bg-transparent">
    <nav class="nav-bar nav-bar-client">
      <div class="nav-inner">
        <router-link to="/client" class="nav-brand">
          <img src="/favicon.svg" alt="" class="nav-brand-icon" width="28" height="28" />
          <span>Facility Reservation</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/client" class="nav-link" active-class="nav-link-active">Browse</router-link>
          <router-link
            v-if="auth.isClientLoggedIn"
            to="/client/reserve"
            class="nav-link"
            active-class="nav-link-active"
          >Reserve</router-link>
          <template v-if="auth.isClientLoggedIn">
            <span class="nav-user">{{ auth.currentClientName }}</span>
            <button type="button" class="nav-link nav-link-btn" @click="logout">Logout</button>
          </template>
          <template v-else>
            <router-link to="/client/login" class="nav-link">Login</router-link>
            <router-link to="/client/register" class="nav-link nav-link-cta">Register</router-link>
          </template>
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
  auth.logoutClient()
  router.push('/client')
}
</script>
