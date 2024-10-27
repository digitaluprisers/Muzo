"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    fetchUser()
  }, [])

  async function fetchUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUser(user)
      setEmail(user.email || "")
      const { data, error } = await supabase
        .from("users")
        .select("username")
        .eq("id", user.id)
        .single()
      if (data) setUsername(data.username)
    }
  }

  async function updateProfile() {
    const { data, error } = await supabase
      .from("users")
      .update({ username })
      .eq("id", user.id)

    if (error) console.error("Error updating profile:", error)
    else alert("Profile updated successfully!")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    