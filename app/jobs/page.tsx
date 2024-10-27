"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) console.error("Error fetching jobs:", error)
    else setJobs(data || [])
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      {jobs.map((job) => (
        <Card key={job.id} className="mb-4">
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p className="mt-2">{job.description}</p>
            <Button className="mt-4">Apply</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}