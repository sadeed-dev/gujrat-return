"use client"
import React, { Suspense } from "react";
import { Users, UserCheck, TrendingUp, FileText, CheckCircle } from "lucide-react"; // Icons can stay as-is
import { useAuth } from "../../../context/auth/AuthContext";
import { useGetLfaStatistics } from "../../../hook/use-dashboard.hook";

// Lazy load heavy components
const AdminLayout = React.lazy(() => import("../../../components/AdminLayout"));
const LfaChart = React.lazy(() => import("../LfaChart"));
const LocationDashboard = React.lazy(() => import("./LocationDashboard"));
const LiveLocationSender = React.lazy(() => import("../../../components/LiveLocationSender"));


const AdminDashboard = () => {
  const { data, isLoading } = useGetLfaStatistics()
  const stats = [
    {
      name: "Total LFAs",
      value: data?.totalLFAs || 0,
      change: "+12%",
      changeType: "increase",
      icon: UserCheck,
    },
    {
      name: "Approved Requests",
      value: data?.approvedLFAs || 0,
      change: "-5%",
      changeType: "decrease",
      icon: FileText,
    },
    {
      name: "Pending Requests",
      value: data?.pendingLFAs || 0,
      change: "-5%",
      changeType: "decrease",
      icon: FileText,
    },
    {
      name: "Completion Rate",
      value: data?.completionRate || "0%",
      change: "+2.1%",
      changeType: "increase",
      icon: TrendingUp,
    },
    {
      name: "Active Users",
      value: data?.totalUsers || 0,
      change: "+8%",
      changeType: "increase",
      icon: Users,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "LFA Application",
      description: "New LFA application from Ramesh Kumar",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      type: "Customer Registration",
      description: "New customer registered from Bhimtal village",
      time: "4 hours ago",
      status: "completed",
    },
    {
      id: 3,
      type: "Request Approved",
      description: "Work & Get Paid request approved for Sunita Devi",
      time: "6 hours ago",
      status: "completed",
    },
    {
      id: 4,
      type: "LFA Training",
      description: "LFA training completed for 15 facilitators",
      time: "1 day ago",
      status: "completed",
    },
  ]

  const { user } = useAuth()

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening with GramSeva today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-[oklch(0.7_0.15_160deg)]" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {isLoading ? <div className="h-8 w-12 bg-gray-200 rounded animate-pulse"></div> : stat.value}
                        </div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
          {/* Dynamic Chart Implementation */}
          <LfaChart data={data} isLoading={isLoading} />

<LocationDashboard user={user} /> 

<LiveLocationSender  user={user}/>

      {/* Recent Activities */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        activity.status === "completed" ? "bg-green-400" : "bg-yellow-400"
                      }`}
                    ></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {activity.status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
