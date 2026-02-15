import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Facility, Reservation } from '@/types/facility'

const defaultFacilities: Facility[] = [
  { id: '1', name: 'Meeting Room A', description: 'Conference room with projector', capacity: 10, meters: 45, available: true },
  { id: '2', name: 'Meeting Room B', description: 'Small meeting room', capacity: 6, meters: 25, available: false },
  { id: '3', name: 'Event Hall', description: 'Large event space', capacity: 100, meters: 350, available: true },
  { id: '4', name: 'Training Room', description: 'Training and workshops', capacity: 25, meters: 80, available: true },
  { id: '5', name: 'Studio', description: 'Recording and media studio', capacity: 8, meters: 30, available: false },
]

const defaultReservations: Reservation[] = [
  { id: 'r1', facilityId: '2', facilityName: 'Meeting Room B', clientName: 'John Doe', date: '2025-02-15', startTime: '09:00', endTime: '11:00', status: 'confirmed' },
  { id: 'r2', facilityId: '5', facilityName: 'Studio', clientName: 'Jane Smith', date: '2025-02-15', startTime: '14:00', endTime: '16:00', status: 'confirmed' },
]

export const useFacilityStore = defineStore('facility', () => {
  const facilities = ref<Facility[]>([...defaultFacilities])
  const reservations = ref<Reservation[]>([...defaultReservations])

  const availableFacilities = computed(() => facilities.value.filter(f => f.available))
  const unavailableFacilities = computed(() => facilities.value.filter(f => !f.available))

  function setFacilityAvailability(id: string, available: boolean) {
    const f = facilities.value.find(x => x.id === id)
    if (f) f.available = available
  }

  function addFacility(facility: Omit<Facility, 'id'>) {
    const id = String(Date.now())
    facilities.value.push({ ...facility, id })
  }

  function updateFacility(id: string, data: Partial<Omit<Facility, 'id'>>) {
    const f = facilities.value.find(x => x.id === id)
    if (f) Object.assign(f, data)
  }

  function deleteFacility(id: string) {
    facilities.value = facilities.value.filter(x => x.id !== id)
  }

  function addReservation(res: Omit<Reservation, 'id'>) {
    reservations.value.push({ ...res, id: 'r' + Date.now() })
  }

  return {
    facilities,
    reservations,
    availableFacilities,
    unavailableFacilities,
    setFacilityAvailability,
    addFacility,
    updateFacility,
    deleteFacility,
    addReservation,
  }
})
