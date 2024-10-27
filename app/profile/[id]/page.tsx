"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ProfilePage() {
  const { id } = useParams()
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<any>(null)

  useEffect(() => {
    fetchUserAndPosts()
  }, [id])

  async function fetchUserAndPosts() {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single()

    if (userError) console.error("Error fetching user:", userError)
    else {
      setUser(userData)
      setEditedUser(userData)
    }

    const { data: postsData, error: postsError } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false })

    if (postsError) console.error("Error fetching posts:", postsError)
    else setPosts(postsData || [])
  }

  async function handleSaveProfile() {
    const { data, error } = await supabase
      .from("users")
      .update(editedUser)
      .eq("id", id)

    if (error) console.error("Error updating profile:", error)
    else {
      setUser(editedUser)
      setIsEditing(false)
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-20 w-20 mr-4">
                <AvatarImage src={user.avatar_url} />
                <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <p className="text-gray-500">{user.occupation}</p>
              </div>
            </div>
            {isEditing ? (
              <div>
                <Button onClick={handleSaveProfile} className="mr-2">Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <Input
                value={editedUser.username}
                onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                placeholder="Username"
              />
              <Input
                value={editedUser.occupation}
                onChange={(e) => setEditedUser({ ...editedUser, occupation: e.target.value })}
                placeholder="Occupation"
              />
              <Textarea
                value={editedUser.bio}
                onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                placeholder="Bio"
              />
            </div>
          ) : (
            <p>{user.bio}</p>
          )}
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4">Posts</h2>
      {posts.map((post) => (
        <Card key={post.id} className="mb-4">
          <CardContent className="pt-4">
            <p>{post.content}</p>
            {post.image_url && <img src={post.image_url} alt="Post image" className="mt-4 rounded-lg" />}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}