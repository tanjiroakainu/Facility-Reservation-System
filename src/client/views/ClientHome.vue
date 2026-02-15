<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Facilities</h1>
      <p class="page-desc">Neon green = available to reserve. Neon red = currently unavailable.</p>
    </header>

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
          :to="{ name: 'ClientLogin', query: { redirect: `/client/reserve?facilityId=${f.id}` } }"
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
import { useFacilityStore } from '@/stores/facilityStore'
import { useAuthStore } from '@/stores/authStore'

const store = useFacilityStore()
const auth = useAuthStore()
</script>
