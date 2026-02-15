<template>
  <div class="min-h-screen bg-transparent">
    <nav class="nav-bar nav-bar-admin">
      <div class="nav-inner">
        <span class="nav-brand">
          <img src="/favicon.svg" alt="" class="nav-brand-icon" width="28" height="28" />
          <span>Admin Login</span>
        </span>
        <router-link to="/client" class="nav-link">← Back to client</router-link>
      </div>
    </nav>
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <h1 class="auth-title">Admin Login</h1>
          <p class="auth-subtitle">Facility Reservation System</p>
        </div>
        <form class="auth-form" @submit.prevent="submit">
          <div v-if="error" class="auth-error">{{ error }}</div>
          <div class="form-group">
            <label class="form-label" for="admin-email">Email</label>
            <input
              id="admin-email"
              v-model="email"
              type="email"
              required
              autocomplete="email"
              class="form-input"
              placeholder="admin@gmail.com"
            />
          </div>
          <div class="form-group">
            <label class="form-label" for="admin-password">Password</label>
            <input
              id="admin-password"
              v-model="password"
              type="password"
              required
              autocomplete="current-password"
              class="form-input"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" class="auth-btn">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

function submit() {
  error.value = ''
  const redirect = (route.query.redirect as string)?.trim() || '/admin'
  if (auth.loginAdmin(email.value, password.value)) {
    router.replace(redirect)
  } else {
    error.value = 'Invalid email or password. Use admin@gmail.com / admin123'
  }
}
</script>
