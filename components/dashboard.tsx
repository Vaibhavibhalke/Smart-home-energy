"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import EnergyConsumptionChart from "./energy-consumption-chart"
import DevicesList from "./devices-list"
import BudgetSettings from "./budget-settings"
import UserProfile from "./user-profile"
import Notifications from "./notifications"
import { useToast } from "@/components/ui/use-toast"
import { fetchEnergyData, fetchDevices } from "@/lib/api"
import type { EnergyData, Device, Alert } from "@/lib/types"

export default function Dashboard() {
  const [energyData, setEnergyData] = useState<EnergyData[]>([])
  const [devices, setDevices] = useState<Device[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        // In a real application, these would be API calls to your backend
        const energyData = await fetchEnergyData()
        const devices = await fetchDevices()

        setEnergyData(energyData)
        setDevices(devices)

        // Check for any alerts based on the energy data
        const newAlerts = checkForAlerts(energyData, devices)
        if (newAlerts.length > 0) {
          setAlerts((prev) => [...prev, ...newAlerts])

          // Show toast notification for new alerts
          toast({
            title: "Energy Alert",
            description: `You have ${newAlerts.length} new energy alerts.`,
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()

    // Set up polling for real-time updates
    const interval = setInterval(loadData, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [toast])

  // Function to check for alerts based on energy consumption data
  const checkForAlerts = (energyData: EnergyData[], devices: Device[]): Alert[] => {
    const newAlerts: Alert[] = []

    // This is a simplified example - in a real app, you would have more complex logic
    devices.forEach((device) => {
      const deviceData = energyData.filter((data) => data.deviceId === device.id)
      if (deviceData.length > 0) {
        const latestReading = deviceData[deviceData.length - 1]

        if (latestReading.consumption > device.threshold) {
          newAlerts.push({
            id: `alert-${Date.now()}-${device.id}`,
            deviceId: device.id,
            deviceName: device.name,
            message: `${device.name} exceeded energy threshold (${latestReading.consumption}kWh > ${device.threshold}kWh)`,
            timestamp: new Date(),
            read: false,
          })
        }
      }
    })

    return newAlerts
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Smart Home Energy Dashboard</h1>
        <Notifications alerts={alerts} setAlerts={setAlerts} />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Energy Consumption</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? "Loading..." : `${calculateTotalConsumption(energyData)} kWh`}
                </div>
                <p className="text-xs text-muted-foreground">+2.5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "Loading..." : `${countActiveDevices(devices)}`}</div>
                <p className="text-xs text-muted-foreground">{devices.length} total devices</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? "Loading..." : `${calculateBudgetPercentage(energyData)}%`}
                </div>
                <p className="text-xs text-muted-foreground">Of monthly budget used</p>
              </CardContent>
            </Card>
          </div>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Energy Consumption Trends</CardTitle>
              <CardDescription>Your energy usage over the past 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <EnergyConsumptionChart data={energyData} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <DevicesList devices={devices} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <BudgetSettings energyData={energyData} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <UserProfile />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper functions
function calculateTotalConsumption(data: EnergyData[]): number {
  return Number.parseFloat(data.reduce((sum, item) => sum + item.consumption, 0).toFixed(2))
}

function countActiveDevices(devices: Device[]): number {
  return devices.filter((device) => device.status === "active").length
}

function calculateBudgetPercentage(data: EnergyData[]): number {
  const totalConsumption = calculateTotalConsumption(data)
  const monthlyBudget = 300 // This would come from user settings in a real app
  return Math.min(Math.round((totalConsumption / monthlyBudget) * 100), 100)
}

