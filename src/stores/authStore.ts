import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const ADMIN_EMAIL = 'admin@gmail.com'
const ADMIN_PASSWORD = 'admin123'

export interface ClientUser {
  id: string
  email: string
  password: string
  name: string
}

const DEFAULT_CLIENT: ClientUser = {
  id: 'client-default',
  email: 'client@gmail.com',
  password: 'client123',
  name: 'Client User',
}

export const useAuthStore = defineStore('auth', () => {
  const adminLoggedIn = ref(false)
  const clients = ref<ClientUser[]>([{ ...DEFAULT_CLIENT }])
  const currentClient = ref<ClientUser | null>(null)

  const isAdmin = computed(() => adminLoggedIn.value)
  const isClientLoggedIn = computed(() => !!currentClient.value)
  const currentClientName = computed(() => currentClient.value?.name ?? '')

  function loginAdmin(email: string, password: string): boolean {
    const e = String(email ?? '').trim().toLowerCase()
    const p = String(password ?? '').trim()
    if (e === ADMIN_EMAIL.toLowerCase() && p === ADMIN_PASSWORD) {
      adminLoggedIn.value = true
      return true
    }
    return false
  }

  function logoutAdmin() {
    adminLoggedIn.value = false
  }

  function registerClient(email: string, password: string, name: string): { ok: boolean; error?: string } {
    if (clients.value.some(c => c.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'Email already registered.' }
    }
    const id = 'c' + Date.now()
    clients.value.push({ id, email, password, name })
    return { ok: true }
  }

  function loginClient(email: string, password: string): boolean {
    const client = clients.value.find(
      c => c.email.toLowerCase() === email.toLowerCase() && c.password === password
    )
    if (client) {
      currentClient.value = client
      return true
    }
    return false
  }

  function logoutClient() {
    currentClient.value = null
  }

  function deleteClient(id: string) {
    if (currentClient.value?.id === id) currentClient.value = null
    clients.value = clients.value.filter(c => c.id !== id)
  }

  return {
    adminLoggedIn,
    currentClient,
    clients,
    isAdmin,
    isClientLoggedIn,
    currentClientName,
    loginAdmin,
    logoutAdmin,
    registerClient,
    loginClient,
    logoutClient,
    deleteClient,
  }
})
