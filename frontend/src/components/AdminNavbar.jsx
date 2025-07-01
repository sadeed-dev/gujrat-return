"use client"

import { useState } from "react"
import { href, Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
 
  UserCheck,
  FileText,
  Shield,
  Settings,
  Menu,
  X,
  Bell,
  Users ,
  CloudUpload,
  Search,
  LogOut,
  NotepadText,
  Home,
  MessageSquare
} from "lucide-react"
import { toast } from "sonner"

import { Tooltip } from '@mui/material';
import React from "react"
import { useAuth } from "../context/auth/AuthContext"
import NotificationBell from "./notification/NotificationBell"
import LiveLocationSender from "./LiveLocationSender";


const AdminNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { user, setUser } = useAuth()

  const navigate = useNavigate()


  // Navigation array with roles specified
  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, roles: ["ADMIN"] },
    { name: "LFAs", href: "/admin/lfas", icon: UserCheck, roles: ["ADMIN", "USER"] },
    { name: "Task", href: "/admin/task", icon: NotepadText, roles: ["ADMIN", "USER"] },
    // { name: "Upload Tasks", href: "/user/task-uploads", icon:CloudUpload, roles: ["ADMIN", "USER"] },

    // { name: "Customers", href: "/admin/customers", icon: Users, roles: ["ADMIN"] },
    // { name: "Requests", href: "/admin/requests", icon: FileText, roles: ["ADMIN"] , disabled: true },
       { name: "Users", href: "/admin/users", icon: Users, roles: ["ADMIN"] },
        {name: "Setting", href:"/admin/setting", icon: Settings, roles: ["ADMIN", "USER"]},
        {name: "Home", href:"/", icon: Home, roles: ["ADMIN", "USER"]},

  ];


  const filteredNavigation = navigation?.filter(item => item?.roles?.includes(user?.role));
const isActive = (href) => {
  if (href === "/") {
    return location.pathname === "/";
  }
  if (href === "/admin") {
    return location.pathname === "/admin";
  }
  return location.pathname.startsWith(href);
};


  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
    setUser("")
    toast.success("Logout successfully")

  }
  return (
<>

                {user && <LiveLocationSender user={user} />}


    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-[oklch(0.7_0.15_160deg)]">GramSeva Admin</h1>
            </div>
            <nav className="mt-5 space-y-1 px-2">
              {navigation.map((item,i) => (
                <Link
                  key={i}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive(item.href)
                    ? "bg-[oklch(0.95_0.05_160deg)] text-[oklch(0.7_0.15_160deg)]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  <item.icon
                    className={`mr-4 h-6 w-6 ${isActive(item.href) ? "text-[oklch(0.7_0.15_160deg)]" : "text-gray-400 group-hover:text-gray-500"
                      }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-[oklch(0.7_0.15_160deg)]">GramSeva Admin</h1>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {filteredNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive(item.href)
                      ? "bg-[oklch(0.95_0.05_160deg)] text-[oklch(0.7_0.15_160deg)]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  <item.icon
                    className={`mr-4 h-6 w-6 ${isActive(item.href)
                        ? "text-[oklch(0.7_0.15_160deg)]"
                        : "text-gray-400 group-hover:text-gray-500"
                      }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[oklch(0.7_0.15_160deg)] lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex flex-1 justify-between">
              <div className="flex flex-1">
                {/* <div className="relative w-full max-w-lg lg:max-w-xs">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-[oklch(0.7_0.15_160deg)] focus:outline-none focus:ring-1 focus:ring-[oklch(0.7_0.15_160deg)]"
                    placeholder="Search..."
                    type="search"
                  />
                </div> */}
              </div>
              <div className="ml-4 flex items-center md:ml-6">

                <div
  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.15_160deg)] focus:ring-offset-2"
>
  <NotificationBell />
</div>



                <div className="relative ml-3">
                  <div className="flex items-center">
                    {/* <button
                      type="button"
                      className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.15_160deg)] focus:ring-offset-2"
                    >
                      <img className="h-8 w-8 rounded-full" src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    </button> */}
<div className="ml-3 hidden md:block">
  <div className="flex flex-col">
    <div className="flex items-center gap-2 text-base font-medium text-gray-800">
      {user?.name}
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
        {user?.role}
      </span>
    </div>
    <div className="text-sm font-medium text-gray-500">
      {user?.email}
    </div>
  </div>
</div>


                    <Tooltip title='Logout' >

                      <button
                        type="button"
                        className="ml-3 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.15_160deg)] focus:ring-offset-2"
                      >
                        <LogOut className="h-5 w-5 cursor-pointer" onClick={handleLogout} />
                      </button>
                    </Tooltip>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>


    </div>
    </>

  )
}

export default AdminNavbar
