import Link from "next/link"
import { Home, BookOpen, Users, Code, CreditCard, Settings, HelpCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Sidebar() {
  return (
    <div className="w-64 bg-indigo-600 text-white p-4 flex flex-col h-full">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mr-2">S</div>
        <span className="text-xl font-semibold">slothui</span>
      </div>
      <div className="space-y-2 flex-grow">
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-700">
          <Home className="mr-2 h-4 w-4" />
          Feed
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-700">
          <BookOpen className="mr-2 h-4 w-4" />
          Stories
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-700">
          <Users className="mr-2 h-4 w-4" />
          Friends
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-700">
          <Code className="mr-2 h-4 w-4" />
          APIs
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-700">
          <CreditCard className="mr-2 h-4 w-4" />
          Subscription
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-700">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-700">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help & Support
        </Button>
      </div>
      <Button className="w-full bg-indigo-500 hover:bg-indigo-400 text-white">
        <Star className="mr-2 h-4 w-4" />
        Go Pro
      </Button>
      <div className="mt-4 flex items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@azunyan" />
          <AvatarFallback>AW</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-medium">Azunyan U. Wu</p>
          <p className="text-xs text-indigo-200">Basic Member</p>
        </div>
      </div>
    </div>
  )
}