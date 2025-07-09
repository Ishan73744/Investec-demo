"use client"

import type React from "react"

import type { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Briefcase, CaseUpper, ShieldAlert, LinkIcon, Linkedin } from "lucide-react"
import type { CompanyScreeningData, TimelineEvent } from "@/lib/workflow/types"

interface CheckTimelineProps {
  title: string
  events: TimelineEvent[]
  icon: React.ReactNode
}

const CheckTimeline: FC<CheckTimelineProps> = ({ title, events, icon }) => (
  <div>
    <h4 className="text-md font-semibold text-[#001742] flex items-center mb-3">
      {icon}
      <span className="ml-2">{title}</span>
    </h4>
    {events.length > 0 ? (
      <div className="relative pl-6">
        <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200" />
        {events.map((event, index) => (
          <div key={event.id} className="relative mb-6">
            <div className="absolute -left-[34px] top-1.5 h-4 w-4 rounded-full bg-white border-2 border-[#004ce6]" />
            <p className="text-xs text-gray-500 mb-1">{event.date}</p>
            <p className="font-semibold text-sm text-gray-800">{event.title}</p>
            <p className="text-sm text-gray-600 mb-2">{event.description}</p>
            <Link href={event.sourceUrl} passHref>
              <Button variant="link" className="p-0 h-auto text-xs text-[#004ce6]">
                View Source
              </Button>
            </Link>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-500 pl-6">No records found.</p>
    )}
  </div>
)

interface CompanyScreeningReportProps {
  data: CompanyScreeningData
}

export const CompanyScreeningReport: FC<CompanyScreeningReportProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Company Profile Card */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50/50 p-4 border-b">
          <div className="flex items-center space-x-4">
            <Image
              src={data.logoUrl || "/placeholder.svg"}
              alt={`${data.name} logo`}
              width={48}
              height={48}
              className="rounded-lg"
            />
            <div>
              <CardTitle className="text-xl text-[#001742]">{data.name}</CardTitle>
              <p className="text-sm text-gray-500 flex items-center">
                <Briefcase className="w-4 h-4 mr-2" /> {data.sector}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <p className="text-sm text-gray-700">{data.description}</p>
          <Link href={data.websiteUrl} passHref>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <LinkIcon className="w-4 h-4" />
              Visit Website
            </Button>
          </Link>
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <CheckTimeline
              title="Court Checks"
              events={data.courtChecks}
              icon={<CaseUpper className="w-5 h-5 text-[#004ce6]" />}
            />
            <CheckTimeline
              title="AML Checks"
              events={data.amlChecks}
              icon={<ShieldAlert className="w-5 h-5 text-[#004ce6]" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Management Screening Section */}
      <div>
        <h3 className="text-lg font-semibold text-[#001742] mb-4">Management Screening</h3>
        <div className="space-y-4">
          {data.management.map((person) => (
            <Card key={person.id} className="overflow-hidden">
              <CardHeader className="p-4 border-b bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={person.imageUrl || "/placeholder.svg"} alt={person.name} />
                      <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-[#001742]">{person.name}</p>
                      <p className="text-sm text-gray-500">{person.title}</p>
                    </div>
                  </div>
                  <Link href={person.linkedinUrl} passHref>
                    <Button variant="ghost" size="icon">
                      <Linkedin className="w-5 h-5 text-gray-500 hover:text-[#004ce6]" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-4 grid md:grid-cols-2 gap-6">
                <CheckTimeline
                  title="Court Checks"
                  events={person.courtChecks}
                  icon={<CaseUpper className="w-5 h-5 text-[#004ce6]" />}
                />
                <CheckTimeline
                  title="AML Checks"
                  events={person.amlChecks}
                  icon={<ShieldAlert className="w-5 h-5 text-[#004ce6]" />}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
