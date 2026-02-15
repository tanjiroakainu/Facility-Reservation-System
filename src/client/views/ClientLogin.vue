<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <h1 class="auth-title">Client Login</h1>
        <p class="auth-subtitle">Sign in to manage your reservations</p>
      </div>
      <form class="auth-form" @submit.prevent="submit">
        <div v-if="error" class="auth-error">{{ error }}</div>
        <div class="form-group">
          <label class="form-label" for="client-email">Email</label>
          <input
            id="client-email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="form-input"
            placeholder="you@example.com"
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="client-password">Password</label>
          <input
            id="client-password"
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
      <p class="auth-footer">
        Don't have an account?
        <router-link to="/client/register" class="auth-link">Register</router-link>
        <span class="block mt-3 text-slate-500">
          Admin?
          <router-link to="/login" class="auth-link">Sign in</router-link>
        </span>
      </p>
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
  // Admin credentials work here too: log in as admin and go to admin dashboard
  if (auth.loginAdmin(email.value, password.value)) {
    router.replace('/admin')
    return
  }
  if (auth.loginClient(email.value, password.value)) {
    const redirect = (route.query.redirect as string) || '/client'
    router.replace(redirect)
  } else {
    error.value = 'Invalid email or password. Admin: admin@gmail.com / admin123 — Client: client@gmail.com / client123'
  }
}
</script>
