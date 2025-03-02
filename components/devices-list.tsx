"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import type { Device } from "@/lib/types"
import { PlusCircle, Search, Settings } from "lucide-react"

interface DevicesListProps {
  devices: Device[]
  isLoading: boolean
}

export default function DevicesList({ devices, isLoading }: DevicesListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "",
    location: "",
    threshold: 0,
  })

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleToggleDevice = (deviceId: string, currentStatus: string) => {
    // In a real app, this would call an API to update the device status
    console.log(
      `Toggling device ${deviceId} from ${currentStatus} to ${currentStatus === "active" ? "inactive" : "active"}`,
    )
  }

  const handleAddDevice = () => {
    // In a real app, this would call an API to add the new device
    console.log("Adding new device:", newDevice)

    // Reset form
    setNewDevice({
      name: "",
      type: "",
      location: "",
      threshold: 0,
    })
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Smart Devices</CardTitle>
          <CardDescription>Manage your connected smart devices</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Smart Devices</CardTitle>
          <CardDescription>Manage your connected smart devices</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search devices..."
              className="w-[200px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Device
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Device</DialogTitle>
                <DialogDescription>Enter the details of your new smart device.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newDevice.name}
                    onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Input
                    id="type"
                    value={newDevice.type}
                    onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={newDevice.location}
                    onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="threshold" className="text-right">
                    Threshold (kWh)
                  </Label>
                  <Input
                    id="threshold"
                    type="number"
                    value={newDevice.threshold.toString()}
                    onChange={(e) => setNewDevice({ ...newDevice, threshold: Number.parseFloat(e.target.value) || 0 })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddDevice}>Add Device</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {filteredDevices.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Energy Usage</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="font-medium">{device.name}</TableCell>
                  <TableCell>{device.type}</TableCell>
                  <TableCell>{device.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={device.status === "active"}
                        onCheckedChange={() => handleToggleDevice(device.id, device.status)}
                      />
                      <Badge variant={device.status === "active" ? "default" : "secondary"}>
                        {device.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{device.currentUsage} kWh</TableCell>
                  <TableCell>{device.threshold} kWh</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex justify-center items-center h-[200px]">
            <p className="text-muted-foreground">
              {devices.length === 0
                ? "No devices found. Add a device to get started."
                : "No devices match your search criteria."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

