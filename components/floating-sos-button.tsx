"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Loader2, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingSOSButtonProps {
  onActivate: () => void
  isLoading?: boolean
  status?: "idle" | "sending" | "sent" | "error"
}

export function FloatingSOSButton({ onActivate, isLoading = false, status = "idle" }: FloatingSOSButtonProps) {
  const [pulseAnimation, setPulseAnimation] = useState(true)

  useEffect(() => {
    if (status === "sent") {
      setPulseAnimation(false)
      const timer = setTimeout(() => setPulseAnimation(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [status])

  const getButtonStyle = () => {
    switch (status) {
      case "sending":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "sent":
        return "bg-green-500 hover:bg-green-600"
      case "error":
        return "bg-red-700 hover:bg-red-800"
      default:
        return "bg-red-600 hover:bg-red-700"
    }
  }

  const getIcon = () => {
    switch (status) {
      case "sending":
        return <Loader2 className="w-6 h-6 animate-spin" />
      case "sent":
        return <CheckCircle className="w-6 h-6" />
      default:
        return <AlertCircle className="w-6 h-6" />
    }
  }

  return (
    <>
      {/* Floating SOS Button */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3">
        {/* Status Text */}
        {status !== "idle" && (
          <div
            className={cn(
              "px-4 py-2 rounded-lg text-white text-sm font-medium shadow-lg transition-all",
              status === "sending" && "bg-yellow-500 animate-pulse",
              status === "sent" && "bg-green-500",
              status === "error" && "bg-red-600",
            )}
          >
            {status === "sending" && "📡 Sending SOS..."}
            {status === "sent" && "✓ Alert Sent!"}
            {status === "error" && "✗ Failed - Retry"}
          </div>
        )}

        {/* Main Button with Pulse */}
        <button
          onClick={onActivate}
          disabled={isLoading || status === "sending"}
          className={cn(
            "relative w-16 h-16 rounded-full shadow-xl transition-all transform hover:scale-110 active:scale-95 disabled:opacity-75 flex items-center justify-center text-white font-bold",
            getButtonStyle(),
          )}
          title="Emergency SOS Alert"
        >
          {/* Pulse Rings */}
          {pulseAnimation && status !== "sent" && (
            <>
              <div className="absolute inset-0 rounded-full bg-red-600 animate-pulse opacity-75" />
              <div className="absolute inset-2 rounded-full bg-red-600 animate-pulse opacity-50 animation-delay-100" />
            </>
          )}

          {/* Button Icon */}
          <div className="relative z-10 flex items-center justify-center">{getIcon()}</div>
        </button>

        {/* Quick Tips */}
        {status === "idle" && (
          <div className="text-right text-xs text-slate-600 bg-white rounded-lg p-2 shadow-md max-w-xs">
            <p className="font-semibold text-red-600 mb-1">🆘 SOS Ready</p>
            <p>Tap to send emergency alert with GPS location</p>
          </div>
        )}
      </div>

      {/* Keyboard Shortcut Indicator */}
      <div className="fixed bottom-8 left-8 z-40 text-xs text-slate-500 pointer-events-none">
        <p>
          Press <kbd className="px-2 py-1 bg-slate-100 rounded border">Space</kbd> +{" "}
          <kbd className="px-2 py-1 bg-slate-100 rounded border">S</kbd> for quick SOS
        </p>
      </div>
    </>
  )
}
