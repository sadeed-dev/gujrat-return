import React from 'react'

const StatCard = ({ value, label, icon: Icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full text-emerald-600 mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  )
}

export default StatCard
