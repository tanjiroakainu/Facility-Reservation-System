<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Facilities</h1>
      <p class="page-desc">Neon green = available to reserve. Neon red = currently unavailable.</p>
    </header>

    <div class="card p-4 mb-6">
      <h2 class="section-title mb-3">Availability at a glance</h2>
      <div class="h-52">
        <Doughnut v-if="availabilityChartData" :data="availabilityChartData" :options="chartOptions" />
      </div>
    </div>

    <div class="legend">
      <span class="legend-item">
        <span class="legend-dot legend-dot-available" aria-hidden="true" />
        Available
      </span>
      <span class="legend-item">
        <span class="legend-dot legend-dot-unavailable" aria-hidden="true" />
        Not available
      </span>
    </div>

    <div class="facility-grid">
      <div
        v-for="f in store.facilities"
        :key="f.id"
        :class="[
          'facility-card',
          f.available ? 'facility-card-available' : 'facility-card-unavailable'
        ]"
      >
        <div class="facility-card-inner">
          <div class="facility-card-content">
            <h2 class="facility-card-title">{{ f.name }}</h2>
            <p class="facility-card-desc">{{ f.description }}</p>
            <p class="facility-card-meta">Capacity: {{ f.capacity }} · {{ f.meters }} m²</p>
          </div>
          <span
            :class="['facility-status-dot', f.available ? 'bg-neon-green' : 'bg-neon-red']"
            :title="f.available ? 'Available' : 'Not available'"
            aria-label="Status"
          />
        </div>
        <router-link
          v-if="f.available && auth.isClientLoggedIn"
          :to="{ name: 'ClientReserve', query: { facilityId: f.id } }"
          class="facility-card-action facility-card-action-available"
        >
          Reserve →
        </router-link>
        <router-link
          v-else-if="f.available"
          :to="{ name: 'Login', query: { redirect: `/client/reserve?facilityId=${f.id}` } }"
          class="facility-card-action facility-card-action-login"
        >
          Login to reserve
        </router-link>
        <span v-else class="facility-card-action facility-card-action-unavailable">Currently unavailable</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useFacilityStore } from '@/stores/facilityStore'
import { useAuthStore } from '@/stores/authStore'
import { chartColors, doughnutOptions } from '@/utils/chartTheme'

ChartJS.register(ArcElement, Tooltip, Legend)

const store = useFacilityStore()
const auth = useAuthStore()

const availabilityChartData = computed(() => {
  const available = store.facilities.filter(f => f.available).length
  const unavailable = store.facilities.length - available
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
</script>
