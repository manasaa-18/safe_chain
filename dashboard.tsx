"use client"

import { useState } from "react"
import { Bell, Search, Settings, Users, AlertTriangle, Activity, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { IncidentCard } from "./components/incident-card"
import { StatsCard } from "./components/stats-card"
import { ResourceStatus } from "./components/resource-status"
import { EmergencyMap } from "./components/emergency-map"

export default function SaarthiDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const incidents = [
    {
      id: "INC-001",
      type: "Medical Emergency",
      severity: "critical" as const,
      location: "Downtown Hospital Area, Sector 15",
      time: "2 minutes ago",
      status: "active" as const,
      reporter: "John Doe",
      description: "Cardiac arrest reported, patient unconscious",
      assignedUnit: "Ambulance Unit 7",
    },
    {
      id: "INC-002",
      type: "Vehicle Accident",
      severity: "high" as const,
      location: "Highway 101, Mile Marker 45",
      time: "8 minutes ago",
      status: "responding" as const,
      reporter: "Traffic Control",
      description: "Multi-vehicle collision, road blocked",
    },
    {
      id: "INC-003",
      type: "Fire Alert",
      severity: "medium" as const,
      location: "Residential Complex, Block A",
      time: "15 minutes ago",
      status: "resolved" as const,
      reporter: "Security Guard",
      description: "Kitchen fire, contained by residents",
    },
  ]

  const resources = [
    {
      id: "AMB-001",
      type: "Ambulance",
      name: "Emergency Unit 7",
      status: "busy" as const,
      location: "En route to Downtown",
      capacity: 2,
      currentLoad: 1,
    },
    {
      id: "FIRE-001",
      type: "Fire Truck",
      name: "Fire Station Alpha",
      status: "available" as const,
      location: "Central Fire Station",
      capacity: 6,
      currentLoad: 0,
    },
    {
      id: "POL-001",
      type: "Police",
      name: "Patrol Unit 12",
      status: "available" as const,
      location: "Sector 10 Patrol",
      capacity: 2,
      currentLoad: 0,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">SAARTHI</h1>
              <Badge variant="outline">Emergency Control</Badge>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search incidents..." className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="incidents">Active Incidents</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Active Incidents"
                value={12}
                change="+2 from last hour"
                icon={AlertTriangle}
                trend="up"
              />
              <StatsCard
                title="Response Time"
                value="4.2 min"
                change="-0.8 min from average"
                icon={Clock}
                trend="down"
              />
              <StatsCard title="Available Units" value={8} change="2 units dispatched" icon={Users} trend="neutral" />
              <StatsCard title="Resolved Today" value={47} change="+12% from yesterday" icon={CheckCircle} trend="up" />
            </div>

            {/* Map and Recent Incidents */}
            <div className="grid gap-6 md:grid-cols-3">
              <EmergencyMap />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Incidents</h3>
                {incidents.slice(0, 2).map((incident) => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Incidents</h2>
              <div className="flex gap-2">
                <Button variant="outline">Filter</Button>
                <Button>New Incident</Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {incidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Resource Management</h2>
              <Button>Add Resource</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ResourceStatus resources={resources} />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Resource Utilization</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ambulances</span>
                    <span className="text-sm font-medium">3/5 Available</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fire Trucks</span>
                    <span className="text-sm font-medium">4/4 Available</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Police Units</span>
                    <span className="text-sm font-medium">6/8 Available</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Reports</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Response Metrics</h3>
                <div className="bg-slate-100 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Response time trends chart</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Incident Types</h3>
                <div className="bg-slate-100 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <AlertTriangle className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Incident distribution chart</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
