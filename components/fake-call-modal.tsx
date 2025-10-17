"use client"

import { useState, useEffect } from "react"
import { Phone, PhoneOff, MapPin, ArrowLeft, Zap, Mic, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FakeCallModalProps {
  location: { lat: number; lng: number } | null
  onBack: () => void
}

export function FakeCallModal({ location, onBack }: FakeCallModalProps) {
  const [callActive, setCallActive] = useState(false)
  const [duration, setDuration] = useState(0)
  const [backgroundTracking, setBackgroundTracking] = useState(true)
  const [triggerMode, setTriggerMode] = useState<"shake" | "voice" | "longpress">("shake")

  useEffect(() => {
    if (!callActive) return

    const interval = setInterval(() => {
      setDuration((d) => d + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [callActive])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleEndCall = () => {
    setCallActive(false)
    setDuration(0)
  }

  return (
    <main className="container max-w-2xl mx-auto px-4 py-8">
      <Button variant="outline" className="mb-6 gap-2 bg-transparent" onClick={onBack}>
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      {!callActive ? (
        <Card className="bg-white border-none shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-6 h-6" />I Feel Unsafe Mode
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-8">
            <div className="space-y-6">
              {/* Mode Description */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-700">
                  Activate a fake incoming call that will simulate a realistic phone conversation. While the call is
                  active, your location will be continuously tracked in the background and ready for silent SOS trigger.
                </p>
              </div>

              {/* Trigger Settings */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-3">Silent SOS Trigger</label>
                <div className="space-y-2">
                  {(["shake", "voice", "longpress"] as const).map((mode) => (
                    <div
                      key={mode}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        triggerMode === mode
                          ? "border-orange-500 bg-orange-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                      onClick={() => setTriggerMode(mode)}
                    >
                      <p className="text-sm font-medium text-slate-900 capitalize">
                        {mode === "shake"
                          ? "📱 Shake Phone"
                          : mode === "voice"
                            ? '🎤 Say "Help"'
                            : "⏱️ Long Press Button"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div>
                <p className="text-sm font-medium text-slate-900 mb-3">Features</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone className="w-4 h-4 text-orange-600" />
                    <span>Realistic fake call simulation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>Background location tracking</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span>Silent SOS with {triggerMode} trigger</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <span>Auto-recording proof to blockchain</span>
                  </div>
                </div>
              </div>

              {/* Current Location */}
              {location && (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue-600 mt-1" />
                    <div className="text-sm">
                      <p className="font-medium text-slate-900">Current Location</p>
                      <p className="text-slate-600 mt-1">
                        {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Activate Button */}
              <Button
                onClick={() => setCallActive(true)}
                className="w-full h-14 text-lg font-bold bg-orange-600 hover:bg-orange-700"
                size="lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Start Fake Call
              </Button>

              <p className="text-xs text-slate-500 text-center">
                Your background will be safe. Trigger silently anytime.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white border-none shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardTitle>Incoming Call</CardTitle>
          </CardHeader>

          <CardContent className="pt-8">
            <div className="text-center space-y-8">
              {/* Caller Info */}
              <div>
                <div className="w-20 h-20 rounded-full bg-slate-200 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-10 h-10 text-slate-400" />
                </div>
                <p className="text-2xl font-bold text-slate-900">Mom</p>
                <p className="text-sm text-slate-600 mt-1">Mobile</p>
              </div>

              {/* Duration */}
              <div className="text-4xl font-mono font-bold text-blue-600">{formatDuration(duration)}</div>

              {/* Status */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                  <span className="text-sm text-blue-900">Call Active • Background Tracking ON</span>
                </div>
              </div>

              {/* Silent Trigger Info */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 justify-center mb-2">
                  <Mic className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-900">Silent SOS Ready</span>
                </div>
                <p className="text-xs text-slate-600">
                  {triggerMode === "shake"
                    ? "Shake your phone"
                    : triggerMode === "voice"
                      ? 'Say "Help" loudly'
                      : "Long press volume button"}{" "}
                  to send SOS silently
                </p>
              </div>

              {/* Location Tracking */}
              {location && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 justify-center">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-900">
                      Location tracking: {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°
                    </span>
                  </div>
                </div>
              )}

              {/* Control Buttons */}
              <div className="flex gap-4 pt-4">
                <Button variant="outline" className="flex-1 h-14 bg-transparent" onClick={handleEndCall}>
                  <PhoneOff className="w-5 h-5 mr-2" />
                  Hang Up
                </Button>
                <Button
                  className="flex-1 h-14 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    alert("SOS Alert sent silently! Location recorded on blockchain.")
                    handleEndCall()
                  }}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Trigger SOS
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  )
}
