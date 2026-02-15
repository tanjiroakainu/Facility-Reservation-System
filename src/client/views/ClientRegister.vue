<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <h1 class="auth-title">Client Registration</h1>
        <p class="auth-subtitle">Create an account to reserve facilities</p>
      </div>
      <div v-if="facilitiesChartData" class="mb-6 rounded-xl border border-neon-cyan/20 bg-chrome-900/50 p-4">
        <h2 class="section-title mb-2 text-base">Facilities you can book</h2>
        <div class="h-40">
          <Bar :data="facilitiesChartData" :options="chartOptions" />
        </div>
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
        <router-link to="/login" class="auth-link">Log in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { useAuthStore } from '@/stores/authStore'
import { useFacilityStore } from '@/stores/facilityStore'
import { chartColors, barOptions } from '@/utils/chartTheme'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const router = useRouter()
const auth = useAuthStore()
const facilityStore = useFacilityStore()

const facilitiesChartData = computed(() => ({
  labels: facilityStore.facilities.map(f => f.name),
  datasets: [{
    label: 'Capacity',
    data: facilityStore.facilities.map(f => f.capacity),
    backgroundColor: facilityStore.facilities.map(() => chartColors.cyan + 'cc'),
    borderColor: chartColors.cyan,
    borderWidth: 1,
  }],
}))

const chartOptions = barOptions()

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
    setTimeout(() => router.push('/login'), 1200)
  } else {
    error.value = result.error ?? 'Registration failed.'
  }
}
</script>
