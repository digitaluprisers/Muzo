import { Plus, ChevronRight, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RightSidebar() {
  return (
    <div className="w-80 p-4 bg-white border-l">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Friend Suggestions</h2>
          <Button variant="link" className="text-indigo-600">
            See All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        {['Julia Smith', 'Vermillion D. Gray', 'Mai Senpai', 'Azunyan U. Wu', 'Oarack Babama'].map((name, index) => (
          <div key={index} className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${name.split(' ').map(n => n[0]).join('')}`} alt={name} />
                <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="font-medium">{name}</p>
                <p className="text-sm text-gray-500">@{name.toLowerCase().replace(' ', '')}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-4">Profile Activity</h2>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex -space-x-2 mb-2">
            {[...Array(7)].map((_, i) => (
              <Avatar key={i} className="h-8 w-8 border-2 border-white">
                <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${i + 1}`} />
                <AvatarFallback>{i + 1}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className="font-semibold text-2xl mb-1">+1,158 Followers</p>
          <p className="text-green-600 text-sm">↑ 23% vs last month</p>
          <p className="text-sm text-gray-600 mt-2">You gained a substantial amount of followers this month!</p>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-4">Upcoming Events</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-indigo-100 text-indigo-600 rounded-lg p-2 mr-3">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Friend's Birthday</p>
              <p className="text-sm text-gray-500">Jun 25, 2023</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}