"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function MatrimonialsPage() {
  const [profiles, setProfiles] = useState<any[]>([])

  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchProfiles() {
    const { data, error } = await supabase
      .from("matrimonial_profiles")
      .select("*, user:users(*)")

    if (error) console.error("Error fetching profiles:", error)
    else setProfiles(data || [])
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Matrimonial Profiles</h1>
      {profiles.map((profile) => (
        <Card key={profile.id} className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={profile.user.avatar_url} />
                <AvatarFallback>{profile.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              {profile.user.username}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Age:</strong> {profile.age}</p>
            <p><strong>Occupation:</strong> {profile.occupation}</p>
            <p><strong>Location:</strong> {profile.location}</p>
            <p  className="mt-2">{profile.bio}</p>
            <Button className="mt-4">Connect</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}