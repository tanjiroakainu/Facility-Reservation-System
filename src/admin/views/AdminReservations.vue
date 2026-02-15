<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Reservations</h1>
      <p class="page-desc">View and manage all facility reservations.</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="card p-4">
        <h2 class="section-title mb-3">Reservations by facility</h2>
        <div class="h-64">
          <Bar v-if="byFacilityChartData" :data="byFacilityChartData" :options="barChartOptions" />
        </div>
      </div>
      <div class="card p-4">
        <h2 class="section-title mb-3">By status</h2>
        <div class="h-64">
          <Doughnut v-if="byStatusChartData" :data="byStatusChartData" :options="doughnutChartOptions" />
        </div>
      </div>
    </div>

    <div class="card overflow-hidden">
      <div class="table-wrap">
      <table class="table">
        <thead class="table-head">
          <tr>
            <th class="table-th">Facility</th>
            <th class="table-th">Client</th>
            <th class="table-th">Date</th>
            <th class="table-th">Time</th>
            <th class="table-th">Status</th>
            <th class="table-th">Update status</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="r in store.reservations" :key="r.id" class="table-row">
            <td class="table-td font-medium text-slate-200">{{ r.facilityName }}</td>
            <td class="table-td text-slate-400">{{ r.clientName }}</td>
            <td class="table-td text-slate-400">{{ r.date }}</td>
            <td class="table-td text-slate-400">{{ r.startTime }} – {{ r.endTime }}</td>
            <td class="table-td">
              <span :class="statusClass(r.status)" class="badge">
                {{ r.status }}
              </span>
            </td>
            <td class="table-td">
              <select
                :value="r.status"
                class="form-input py-1.5 px-2 text-sm min-h-0 w-full max-w-[140px]"
                @change="onStatusChange(r.id, ($event.target as HTMLSelectElement).value)"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { useFacilityStore } from '@/stores/facilityStore'
import { chartColors, barOptions, doughnutOptions } from '@/utils/chartTheme'
import type { Reservation } from '@/types/facility'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const store = useFacilityStore()

const byFacilityChartData = computed(() => {
  const byName: Record<string, number> = {}
  store.reservations.forEach(r => {
    byName[r.facilityName] = (byName[r.facilityName] ?? 0) + 1
  })
  const labels = Object.keys(byName).length ? Object.keys(byName) : ['No reservations']
  const data = labels.map(l => byName[l] ?? 0)
  return {
    labels,
    datasets: [{
      label: 'Reservations',
      data,
      backgroundColor: data.map(() => chartColors.cyan + 'cc'),
      borderColor: chartColors.cyan,
      borderWidth: 1,
    }],
  }
})

const barChartOptions = barOptions()

const byStatusChartData = computed(() => {
  const pending = store.reservations.filter(r => r.status === 'pending').length
  const confirmed = store.reservations.filter(r => r.status === 'confirmed').length
  const completed = store.reservations.filter(r => r.status === 'completed').length
  const cancelled = store.reservations.filter(r => r.status === 'cancelled').length
  return {
    labels: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    datasets: [{
      data: [pending, confirmed, completed, cancelled],
      backgroundColor: [chartColors.amber + 'dd', chartColors.cyan + 'dd', chartColors.green + 'dd', chartColors.red + 'dd'],
      borderColor: [chartColors.amber, chartColors.cyan, chartColors.green, chartColors.red],
      borderWidth: 2,
    }],
  }
})

const doughnutChartOptions = doughnutOptions()

const statusOptions: Reservation['status'][] = ['pending', 'confirmed', 'completed', 'cancelled']

function onStatusChange(id: string, value: string) {
  if (statusOptions.includes(value as Reservation['status'])) {
    store.updateReservationStatus(id, value as Reservation['status'])
  }
}

function statusClass(status: Reservation['status']) {
  if (status === 'completed') return 'badge badge-success'
  if (status === 'confirmed') return 'badge badge-success'
  if (status === 'cancelled') return 'badge badge-danger'
  return 'badge badge-warning'
}
</script>
