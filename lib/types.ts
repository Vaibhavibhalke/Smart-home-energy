// Energy data types
export interface EnergyData {
  id: string
  deviceId: string
  deviceName: string
  deviceType: string
  consumption: number
  timestamp: string
}

// Device types
export interface Device {
  id: string
  name: string
  type: string
  location: string
  status: "active" | "inactive"
  currentUsage: number
  threshold: number
}

// Alert types
export interface Alert {
  id: string
  deviceId: string
  deviceName: string
  message: string
  timestamp: Date
  read: boolean
}

// User types
export interface User {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

// Budget types
export interface Budget {
  id: string
  monthlyLimit: number
  alertThreshold: number
  currentUsage: number
}

