export interface Facility {
  id: string
  name: string
  description: string
  capacity: number
  meters: number
  available: boolean
}

export interface Reservation {
  id: string
  facilityId: string
  facilityName: string
  clientName: string
  date: string
  startTime: string
  endTime: string
  status: 'pending' | 'confirmed' | 'cancelled'
}
