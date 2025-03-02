"use client"

import type React from "react"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Alert } from "@/lib/types"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface NotificationsProps {
  alerts: Alert[]
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>
}

export default function Notifications({ alerts, setAlerts }: NotificationsProps) {
  const [open, setOpen] = useState(false)

  const unreadCount = alerts.filter((alert) => !alert.read).length

  const handleMarkAsRead = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert)))
  }

  const handleMarkAllAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })))
  }

  const handleClearAll = () => {
    setAlerts([])
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex gap-1">
            {alerts.length > 0 && (
              <>
                <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                  Mark all read
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClearAll}>
                  Clear all
                </Button>
              </>
            )}
          </div>
        </div>
        <ScrollArea className="h-[300px]">
          {alerts.length > 0 ? (
            <div className="divide-y">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start gap-4 p-4 ${!alert.read ? "bg-muted/50" : ""}`}
                  onClick={() => handleMarkAsRead(alert.id)}
                >
                  <div className={`mt-1 h-2 w-2 rounded-full ${!alert.read ? "bg-primary" : "bg-transparent"}`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{alert.deviceName}</p>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center p-8">
              <p className="text-center text-sm text-muted-foreground">No notifications</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

