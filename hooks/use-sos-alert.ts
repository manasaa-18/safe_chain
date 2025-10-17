"use client"

import { useState, useCallback } from "react"

type SOSStatus = "idle" | "sending" | "sent" | "error"

export function useSOSAlert() {
  const [sosStatus, setSOSStatus] = useState<SOSStatus>("idle")
  const [lastAlertTx, setLastAlertTx] = useState<string | null>(null)

  const triggerSOS = useCallback(async (location: { lat: number; lng: number } | null) => {
    if (!location) {
      setSOSStatus("error")
      setTimeout(() => setSOSStatus("idle"), 3000)
      return
    }

    try {
      setSOSStatus("sending")

      // Simulate blockchain transaction
      const mockTxHash = "ALGO-" + Math.random().toString(36).substr(2, 9).toUpperCase()

      // Simulate API call to backend
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setLastAlertTx(mockTxHash)
      setSOSStatus("sent")

      // Log the SOS alert
      console.log("SOS Alert Sent:", {
        timestamp: new Date().toISOString(),
        location,
        txHash: mockTxHash,
      })

      // Reset status after 5 seconds
      setTimeout(() => setSOSStatus("idle"), 5000)
    } catch (error) {
      console.error("Failed to send SOS alert:", error)
      setSOSStatus("error")
      setTimeout(() => setSOSStatus("idle"), 3000)
    }
  }, [])

  const resetStatus = useCallback(() => {
    setSOSStatus("idle")
  }, [])

  return {
    sosStatus,
    lastAlertTx,
    triggerSOS,
    resetStatus,
  }
}
