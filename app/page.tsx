import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { RightSidebar } from "@/components/right-sidebar"

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <MainContent />
      <RightSidebar />
    </div>
  )
}