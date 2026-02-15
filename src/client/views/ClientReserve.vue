<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Reserve a facility</h1>
      <p class="page-desc">Select an available facility and fill in the details.</p>
    </header>

    <section class="section-card mb-8">
      <h2 class="section-title">Availability at a glance</h2>
      <div class="availability-chips">
        <router-link
          v-for="f in store.facilities"
          :key="f.id"
          :to="{ name: 'ClientReserve', query: { facilityId: f.id } }"
          :class="[
            'chip',
            selectedId === f.id ? 'chip-selected' : '',
            f.available ? 'chip-available' : 'chip-unavailable'
          ]"
        >
          {{ f.name }} — {{ f.available ? 'Available' : 'Unavailable' }}
        </router-link>
      </div>
    </section>

    <div v-if="selected && selected.available" class="card form-card">
      <p class="form-card-intro">Reserving: <strong>{{ selected.name }}</strong></p>
      <p v-if="auth.isClientLoggedIn" class="text-sm text-slate-400 mb-4">Reservation will be under your account: <strong class="text-neon-cyan">{{ auth.currentClientName }}</strong></p>
      <form class="reserve-form" @submit.prevent="submit">
        <div class="form-group">
          <label class="form-label" for="res-name">Your name</label>
          <input
            id="res-name"
            v-model="form.clientName"
            type="text"
            required
            readonly
            class="form-input bg-chrome-900"
            placeholder="Your name"
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="res-date">Date</label>
          <input id="res-date" v-model="form.date" type="date" required class="form-input" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="res-start">Start time</label>
            <input id="res-start" v-model="form.startTime" type="time" required class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label" for="res-end">End time</label>
            <input id="res-end" v-model="form.endTime" type="time" required class="form-input" />
          </div>
        </div>
        <button type="submit" class="btn-primary w-full py-3">Submit reservation</button>
      </form>
    </div>
    <p v-else-if="selectedId && !selected" class="text-slate-400">Facility not found.</p>
    <p v-else-if="selectedId && selected && !selected.available" class="text-neon-red font-medium">This facility is not available for reservation.</p>
    <p v-else class="text-slate-400">Select a facility above to make a reservation.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFacilityStore } from '@/stores/facilityStore'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const store = useFacilityStore()
const auth = useAuthStore()

const selectedId = ref<string | null>((route.query.facilityId as string) ?? null)
const form = ref({
  clientName: auth.currentClientName || '',
  date: '',
  startTime: '',
  endTime: '',
})

onMounted(() => {
  if (auth.currentClientName) form.value.clientName = auth.currentClientName
})

watch(() => auth.currentClientName, (name) => {
  if (name) form.value.clientName = name
})

watch(() => route.query.facilityId, (id) => { selectedId.value = (id as string) ?? null })

const selected = computed(() =>
  selectedId.value ? store.facilities.find(f => f.id === selectedId.value) ?? null : null
)

function submit() {
  const f = selected.value
  if (!f) return
  store.addReservation({
    facilityId: f.id,
    facilityName: f.name,
    clientName: form.value.clientName,
    date: form.value.date,
    startTime: form.value.startTime,
    endTime: form.value.endTime,
    status: 'confirmed',
  })
  form.value = { clientName: auth.currentClientName || '', date: '', startTime: '', endTime: '' }
  selectedId.value = null
  alert('Reservation submitted.')
}
</script>
