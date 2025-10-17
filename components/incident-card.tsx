import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Phone, User } from "lucide-react"

interface IncidentCardProps {
  incident: {
    id: string
    type: string
    severity: "critical" | "high" | "medium" | "low"
    location: string
    time: string
    status: "active" | "responding" | "resolved"
    reporter: string
    description: string
    assignedUnit?: string
  }
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "destructive"
      case "responding":
        return "default"
      case "resolved":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{incident.type}</CardTitle>
          <div className="flex gap-2">
            <Badge variant={getStatusColor(incident.status)}>{incident.status.toUpperCase()}</Badge>
            <div className={`w-3 h-3 rounded-full ${getSeverityColor(incident.severity)}`} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{incident.description}</p>

        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span>{incident.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>{incident.time}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-muted-foreground" />
          <span>Reported by: {incident.reporter}</span>
        </div>

        {incident.assignedUnit && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>Assigned: {incident.assignedUnit}</span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline">
            View Details
          </Button>
          <Button size="sm">Dispatch Unit</Button>
        </div>
      </CardContent>
    </Card>
  )
}
