<template>
  <div>
    <header class="page-header flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="page-title">Facilities Management</h1>
        <p class="page-desc">Add, edit, and delete facilities. Size is in square meters.</p>
      </div>
      <button
        v-if="!editingId && !showAdd"
        type="button"
        class="btn-primary"
        @click="openAdd"
      >
        Add facility
      </button>
    </header>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="card p-4">
        <h2 class="section-title mb-3">Capacity by facility</h2>
        <div class="h-64">
          <Bar v-if="facilityChartData" :data="facilityChartData" :options="facilityChartOptions" />
        </div>
      </div>
      <div class="card p-4">
        <h2 class="section-title mb-3">Availability</h2>
        <div class="h-64">
          <Doughnut v-if="availabilityChartData" :data="availabilityChartData" :options="availabilityChartOptions" />
        </div>
      </div>
    </div>

    <!-- Add / Edit form -->
    <div v-if="showAdd || editingId" class="card p-6 mb-6">
      <h2 class="section-title mb-4">{{ editingId ? 'Edit facility' : 'New facility' }}</h2>
      <form class="space-y-4 max-w-2xl" @submit.prevent="saveFacility">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="fac-name">Name</label>
            <input id="fac-name" v-model="form.name" type="text" required class="form-input" placeholder="Facility name" />
          </div>
          <div class="form-group">
            <label class="form-label" for="fac-capacity">Capacity</label>
            <input id="fac-capacity" v-model.number="form.capacity" type="number" min="1" required class="form-input" placeholder="0" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="fac-meters">Area (m²)</label>
            <input id="fac-meters" v-model.number="form.meters" type="number" min="0" step="0.01" required class="form-input" placeholder="0" />
          </div>
          <div class="form-group flex items-end">
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="form.available" type="checkbox" class="rounded border-neon-cyan/50 bg-chrome-900 text-neon-cyan focus:ring-neon-cyan" />
              <span class="form-label mb-0">Available</span>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="fac-desc">Description</label>
          <textarea id="fac-desc" v-model="form.description" rows="2" class="form-input resize-y" placeholder="Short description" />
        </div>
        <div class="flex gap-3">
          <button type="submit" class="btn-primary">{{ editingId ? 'Update' : 'Add' }}</button>
          <button type="button" class="btn-secondary" @click="cancelForm">Cancel</button>
        </div>
      </form>
    </div>

    <div class="card overflow-hidden">
      <div class="table-wrap">
      <table class="table">
        <thead class="table-head">
          <tr>
            <th class="table-th">Name</th>
            <th class="table-th">Description</th>
            <th class="table-th">Capacity</th>
            <th class="table-th">Area (m²)</th>
            <th class="table-th">Status</th>
            <th class="table-th">Actions</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="f in store.facilities" :key="f.id" class="table-row">
            <td class="table-td font-medium text-slate-200">{{ f.name }}</td>
            <td class="table-td text-slate-400">{{ f.description }}</td>
            <td class="table-td text-slate-400">{{ f.capacity }}</td>
            <td class="table-td text-slate-400">{{ f.meters }}</td>
            <td class="table-td">
              <span :class="f.available ? 'badge badge-success' : 'badge badge-danger'" class="badge">
                {{ f.available ? 'Available' : 'Not available' }}
              </span>
            </td>
            <td class="table-td">
              <div class="flex flex-wrap gap-2">
                <button
                  type="button"
                  :class="f.available ? 'link-amber' : 'link-success'"
                  @click="toggleAvailability(f.id)"
                >
                  {{ f.available ? 'Unavailable' : 'Available' }}
                </button>
                <button type="button" class="link-success" @click="openEdit(f)">Edit</button>
                <button type="button" class="text-neon-red hover:underline" @click="confirmDelete(f)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Bar, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { useFacilityStore } from '@/stores/facilityStore'
import { chartColors, barOptions, doughnutOptions } from '@/utils/chartTheme'
import type { Facility } from '@/types/facility'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const store = useFacilityStore()

const facilityChartData = computed(() => ({
  labels: store.facilities.map(f => f.name),
  datasets: [{
    label: 'Capacity',
    data: store.facilities.map(f => f.capacity),
    backgroundColor: store.facilities.map(() => chartColors.cyan + 'cc'),
    borderColor: chartColors.cyan,
    borderWidth: 1,
  }],
}))

const facilityChartOptions = barOptions()

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

const availabilityChartOptions = doughnutOptions()

const showAdd = ref(false)
const editingId = ref<string | null>(null)
const form = reactive({
  name: '',
  description: '',
  capacity: 10,
  meters: 0,
  available: true,
})

function resetForm() {
  form.name = ''
  form.description = ''
  form.capacity = 10
  form.meters = 0
  form.available = true
  editingId.value = null
  showAdd.value = false
}

function openAdd() {
  resetForm()
  showAdd.value = true
}

function openEdit(f: Facility) {
  editingId.value = f.id
  form.name = f.name
  form.description = f.description
  form.capacity = f.capacity
  form.meters = f.meters
  form.available = f.available
}

function cancelForm() {
  resetForm()
}

function saveFacility() {
  if (editingId.value) {
    store.updateFacility(editingId.value, {
      name: form.name,
      description: form.description,
      capacity: form.capacity,
      meters: form.meters,
      available: form.available,
    })
  } else {
    store.addFacility({
      name: form.name,
      description: form.description,
      capacity: form.capacity,
      meters: form.meters,
      available: form.available,
    })
  }
  resetForm()
}

function toggleAvailability(id: string) {
  const f = store.facilities.find(x => x.id === id)
  if (f) store.setFacilityAvailability(id, !f.available)
}

function confirmDelete(f: Facility) {
  if (window.confirm(`Delete "${f.name}"? This cannot be undone.`)) {
    store.deleteFacility(f.id)
  }
}
</script>
