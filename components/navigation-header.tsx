import { Shield, Wallet, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NavigationHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-red-600" />
          <span className="font-bold text-lg text-slate-900">SafeChain</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
            <Wallet className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-900">245 HELP</span>
          </div>
          <Button variant="outline" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
