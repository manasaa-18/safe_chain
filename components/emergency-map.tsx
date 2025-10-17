import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"

export function EmergencyMap() {
  // Mock incident locations
  const incidents = [
    { id: 1, lat: 40.7128, lng: -74.006, type: "Medical", severity: "critical" },
    { id: 2, lat: 40.7589, lng: -73.9851, type: "Fire", severity: "high" },
    { id: 3, lat: 40.7505, lng: -73.9934, type: "Accident", severity: "medium" },
  ]

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="w-5 h-5" />
          Live Incident Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-slate-100 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center space-y-2">
            <MapPin className="w-8 h-8 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Interactive map showing real-time incident locations</p>
            <div className="flex gap-4 justify-center text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Critical</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Low</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
