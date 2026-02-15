<template>
  <div class="min-h-screen bg-transparent">
    <nav class="nav-bar nav-bar-admin">
      <div class="nav-inner">
        <router-link to="/client" class="nav-brand">
          <img src="/favicon.svg" alt="" class="nav-brand-icon" width="28" height="28" />
          <span>Facility Reservation</span>
        </router-link>
        <router-link to="/client" class="nav-link">← Back to site</router-link>
      </div>
    </nav>
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <h1 class="auth-title">Admin Login</h1>
          <p class="auth-subtitle">Facility Reservation System — Sign in with your admin account</p>
        </div>
        <div class="mb-5 rounded-xl border border-neon-cyan/30 bg-chrome-900/50 p-4">
          <h2 class="text-sm font-semibold text-neon-cyan/90 uppercase tracking-wider mb-2">Admin login guide</h2>
          <p class="text-slate-300 text-sm mb-1"><span class="text-slate-500">Email:</span> <code class="text-neon-cyan font-mono text-xs bg-chrome-800 px-1.5 py-0.5 rounded">admin@gmail.com</code></p>
          <p class="text-slate-300 text-sm"><span class="text-slate-500">Password:</span> <code class="text-neon-cyan font-mono text-xs bg-chrome-800 px-1.5 py-0.5 rounded">admin123</code></p>
        </div>
        <div v-if="availabilityChartData" class="mb-5 rounded-xl border border-neon-cyan/20 bg-chrome-900/50 p-3">
          <h2 class="text-sm font-semibold text-neon-cyan/90 uppercase tracking-wider mb-2">System overview</h2>
          <div class="h-36">
            <Doughnut :data="availabilityChartData" :options="chartOptions" />
          </div>
        </div>
        <form class="auth-form" @submit.prevent="submit">
          <div v-if="error" class="auth-error">{{ error }}</div>
          <div class="form-group">
            <label class="form-label" for="login-email">Email</label>
            <input
              id="login-email"
              v-model="email"
              type="email"
              required
              autocomplete="email"
              class="form-input"
              placeholder="admin@gmail.com"
            />
          </div>
          <div class="form-group">
            <label class="form-label" for="login-password">Password</label>
            <input
              id="login-password"
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
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useAuthStore } from '@/stores/authStore'
import { useFacilityStore } from '@/stores/facilityStore'
import { chartColors, doughnutOptions } from '@/utils/chartTheme'

ChartJS.register(ArcElement, Tooltip, Legend)

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const facilityStore = useFacilityStore()

const availabilityChartData = computed(() => {
  const available = facilityStore.facilities.filter(f => f.available).length
  const unavailable = facilityStore.facilities.length - available
  return {
    labels: ['Available', 'Unavailable'],
    datasets: [{
      data: [available, unavailable],
      backgroundColor: [chartColors.green + 'dd', chartColors.red + 'dd'],
      borderColor: [chartColors.green, chartColors.red],
      borderWidth: 2,
    }],
  }
})

const chartOptions = doughnutOptions()

const email = ref('')
const password = ref('')
const error = ref('')

function submit() {
  error.value = ''
  const redirect = (route.query.redirect as string)?.trim() || ''

  if (auth.loginAdmin(email.value, password.value)) {
    router.replace(redirect && redirect.startsWith('/admin') ? redirect : '/admin')
    return
  }
  if (auth.loginClient(email.value, password.value)) {
    router.replace(redirect && redirect.startsWith('/client') ? redirect : '/client')
    return
  }
  error.value = 'Invalid email or password. Use admin: admin@gmail.com / admin123'
}
</script>
