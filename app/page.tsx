"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
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

  // Get user location on mount
  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      console.error,
      { enableHighAccuracy: true, timeout: 5000 }
    )
  }, [])

  // SOS keyboard shortcut (Shift + Space)
  const handleSOSShortcut = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space" && e.shiftKey) {
        e.preventDefault()
        setShowQuickAlert(true)
        triggerSOS(location)
      }
    },
    [location, triggerSOS]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleSOSShortcut)
    return () => window.removeEventListener("keydown", handleSOSShortcut)
  }, [handleSOSShortcut])

  const quickStats = useMemo(
    () => [
      {
        icon: <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />,
        label: "On-Chain",
        value: "247 SOS",
      },
      {
        icon: <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />,
        label: "Active Users",
        value: "1,234",
      },
      {
        icon: <AlertCircle className="w-6 h-6 text-orange-600 mx-auto mb-2" />,
        label: "Response Time",
        value: "2.3 min",
      },
    ],
    []
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <NavigationHeader />

      {activeMode === "home" && (
        <main className="container max-w-4xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-red-600" />
              <h1 className="text-4xl font-bold text-slate-900">SafeChain</h1>
            </div>
            <p className="text-lg text-slate-600">
              Decentralized personal safety powered by Algorand blockchain
            </p>
          </section>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {quickStats.map(({ icon, label, value }) => (
              <Card key={label} className="bg-white border-none shadow-sm">
                <CardContent className="pt-6 text-center">
                  {icon}
                  <p className="text-sm text-slate-600">{label}</p>
                  <p className="text-lg font-semibold text-slate-900">{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Emergency SOS */}
            <FeatureCard
              title="Emergency SOS"
              gradient="from-red-500 to-red-600"
              icon={<AlertCircle className="w-5 h-5" />}
              color="red"
              details={[
                { icon: <MapPin className="w-4 h-4 text-red-600" />, text: "Auto GPS tracking" },
                { icon: <Zap className="w-4 h-4 text-blue-600" />, text: "Blockchain verified" },
                { icon: <Shield className="w-4 h-4 text-green-600" />, text: "Encrypted media storage" },
              ]}
              buttonText="Activate SOS"
              onClick={() => setActiveMode("sos")}
            />

            {/* Unsafe Mode */}
            <FeatureCard
              title="I Feel Unsafe"
              gradient="from-orange-500 to-orange-600"
              icon={<Phone className="w-5 h-5" />}
              color="orange"
              details={[
                { icon: <Phone className="w-4 h-4 text-orange-600" />, text: "Fake call simulation" },
                { icon: <MapPin className="w-4 h-4 text-red-600" />, text: "Background tracking" },
                { icon: <Zap className="w-4 h-4 text-blue-600" />, text: "Voice trigger alert" },
              ]}
              buttonText="Activate Now"
              onClick={() => setActiveMode("unsafe")}
            />

            {/* Video Library */}
            <FeatureCard
              title="Self-Defense Videos"
              gradient="from-purple-500 to-purple-600"
              icon={<Video className="w-5 h-5" />}
              color="purple"
              details={[
                { icon: <Zap className="w-4 h-4 text-purple-600" />, text: "On-chain verified" },
                { icon: <Badge variant="outline">IPFS</Badge>, text: "Decentralized storage" },
                { icon: <Zap className="w-4 h-4 text-yellow-600" />, text: "Premium with HELP" },
              ]}
              buttonText="Browse Library"
              onClick={() => setActiveMode("videos")}
            />

            {/* Rewards */}
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
                  <InfoRow label="Your HELP Balance" value={<Badge className="bg-green-600">245 HELP</Badge>} />
                  <InfoRow label="Responders Active" value={<Badge variant="outline">342</Badge>} />
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

      {/* Mode Components */}
      {activeMode === "sos" && (
        <SOSButton location={location} onBack={() => setActiveMode("home")} onSOS={() => {}} />
      )}
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

/* ---------------- Helper Components ---------------- */

interface FeatureCardProps {
  title: string
  gradient: string
  icon: React.ReactNode
  color: string
  details: { icon: React.ReactNode; text: string }[]
  buttonText: string
  onClick: () => void
}

function FeatureCard({ title, gradient, icon, details, buttonText, onClick }: FeatureCardProps) {
  return (
    <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      <CardHeader className={`bg-gradient-to-r ${gradient} text-white pb-4`}>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-8 pb-8">
        <p className="text-slate-600 mb-6">{details[0]?.text.includes("GPS") ? "Send instant SOS alert with GPS location, recorded on Algorand blockchain." : ""}</p>
        <div className="space-y-3 mb-6">
          {details.map((d, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
              {d.icon}
              <span>{d.text}</span>
            </div>
          ))}
        </div>
        <Button onClick={onClick} className="w-full" size="lg">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-600">{label}</span>
      {value}
    </div>
  )
}
