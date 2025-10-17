"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Phone, Shield, Video, Zap, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SOSButton } from "@/components/sos-button"
import { FakeCallModal } from "@/components/fake-call-modal"
import { VideoLibrary } from "@/components/video-library"
import { NavigationHeader } from "@/components/navigation-header"
import { FloatingSOSButton } from "@/components/floating-sos-button"
import { QuickAlertToast } from "@/components/quick-alert-toast"
import { useSOSAlert } from "@/hooks/use-sos-alert"

export default function Home() {
  const [activeMode, setActiveMode] = useState<"home" | "sos" | "unsafe" | "videos">("home")
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [showQuickAlert, setShowQuickAlert] = useState(false)
  const { sosStatus, triggerSOS } = useSOSAlert()

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }, [])

  // Keyboard shortcut for SOS (Space + S)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.shiftKey) {
        e.preventDefault()
        setShowQuickAlert(true)
        triggerSOS(location)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [location, triggerSOS])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <NavigationHeader />

      {activeMode === "home" && (
        <main className="container max-w-4xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-red-600" />
              <h1 className="text-4xl font-bold text-slate-900">SafeChain</h1>
            </div>
            <p className="text-lg text-slate-600">Decentralized personal safety powered by Algorand blockchain</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="bg-white border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">On-Chain</p>
                  <p className="text-lg font-semibold text-slate-900">247 SOS</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Active Users</p>
                  <p className="text-lg font-semibold text-slate-900">1,234</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <AlertCircle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Response Time</p>
                  <p className="text-lg font-semibold text-slate-900">2.3 min</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feature Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* SOS Button Card */}
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white pb-4">
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Emergency SOS
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8 pb-8">
                <p className="text-slate-600 mb-6">
                  Send instant SOS alert with GPS location, recorded on Algorand blockchain.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>Auto GPS tracking</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span>Blockchain verified</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Encrypted media storage</span>
                  </div>
                </div>
                <Button onClick={() => setActiveMode("sos")} className="w-full bg-red-600 hover:bg-red-700" size="lg">
                  Activate SOS
                </Button>
              </CardContent>
            </Card>

            {/* Unsafe Mode Card */}
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />I Feel Unsafe
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8 pb-8">
                <p className="text-slate-600 mb-6">
                  Fake incoming call + silent SOS background tracking with voice activation.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone className="w-4 h-4 text-orange-600" />
                    <span>Fake call simulation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>Background tracking</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span>Voice trigger alert</span>
                  </div>
                </div>
                <Button
                  onClick={() => setActiveMode("unsafe")}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  size="lg"
                >
                  Activate Now
                </Button>
              </CardContent>
            </Card>

            {/* Video Library Card */}
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Self-Defense Videos
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8 pb-8">
                <p className="text-slate-600 mb-6">
                  Blockchain-verified safety training content with premium HELP token access.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <span>On-chain verified</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Badge variant="outline">IPFS</Badge>
                    <span>Decentralized storage</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    <span>Premium with HELP</span>
                  </div>
                </div>
                <Button
                  onClick={() => setActiveMode("videos")}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  Browse Library
                </Button>
              </CardContent>
            </Card>

            {/* Rewards Card */}
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  HELP Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8 pb-8">
                <p className="text-slate-600 mb-6">
                  Earn HELP tokens for verified assistance. Spend on premium content.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Your HELP Balance</span>
                    <Badge className="bg-green-600">245 HELP</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Responders Active</span>
                    <Badge variant="outline">342</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  View Rewards
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Location Info */}
          {location && (
            <Card className="mt-8 bg-white border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>
                    Current Location: {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      )}

      {activeMode === "sos" && <SOSButton location={location} onBack={() => setActiveMode("home")} onSOS={() => {}} />}

      {activeMode === "unsafe" && <FakeCallModal location={location} onBack={() => setActiveMode("home")} />}

      {activeMode === "videos" && <VideoLibrary onBack={() => setActiveMode("home")} />}

      {/* Floating SOS Button */}
      <FloatingSOSButton
        onActivate={() => {
          setShowQuickAlert(true)
          triggerSOS(location)
        }}
        isLoading={sosStatus === "sending"}
        status={sosStatus}
      />

      {/* Quick Alert Toast */}
      {showQuickAlert && (
        <QuickAlertToast
          location={location}
          onDismiss={() => setShowQuickAlert(false)}
          onConfirm={() => triggerSOS(location)}
        />
      )}
    </div>
  )
}
