"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Smart Home Ave, Tech City, TC 12345",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  })

  const handleUpdateProfile = () => {
    // In a real app, this would call an API to update the user profile
    console.log("Updating user profile:", user)
  }

  const handleUpdateNotifications = () => {
    // In a real app, this would call an API to update notification preferences
    console.log("Updating notification preferences:", notifications)
  }

  return (
    <Tabs defaultValue="profile" className="space-y-4">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={user.address}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleUpdateProfile}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Alert Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive energy alerts via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive energy alerts via push notifications</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive energy alerts via SMS</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Notification Types</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="budget-alerts" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="budget-alerts">Budget Alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="device-alerts" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="device-alerts">Device Alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="system-updates" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="system-updates">System Updates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="tips" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="tips">Energy Saving Tips</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleUpdateNotifications}>Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Change Password</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Button>Update Password</Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch id="two-factor" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Sessions</h3>
              <div className="rounded-md border">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">Chrome on Windows • IP: 192.168.1.1</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </div>
                <div className="border-t p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mobile App</p>
                      <p className="text-sm text-muted-foreground">iOS • Last active: 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

