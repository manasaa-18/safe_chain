import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Resource {
  id: string
  type: string
  name: string
  status: "available" | "busy" | "offline"
  location: string
  capacity?: number
  currentLoad?: number
}

interface ResourceStatusProps {
  resources: Resource[]
}

export function ResourceStatus({ resources }: ResourceStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "default"
      case "busy":
        return "destructive"
      case "offline":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{resource.name}</span>
                <Badge variant={getStatusColor(resource.status)}>{resource.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {resource.type} • {resource.location}
              </p>
              {resource.capacity && resource.currentLoad !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Capacity</span>
                    <span>
                      {resource.currentLoad}/{resource.capacity}
                    </span>
                  </div>
                  <Progress value={(resource.currentLoad / resource.capacity) * 100} className="h-2" />
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
