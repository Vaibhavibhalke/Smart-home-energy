import type { EnergyData, Device, User, Budget } from "./types"

// Mock data for energy consumption
const mockEnergyData: EnergyData[] = [
  // Today
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `energy-${Date.now()}-${i}`,
    deviceId: "device-1",
    deviceName: "Smart Refrigerator",
    deviceType: "Appliance",
    consumption: 0.5 + Math.random() * 0.3,
    timestamp: new Date(new Date().setHours(i, 0, 0, 0)).toISOString(),
  })),
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `energy-${Date.now()}-${i + 100}`,
    deviceId: "device-2",
    deviceName: "HVAC System",
    deviceType: "Climate Control",
    consumption: 1.2 + Math.random() * 0.8,
    timestamp: new Date(new Date().setHours(i, 0, 0, 0)).toISOString(),
  })),
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `energy-${Date.now()}-${i + 200}`,
    deviceId: "device-3",
    deviceName: "Smart TV",
    deviceType: "Entertainment",
    consumption: 0.2 + Math.random() * 0.3,
    timestamp: new Date(new Date().setHours(i, 0, 0, 0)).toISOString(),
  })),
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `energy-${Date.now()}-${i + 300}`,
    deviceId: "device-4",
    deviceName: "Washing Machine",
    deviceType: "Appliance",
    consumption: i >= 18 && i <= 20 ? 1.5 + Math.random() * 0.5 : 0.1,
    timestamp: new Date(new Date().setHours(i, 0, 0, 0)).toISOString(),
  })),
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `energy-${Date.now()}-${i + 400}`,
    deviceId: "device-5",
    deviceName: "Smart Lights",
    deviceType: "Lighting",
    consumption: (i >= 6 && i <= 8) || (i >= 18 && i <= 23) ? 0.3 + Math.random() * 0.2 : 0.05,
    timestamp: new Date(new Date().setHours(i, 0, 0, 0)).toISOString(),
  })),
]

// Mock data for devices
const mockDevices: Device[] = [
  {
    id: "device-1",
    name: "Smart Refrigerator",
    type: "Appliance",
    location: "Kitchen",
    status: "active",
    currentUsage: 0.6,
    threshold: 1.0,
  },
  {
    id: "device-2",
    name: "HVAC System",
    type: "Climate Control",
    location: "Whole House",
    status: "active",
    currentUsage: 1.5,
    threshold: 2.0,
  },
  {
    id: "device-3",
    name: "Smart TV",
    type: "Entertainment",
    location: "Living Room",
    status: "inactive",
    currentUsage: 0.0,
    threshold: 0.5,
  },
  {
    id: "device-4",
    name: "Washing Machine",
    type: "Appliance",
    location: "Laundry Room",
    status: "inactive",
    currentUsage: 0.0,
    threshold: 1.5,
  },
  {
    id: "device-5",
    name: "Smart Lights",
    type: "Lighting",
    location: "Whole House",
    status: "active",
    currentUsage: 0.3,
    threshold: 0.5,
  },
  {
    id: "device-6",
    name: "Electric Vehicle Charger",
    type: "EV Charging",
    location: "Garage",
    status: "inactive",
    currentUsage: 0.0,
    threshold: 7.0,
  },
  {
    id: "device-7",
    name: "Dishwasher",
    type: "Appliance",
    location: "Kitchen",
    status: "inactive",
    currentUsage: 0.0,
    threshold: 1.2,
  },
  {
    id: "device-8",
    name: "Home Office Equipment",
    type: "Electronics",
    location: "Office",
    status: "active",
    currentUsage: 0.4,
    threshold: 0.8,
  },
]

// Mock API functions
export async function fetchEnergyData(): Promise<EnergyData[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockEnergyData
}

export async function fetchDevices(): Promise<Device[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockDevices
}

export async function fetchUser(): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Smart Home Ave, Tech City, TC 12345",
  }
}

export async function fetchBudget(): Promise<Budget> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    id: "budget-1",
    monthlyLimit: 300,
    alertThreshold: 80,
    currentUsage: 210,
  }
}

// API functions for updating data
export async function updateDevice(deviceId: string, data: Partial<Device>): Promise<Device> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would send a request to your backend
  console.log(`Updating device ${deviceId} with data:`, data)

  // Return mock updated device
  return {
    ...mockDevices.find((d) => d.id === deviceId)!,
    ...data,
  }
}

export async function updateBudget(data: Partial<Budget>): Promise<Budget> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would send a request to your backend
  console.log(`Updating budget with data:`, data)

  // Return mock updated budget
  return {
    id: "budget-1",
    monthlyLimit: data.monthlyLimit || 300,
    alertThreshold: data.alertThreshold || 80,
    currentUsage: 210,
  }
}

export async function updateUser(data: Partial<User>): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would send a request to your backend
  console.log(`Updating user with data:`, data)

  // Return mock updated user
  return {
    id: "user-1",
    name: data.name || "John Doe",
    email: data.email || "john.doe@example.com",
    phone: data.phone || "+1 (555) 123-4567",
    address: data.address || "123 Smart Home Ave, Tech City, TC 12345",
  }
}

