"use client"

import { useState } from "react"
import { BottomNav } from "@/components/brutalist/bottom-nav"
import { BrutalistButton } from "@/components/brutalist/brutalist-button"
import { UserAvatar } from "@/components/brutalist/user-avatar"
import { ArrowLeft, Calendar, Check, ChevronRight, Download, Flag, MessageSquare, Clock, Users, Building2 } from "lucide-react"
import Link from "next/link"

interface Report {
  id: string
  employee: {
    name: string
    image?: string
  }
  period: string
  totalHours: number
  daysPresent: number
  status: "pending" | "approved" | "flagged"
  submittedAt: string
}

const reports: Report[] = [
  {
    id: "1",
    employee: { name: "Marcus Chen" },
    period: "Oct 14 - Oct 27",
    totalHours: 84.5,
    daysPresent: 10,
    status: "pending",
    submittedAt: "2 hours ago"
  },
  {
    id: "2",
    employee: { name: "Sarah Jenkins" },
    period: "Oct 14 - Oct 27",
    totalHours: 79.0,
    daysPresent: 9,
    status: "approved",
    submittedAt: "Yesterday"
  },
  {
    id: "3",
    employee: { name: "David Kalu" },
    period: "Oct 14 - Oct 27",
    totalHours: 45.5,
    daysPresent: 6,
    status: "flagged",
    submittedAt: "3 days ago"
  },
  {
    id: "4",
    employee: { name: "Elena Rossi" },
    period: "Oct 14 - Oct 27",
    totalHours: 88.0,
    daysPresent: 10,
    status: "approved",
    submittedAt: "1 week ago"
  },
]

const summaryStats = [
  { label: "Total Employees", value: "24", icon: Users, color: "bg-[#E0E7FF]", iconColor: "text-[#6B21A8]" },
  { label: "Pending Reviews", value: "8", icon: Clock, color: "bg-[#FEF3C7]", iconColor: "text-[#92400E]" },
  { label: "Approved", value: "14", icon: Check, color: "bg-[#D1FAE5]", iconColor: "text-[#059669]" },
  { label: "Flagged", value: "2", icon: Flag, color: "bg-[#FEE2E2]", iconColor: "text-[#991B1B]" },
]

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "flagged">("all")

  const filteredReports = filter === "all" 
    ? reports 
    : reports.filter(r => r.status === filter)

  const getStatusStyles = (status: Report["status"]) => {
    switch (status) {
      case "approved":
        return "bg-[#D1FAE5] text-[#059669]"
      case "flagged":
        return "bg-[#FEE2E2] text-[#991B1B]"
      default:
        return "bg-[#FEF3C7] text-[#92400E]"
    }
  }

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="w-9 h-9 border-[2px] border-[#1A1A1A] rounded-lg flex items-center justify-center hover:bg-[#F5F5F5] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
            </Link>
            <h1 className="text-xl font-bold text-[#1A1A1A] uppercase tracking-wide">Biweekly Reports</h1>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="px-5 py-2">
        <div className="grid grid-cols-2 gap-3">
          {summaryStats.map((stat) => (
            <div 
              key={stat.label}
              className="border-[2px] border-[#1A1A1A] rounded-lg p-3 bg-white shadow-[2px_2px_0px_#1A1A1A]"
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#1A1A1A]">{stat.value}</p>
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {(["all", "pending", "approved", "flagged"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border-[2px] border-[#1A1A1A] whitespace-nowrap transition-all ${
                filter === status
                  ? "bg-[#6B21A8] text-white shadow-[2px_2px_0px_#1A1A1A]"
                  : "bg-white text-[#1A1A1A] hover:bg-[#F5F5F5]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="px-5 space-y-3">
        {filteredReports.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report)}
            className="w-full border-[3px] border-[#1A1A1A] rounded-xl p-4 bg-white shadow-[4px_4px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1A1A1A] transition-all text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserAvatar name={report.employee.name} size="md" />
                <div>
                  <p className="font-bold text-[#1A1A1A]">{report.employee.name}</p>
                  <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    {report.period}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#6B7280]" />
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider">Hours</p>
                  <p className="font-bold text-[#1A1A1A]">{report.totalHours}h</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider">Days</p>
                  <p className="font-bold text-[#1A1A1A]">{report.daysPresent}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${getStatusStyles(report.status)}`}>
                {report.status}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Export Button */}
      <div className="px-5 py-6">
        <BrutalistButton variant="outline" fullWidth>
          <Download className="w-4 h-4" />
          Export All Reports
        </BrutalistButton>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl border-t-[3px] border-x-[3px] border-[#1A1A1A] max-h-[85vh] overflow-hidden">
            <div className="p-5 border-b border-[#E5E7EB]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserAvatar name={selectedReport.employee.name} size="lg" />
                  <div>
                    <h2 className="font-bold text-[#1A1A1A] text-lg">{selectedReport.employee.name}</h2>
                    <p className="text-sm text-[#6B7280]">{selectedReport.period}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="text-[#6B7280] hover:text-[#1A1A1A]"
                >
                  Close
                </button>
              </div>
            </div>
            
            <div className="p-5 space-y-4 overflow-y-auto max-h-[calc(85vh-200px)]">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border-[2px] border-[#1A1A1A] rounded-lg p-4 bg-[#F5F5F5]">
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider">Total Hours</p>
                  <p className="text-3xl font-bold text-[#1A1A1A] mt-1">{selectedReport.totalHours}h</p>
                </div>
                <div className="border-[2px] border-[#1A1A1A] rounded-lg p-4 bg-[#F5F5F5]">
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider">Days Present</p>
                  <p className="text-3xl font-bold text-[#1A1A1A] mt-1">{selectedReport.daysPresent}</p>
                </div>
              </div>
              
              {/* Daily breakdown placeholder */}
              <div className="border-[2px] border-[#1A1A1A] rounded-lg p-4">
                <h3 className="font-bold text-[#1A1A1A] uppercase tracking-wide text-sm mb-3">Daily Breakdown</h3>
                <div className="space-y-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                    <div key={day} className="flex items-center justify-between py-2 border-b border-[#E5E7EB] last:border-0">
                      <span className="text-sm font-medium text-[#1A1A1A]">{day}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#40E0D0]" 
                            style={{ width: `${70 + i * 5}%` }}
                          />
                        </div>
                        <span className="text-sm text-[#6B7280] w-12 text-right">{7 + i * 0.5}h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Actions */}
            {selectedReport.status === "pending" && (
              <div className="p-5 border-t border-[#E5E7EB] flex gap-3">
                <BrutalistButton variant="destructive" className="flex-1">
                  <Flag className="w-4 h-4" />
                  Flag
                </BrutalistButton>
                <BrutalistButton variant="accent" className="flex-1">
                  <MessageSquare className="w-4 h-4" />
                  Comment
                </BrutalistButton>
                <BrutalistButton variant="primary" className="flex-1">
                  <Check className="w-4 h-4" />
                  Approve
                </BrutalistButton>
              </div>
            )}
          </div>
        </div>
      )}

      <BottomNav />
    </main>
  )
}
