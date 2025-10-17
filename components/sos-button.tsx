"use client"

import { useState } from "react"
import { AlertCircle, MapPin, ArrowLeft, Send, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface SOSButtonProps {
  location: { lat: number; lng: number } | null
  onBack: () => void
  onSOS: () => void
}

export function SOSButton({ location, onBack, onSOS }: SOSButtonProps) {
  const [isActive, setIsActive] = useState(false)
  const [emergencyMessage, setEmergencyMessage] = useState("")
  const [contacts, setContacts] = useState(["Mom", "Police", "Hospital"])
  const [txHash, setTxHash] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSOS = async () => {
    setIsLoading(true)
    try {
      // Simulate blockchain transaction
      const mockTxHash = "ALGO-" + Math.random().toString(36).substr(2, 9).toUpperCase()

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setTxHash(mockTxHash)
      onSOS()

      // Reset after success
      setTimeout(() => {
        setIsActive(false)
        setTxHash(null)
      }, 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container max-w-2xl mx-auto px-4 py-8">
      <Button variant="outline" className="mb-6 gap-2 bg-transparent" onClick={onBack}>
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <Card className="bg-white border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            Emergency SOS Alert
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-8">
          {/* Location Display */}
          {location && (
            <div className="mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Current Location</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Latitude: {location.lat.toFixed(6)}
                    <br />
                    Longitude: {location.lng.toFixed(6)}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">Will be recorded on Algorand blockchain</p>
                </div>
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-900 mb-3">Emergency Message</label>
            <Input
              placeholder="Describe your emergency (optional)"
              value={emergencyMessage}
              onChange={(e) => setEmergencyMessage(e.target.value)}
              disabled={isLoading || !!txHash}
              className="mb-2"
            />
            <p className="text-xs text-slate-500">Max 280 characters for on-chain record</p>
          </div>

          {/* Notification Contacts */}
          <div className="mb-8">
            <p className="text-sm font-medium text-slate-900 mb-3">Alert These Contacts</p>
            <div className="space-y-2">
              {contacts.map((contact) => (
                <div
                  key={contact}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div className="w-3 h-3 bg-red-600 rounded-full" />
                  <span className="text-sm font-medium text-slate-900">{contact}</span>
                  <span className="ml-auto text-xs text-slate-500">Notifying...</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Status */}
          {txHash && (
            <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900">SOS Alert Sent</p>
                  <p className="text-xs text-green-700 mt-1 break-all">TX Hash: {txHash}</p>
                  <p className="text-xs text-green-600 mt-2">
                    ✓ Recorded on Algorand blockchain
                    <br />✓ Contacts notified
                    <br />✓ Location verified on-chain
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SOS Button */}
          <Button
            onClick={handleSOS}
            disabled={isLoading || !!txHash}
            className="w-full h-16 text-lg font-bold bg-red-600 hover:bg-red-700 gap-2"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Recording on Blockchain...
              </>
            ) : txHash ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Alert Sent Successfully
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send SOS Alert
              </>
            )}
          </Button>

          {/* Warning */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-800">
              ⚠️ This alert will be permanently recorded on the Algorand blockchain. Verified responders will be notified
              immediately with your location.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
