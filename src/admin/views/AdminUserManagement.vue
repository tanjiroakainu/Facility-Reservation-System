<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">User Management</h1>
      <p class="page-desc">View and manage registered client accounts. Admin account is fixed.</p>
    </header>

    <!-- System admin (read-only) -->
    <div class="card p-6 mb-6">
      <h2 class="section-title mb-3">System admin</h2>
      <p class="text-slate-400 text-sm mb-2">The admin account cannot be edited or removed from this panel.</p>
      <div class="flex flex-wrap gap-4 text-slate-300">
        <span><strong class="text-slate-200">Email:</strong> admin@gmail.com</span>
        <span><strong class="text-slate-200">Role:</strong> Admin</span>
      </div>
    </div>

    <!-- Clients list -->
    <div class="card overflow-hidden">
      <div class="p-4 border-b border-neon-cyan/20 bg-chrome-900/50">
        <h2 class="section-title mb-0">Registered clients</h2>
        <p class="text-slate-400 text-sm mt-1">{{ store.clients.length }} user(s)</p>
      </div>
      <div class="table-wrap">
      <table class="table">
        <thead class="table-head">
          <tr>
            <th class="table-th">Name</th>
            <th class="table-th">Email</th>
            <th class="table-th">ID</th>
            <th class="table-th">Actions</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="c in store.clients" :key="c.id" class="table-row">
            <td class="table-td font-medium text-slate-200">{{ c.name }}</td>
            <td class="table-td text-slate-400">{{ c.email }}</td>
            <td class="table-td text-slate-500 text-xs font-mono">{{ c.id }}</td>
            <td class="table-td">
              <button
                type="button"
                class="text-neon-red hover:underline text-sm font-medium"
                @click="confirmDelete(c)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <div v-if="store.clients.length === 0" class="p-8 text-center text-slate-500">
        No registered clients yet.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import type { ClientUser } from '@/stores/authStore'

const store = useAuthStore()

function confirmDelete(user: ClientUser) {
  if (window.confirm(`Delete user "${user.name}" (${user.email})? This cannot be undone.`)) {
    store.deleteClient(user.id)
  }
}
</script>
