"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { EnergyData } from "@/lib/types"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

interface EnergyConsumptionChartProps {
  data: EnergyData[]
  isLoading: boolean
}

export default function EnergyConsumptionChart({ data, isLoading }: EnergyConsumptionChartProps) {
  const [timeRange, setTimeRange] = useState("week")

  // Process data based on selected time range
  const processData = () => {
    if (data.length === 0) return []

    // Group data by day for the chart
    const groupedData = data.reduce(
      (acc, item) => {
        const date = new Date(item.timestamp).toLocaleDateString()

        if (!acc[date]) {
          acc[date] = {
            date,
            total: 0,
            devices: {},
          }
        }

        acc[date].total += item.consumption

        // Also track consumption by device
        if (!acc[date].devices[item.deviceName]) {
          acc[date].devices[item.deviceName] = 0
        }
        acc[date].devices[item.deviceName] += item.consumption

        return acc
      },
      {} as Record<string, any>,
    )

    // Convert to array and sort by date
    return Object.values(groupedData).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  const chartData = processData()

  // Get unique device names for the chart legend
  const deviceNames = data.length > 0 ? [...new Set(data.map((item) => item.deviceName))] : []

  // Generate colors for each device
  const colors = [
    "#2563eb", // blue
    "#16a34a", // green
    "#dc2626", // red
    "#9333ea", // purple
    "#ea580c", // orange
    "#0891b2", // cyan
  ]

  if (isLoading) {
    return <Skeleton className="w-full h-[300px]" />
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 Hours</SelectItem>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: "kWh", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Consumption" strokeWidth={2} />
            {deviceNames.map((device, index) => (
              <Line
                key={device}
                type="monotone"
                dataKey={`devices.${device}`}
                name={device}
                stroke={colors[index % colors.length]}
                strokeWidth={1.5}
                dot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex justify-center items-center h-[300px] border rounded-md">
          <p className="text-muted-foreground">No energy data available</p>
        </div>
      )}
    </div>
  )
}

