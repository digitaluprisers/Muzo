"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true })

    if (error) console.error("Error fetching events:", error)
    else setEvents(data || [])
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      {events.map((event) => (
        <Card key={event.id} className="mb-4">
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-2">{new Date(event.date).toLocaleString()}</p>
            <p>{event.description}</p>
            <Button className="mt-4">RSVP</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}