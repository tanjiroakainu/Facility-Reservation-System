<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <h1 class="auth-title">Client Registration</h1>
        <p class="auth-subtitle">Create an account to reserve facilities</p>
      </div>
      <form class="auth-form" @submit.prevent="submit">
        <div v-if="error" class="auth-error">{{ error }}</div>
        <div v-if="success" class="auth-success">Account created. You can now log in.</div>
        <div class="form-group">
          <label class="form-label" for="reg-name">Full name</label>
          <input
            id="reg-name"
            v-model="name"
            type="text"
            required
            class="form-input"
            placeholder="Your name"
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="reg-email">Email</label>
          <input
            id="reg-email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="form-input"
            placeholder="you@example.com"
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="reg-password">Password</label>
          <input
            id="reg-password"
            v-model="password"
            type="password"
            required
            autocomplete="new-password"
            class="form-input"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" class="auth-btn">Register</button>
      </form>
      <p class="auth-footer">
        Already have an account?
        <router-link to="/client/login" class="auth-link">Log in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const auth = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref(false)

function submit() {
  error.value = ''
  success.value = false
  const result = auth.registerClient(email.value, password.value, name.value)
  if (result.ok) {
    success.value = true
    setTimeout(() => router.push('/client/login'), 1200)
  } else {
    error.value = result.error ?? 'Registration failed.'
  }
}
</script>
