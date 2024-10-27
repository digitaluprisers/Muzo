"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

export function AddPost() {
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) throw new Error("No user found")

      let image_url = null
      if (image) {
        const { data, error } = await supabase.storage
          .from("post-images")
          .upload(`${user.id}/${Date.now()}-${image.name}`, image)
        if (error) throw error
        image_url = supabase.storage.from("post-images").getPublicUrl(data.path).data.publicUrl
      }

      const { data, error } = await supabase
        .from("posts")
        .insert([{ user_id: user.id, content, image_url }])
        .select()

      if (error) throw error

      setContent("")
      setImage(null)
      router.refresh()
    } catch (error) {
      console.error("Error adding post:", error)
      alert("Error adding post. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Add New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-4"
            required
          />
          <div className="flex items-center space-x-2">
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            <Button type="button" variant="outline" onClick={() => document.getElementById("image")?.click()}>
              <ImageIcon className="mr-2 h-4 w-4" />
              {image ? "Change Image" : "Add Image"}
            </Button>
            {image && <span className="text-sm text-gray-500">{image.name}</span>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading}>
            <Plus className="mr-2 h-4 w-4" />
            {loading ? "Posting..." : "Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}