"use client"

import { useState } from "react"
import { Video, Play, Lock, Zap, Star, ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VideoLibraryProps {
  onBack: () => void
}

interface VideoItem {
  id: string
  title: string
  description: string
  duration: string
  instructor: string
  category: string
  ipfsHash: string
  blockchainVerified: boolean
  premium: boolean
  views: number
  rating: number
  thumbnail: string
}

export function VideoLibrary({ onBack }: VideoLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [userHasHelp, setUserHasHelp] = useState(245)

  const videos: VideoItem[] = [
    {
      id: "1",
      title: "Basic Self-Defense Techniques",
      description: "Learn fundamental self-defense moves suitable for everyone",
      duration: "12:34",
      instructor: "Sarah Chen",
      category: "Basics",
      ipfsHash: "QmVxXXXXXXXXXXXXXXXXXXXXXXXXXX",
      blockchainVerified: true,
      premium: false,
      views: 12400,
      rating: 4.8,
      thumbnail: "🥋",
    },
    {
      id: "2",
      title: "Situational Awareness",
      description: "How to identify and avoid dangerous situations",
      duration: "8:45",
      instructor: "Mike Johnson",
      category: "Awareness",
      ipfsHash: "QmWwwwwwwwwwwwwwwwwwwwwwwwwww",
      blockchainVerified: true,
      premium: false,
      views: 8900,
      rating: 4.9,
      thumbnail: "👀",
    },
    {
      id: "3",
      title: "Advanced Escape Techniques",
      description: "Professional escape methods from restraints",
      duration: "15:20",
      instructor: "Alex Rivera",
      category: "Advanced",
      ipfsHash: "QmZzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
      blockchainVerified: true,
      premium: true,
      views: 3200,
      rating: 4.95,
      thumbnail: "🔓",
    },
    {
      id: "4",
      title: "Personal Safety in Urban Areas",
      description: "Stay safe in cities and crowded places",
      duration: "10:15",
      instructor: "Emma Davis",
      category: "Urban",
      ipfsHash: "QmYyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
      blockchainVerified: true,
      premium: false,
      views: 5600,
      rating: 4.7,
      thumbnail: "🏙️",
    },
    {
      id: "5",
      title: "Home Security Essentials",
      description: "Secure your home against intruders",
      duration: "11:30",
      instructor: "James Wilson",
      category: "Security",
      ipfsHash: "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      blockchainVerified: true,
      premium: true,
      views: 6800,
      rating: 4.85,
      thumbnail: "🏠",
    },
    {
      id: "6",
      title: "Traveling Safely",
      description: "Safety tips for domestic and international travel",
      duration: "13:45",
      instructor: "Lisa Park",
      category: "Travel",
      ipfsHash: "QmUuuuuuuuuuuuuuuuuuuuuuuuuuuu",
      blockchainVerified: true,
      premium: true,
      views: 4500,
      rating: 4.8,
      thumbnail: "✈️",
    },
  ]

  const categories = ["All", "Basics", "Awareness", "Advanced", "Urban", "Security", "Travel"]
  const filteredVideos =
    selectedCategory && selectedCategory !== "All" ? videos.filter((v) => v.category === selectedCategory) : videos

  const handleWatchVideo = (video: VideoItem) => {
    if (video.premium && userHasHelp < 10) {
      alert("Need 10 HELP tokens to watch premium content. You have " + userHasHelp)
      return
    }
    setSelectedVideo(video)
    if (video.premium) {
      setUserHasHelp(userHasHelp - 10)
    }
  }

  if (selectedVideo) {
    return (
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <Button variant="outline" className="mb-6 gap-2 bg-transparent" onClick={() => setSelectedVideo(null)}>
          <ArrowLeft className="w-4 h-4" />
          Back to Library
        </Button>

        <Card className="bg-white border-none shadow-lg overflow-hidden">
          <div className="bg-slate-900 aspect-video flex items-center justify-center">
            <div className="text-center">
              <Video className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">Video Player - {selectedVideo.title}</p>
            </div>
          </div>

          <CardContent className="pt-8">
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl font-bold text-slate-900">{selectedVideo.title}</h1>
                  {selectedVideo.blockchainVerified && <Badge className="bg-green-600">✓ Verified</Badge>}
                </div>
                <p className="text-slate-600 mt-2">{selectedVideo.description}</p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Instructor</p>
                  <p className="font-medium text-slate-900">{selectedVideo.instructor}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Duration</p>
                  <p className="font-medium text-slate-900">{selectedVideo.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-slate-900">{selectedVideo.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Views</p>
                  <p className="font-medium text-slate-900">{(selectedVideo.views / 1000).toFixed(1)}K</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Video className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900">On-Chain Verified</p>
                    <p className="text-blue-700 mt-1">IPFS: {selectedVideo.ipfsHash}</p>
                    <p className="text-xs text-blue-600 mt-2">✓ Content authenticity verified on Algorand blockchain</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
                  onClick={() => setSelectedVideo(null)}
                >
                  <Play className="w-5 h-5" />
                  Now Playing
                </Button>
                <Button variant="outline" size="lg">
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="container max-w-4xl mx-auto px-4 py-8">
      <Button variant="outline" className="mb-6 gap-2 bg-transparent" onClick={onBack}>
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Self-Defense Video Library</h1>
        <p className="text-slate-600">
          Blockchain-verified safety training. All content stored on IPFS with on-chain authenticity.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-900">Category</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === "All" ? null : cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                (!selectedCategory && cat === "All") || selectedCategory === cat
                  ? "bg-purple-600 text-white"
                  : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <Card
            key={video.id}
            className="bg-white border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
            onClick={() => handleWatchVideo(video)}
          >
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 h-32 flex items-center justify-center text-4xl relative">
              {video.thumbnail}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>

            <CardContent className="pt-4">
              <div className="flex items-start gap-2 mb-2">
                <h3 className="font-semibold text-slate-900 flex-1">{video.title}</h3>
                {video.premium && (
                  <Badge className="bg-yellow-600 flex-shrink-0">
                    <Lock className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>

              <p className="text-xs text-slate-600 mb-3">{video.instructor}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>{video.duration}</span>
                  <span>{(video.views / 1000).toFixed(1)}K views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-slate-900">{video.rating}</span>
                </div>
              </div>

              {video.blockchainVerified && (
                <div className="p-2 bg-green-50 rounded border border-green-200 mb-3">
                  <p className="text-xs text-green-700">
                    ✓ <strong>Verified on Algorand</strong>
                  </p>
                </div>
              )}

              {video.premium ? (
                <div className="flex items-center gap-2 text-xs text-yellow-700">
                  <Zap className="w-3 h-3" />
                  <span>10 HELP tokens</span>
                </div>
              ) : (
                <p className="text-xs text-green-700 font-medium">Free • Open Access</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
