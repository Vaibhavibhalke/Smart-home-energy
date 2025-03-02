"use client"

import { Badge } from "@/components/ui/badge"

import { TableCell } from "@/components/ui/table"

import { TableBody } from "@/components/ui/table"

import { TableHead } from "@/components/ui/table"

import { TableRow } from "@/components/ui/table"

import { TableHeader } from "@/components/ui/table"

import { Table } from "@/components/ui/table"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import type { EnergyData } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface BudgetSettingsProps {
  energyData: EnergyData[]
  isLoading: boolean
}

export default function BudgetSettings({ energyData, isLoading }: BudgetSettingsProps) {
  const [monthlyBudget, setMonthlyBudget] = useState(300)
  const [alertThreshold, setAlertThreshold] = useState(80)

  const totalConsumption = energyData.reduce((sum, item) => sum + item.consumption, 0)
  const budgetPercentage = Math.min(Math.round((totalConsumption / monthlyBudget) * 100), 100)

  // Calculate consumption by device type for the pie chart
  const deviceConsumption = energyData.reduce(
    (acc, item) => {
      if (!acc[item.deviceType]) {
        acc[item.deviceType] = 0
      }
      acc[item.deviceType] += item.consumption
      return acc
    },
    {} as Record<string, number>,
  )

  const pieChartData = Object.entries(deviceConsumption).map(([name, value]) => ({
    name,
    value: Number.parseFloat(value.toFixed(2)),
  }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  const handleSaveBudget = () => {
    // In a real app, this would call an API to save the budget settings
    console.log("Saving budget settings:", { monthlyBudget, alertThreshold })
  }

  if (isLoading) {
    return <Skeleton className="w-full h-[500px]" />
  }

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Budget Overview</TabsTrigger>
        <TabsTrigger value="settings">Budget Settings</TabsTrigger>
        <TabsTrigger value="history">Usage History</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Budget</CardTitle>
              <CardDescription>Your energy consumption against your monthly budget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Current Usage</span>
                  <span className="text-sm font-medium">
                    {totalConsumption.toFixed(2)} kWh / {monthlyBudget} kWh
                  </span>
                </div>
                <Progress value={budgetPercentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Budget Status</h3>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      budgetPercentage < 60
                        ? "bg-green-500"
                        : budgetPercentage < alertThreshold
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <span className="text-sm">
                    {budgetPercentage < 60 ? "Good" : budgetPercentage < alertThreshold ? "Warning" : "Alert"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {budgetPercentage < 60
                    ? "You're well within your energy budget."
                    : budgetPercentage < alertThreshold
                      ? "You're approaching your energy budget limit."
                      : "You've exceeded your alert threshold!"}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Estimated Cost</h3>
                <p className="text-2xl font-bold">${(totalConsumption * 0.12).toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Based on your current rate of $0.12/kWh</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Consumption by Device Type</CardTitle>
              <CardDescription>Energy usage distribution across device categories</CardDescription>
            </CardHeader>
            <CardContent>
              {pieChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} kWh`, "Consumption"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex justify-center items-center h-[300px]">
                  <p className="text-muted-foreground">No consumption data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Budget Settings</CardTitle>
            <CardDescription>Configure your monthly energy budget and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="monthly-budget">Monthly Energy Budget (kWh)</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="monthly-budget"
                  type="number"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number.parseInt(e.target.value) || 0)}
                  className="w-24"
                />
                <Slider
                  value={[monthlyBudget]}
                  min={100}
                  max={1000}
                  step={10}
                  onValueChange={(value) => setMonthlyBudget(value[0])}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Set your target monthly energy consumption in kilowatt-hours (kWh)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alert-threshold">Alert Threshold (%)</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="alert-threshold"
                  type="number"
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(Number.parseInt(e.target.value) || 0)}
                  className="w-24"
                />
                <Slider
                  value={[alertThreshold]}
                  min={50}
                  max={100}
                  step={5}
                  onValueChange={(value) => setAlertThreshold(value[0])}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Receive alerts when your consumption reaches this percentage of your budget
              </p>
            </div>

            <div className="space-y-2">
              <Label>Alert Methods</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="email-alerts" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="email-alerts">Email Alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="push-alerts" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="push-alerts">Push Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="sms-alerts" className="rounded border-gray-300" />
                  <Label htmlFor="sms-alerts">SMS Alerts</Label>
                </div>
              </div>
            </div>

            <Button onClick={handleSaveBudget}>Save Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history">
        <Card>
          <CardHeader>
            <CardTitle>Usage History</CardTitle>
            <CardDescription>View your historical energy consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Previous Months</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Consumption (kWh)</TableHead>
                      <TableHead>Budget (kWh)</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>January 2025</TableCell>
                      <TableCell>285 kWh</TableCell>
                      <TableCell>300 kWh</TableCell>
                      <TableCell>
                        <Badge variant="success">Under Budget</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>December 2024</TableCell>
                      <TableCell>320 kWh</TableCell>
                      <TableCell>300 kWh</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Over Budget</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>November 2024</TableCell>
                      <TableCell>290 kWh</TableCell>
                      <TableCell>300 kWh</TableCell>
                      <TableCell>
                        <Badge variant="success">Under Budget</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Year-to-Date Summary</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h4 className="text-sm font-medium text-muted-foreground">Total Consumption</h4>
                        <p className="text-2xl font-bold">895 kWh</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h4 className="text-sm font-medium text-muted-foreground">Average Monthly</h4>
                        <p className="text-2xl font-bold">298 kWh</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h4 className="text-sm font-medium text-muted-foreground">Estimated Annual</h4>
                        <p className="text-2xl font-bold">3,576 kWh</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

