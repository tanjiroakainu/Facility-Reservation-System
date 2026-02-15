<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Reservations</h1>
      <p class="page-desc">View and manage all facility reservations.</p>
    </header>
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
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFacilityStore } from '@/stores/facilityStore'
import type { Reservation } from '@/types/facility'

const store = useFacilityStore()

function statusClass(status: Reservation['status']) {
  if (status === 'confirmed') return 'badge badge-success'
  if (status === 'cancelled') return 'badge badge-danger'
  return 'badge badge-warning'
}
</script>
