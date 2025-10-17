"use client"

import { useEffect, useState } from "react"
import { CheckCircle, MapPin, Send, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface QuickAlertToastProps {
  location: { lat: number; lng: number } | null
  onDismiss: () => void
  onConfirm: () => void
}

export function QuickAlertToast({ location, onDismiss, onConfirm }: QuickAlertToastProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isConfirmed) onDismiss()
    }, 30000) // Auto-dismiss after 30 seconds

    return () => clearTimeout(timer)
  }, [isConfirmed, onDismiss])

  const handleConfirm = async () => {
    setIsConfirming(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsConfirming(false)
    setIsConfirmed(true)
    onConfirm()
    setTimeout(() => onDismiss(), 3000)
  }

  if (isConfirmed) {
    return (
      <Card className="fixed bottom-32 right-8 z-40 p-4 bg-green-50 border-green-200 shadow-lg max-w-sm">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-green-900">Emergency Alert Sent!</p>
            <p className="text-sm text-green-800 mt-1">
              Your location and alert have been recorded on the Algorand blockchain. Responders are being notified.
            </p>
            <div className="flex items-center gap-1 text-xs text-green-700 mt-2">
              <MapPin className="w-3 h-3" />
              <span>
                {location?.lat.toFixed(4)}°, {location?.lng.toFixed(4)}°
              </span>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="fixed bottom-32 right-8 z-40 p-4 bg-red-50 border-red-200 shadow-lg max-w-sm">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0 animate-pulse" />
          <div className="flex-1">
            <p className="font-semibold text-red-900">Emergency Alert Ready</p>
            <p className="text-sm text-red-800 mt-1">Confirm to send SOS with your current location</p>

            {location && (
              <div className="flex items-center gap-1 text-xs text-red-700 mt-2">
                <MapPin className="w-3 h-3" />
                <span>
                  {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onDismiss} className="flex-1 bg-white" disabled={isConfirming}>
            Cancel
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-red-600 hover:bg-red-700 gap-2"
            onClick={handleConfirm}
            disabled={isConfirming}
          >
            {isConfirming ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Confirm & Send
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}
