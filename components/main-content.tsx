import { Search, Plus, Paperclip, Smile, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function MainContent() {
  return (
    <div className="flex-grow p-6 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="Search for friends, groups, pages" className="pl-10 pr-4 py-2 w-full" />
          </div>
          <Button className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add New Post
          </Button>
        </div>
        
        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          {['x_ae-23b', 'maisenpai', 'saylortwift', 'johndoe', 'maryjane2', 'obama', 'x_ae-21', 'x_ae-23b'].map((user, index) => (
            <div key={index} className="flex flex-col items-center">
              <Avatar className="h-16 w-16 ring-2 ring-indigo-600 ring-offset-2">
                <AvatarImage src={`/placeholder.svg?height=64&width=64&text=${user}`} alt={user} />
                <AvatarFallback>{user.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-xs mt-1">{user}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40&text=X_AE_A-13" alt="@X_AE_A-13" />
              <AvatarFallback>XA</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-semibold">X_AE_A-13</p>
              <p className="text-sm text-gray-500">Product Designer, slothUI</p>
            </div>
          </div>
          <p className="mb-4">
            Habitant morbi tristique senectus et netus et. Suspendisse sed nisi lacus sed viverra. Dolor morbi
            non arcu risus quis varius. #amazing #great #lifetime #uiux #machinelearning
          </p>
          <img src="/placeholder.svg?height=300&width=600&text=Post+Image" alt="Post image" className="w-full rounded-lg mb-4" />
          <div className="flex justify-between text-gray-500 text-sm">
            <span>12 Likes</span>
            <span>25 Comments</span>
            <span>187 Share</span>
            <span>8 Saved</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Input type="text" placeholder="Write your comment.." className="ml-3 flex-grow" />
            <Button variant="ghost" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Smile className="h-4 w-4" />
            </Button>
            <Button size="icon" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}