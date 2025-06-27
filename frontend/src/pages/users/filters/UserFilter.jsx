import React from "react";
import { useFormContext } from "react-hook-form";
import { Search, Filter, Users, CheckCircle } from "lucide-react";

const UserFilters = ({ onSearchEnter, onApplyFilters, onClearFilters, userCount }) => {
  const { register, watch } = useFormContext();

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearchEnter(watch("search"));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-emerald-100 px-6 mb-2 py-2">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        {/* Search Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-emerald-700 mb-2">Search Users</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-500" />
            <input
              type="text"
              placeholder="Search by name, email..."
              {...register("search")}
              onKeyDown={handleSearchKeyDown}
              className="w-full pl-7 pr-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-emerald-50/30"
            />
          </div>
        </div>

        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium text-emerald-700 mb-2">Filter by Role</label>
          <div className="relative">
            <select
              {...register("role")}
              className="w-full pl-10 pr-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-emerald-50/30 appearance-none cursor-pointer"
            >
              <option value="">All Roles</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="MODERATOR">Moderator</option>
            </select>
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-500" />
          </div>
        </div>

        {/* Approval Status Filter */}
        <div>
          <label className="block text-sm font-medium text-emerald-700 mb-2">Approval Status</label>
          <div className="relative">
            <select
              {...register("status")}
              className="w-full pl-10 pr-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-emerald-50/30 appearance-none cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="approved">✅ Approved</option>
              <option value="pending">⏳ Pending</option>
              <option value="rejected">❌ Rejected</option>
            </select>
            <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-500" />
          </div>
        </div>

        {/* Apply & Clear Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onApplyFilters}
            className="h-8 px-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap text-sm"
          >
            <Filter className="w-4 h-4" />
            Apply Filters
          </button>

          <button
            type="button"
            onClick={onClearFilters}
            className="h-8 px-3 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors duration-200 text-sm whitespace-nowrap"
          >
            Clear All
          </button>
        </div>

        {/* Users Found */}
        <div className="flex items-center gap-2 text-sm text-emerald-600 md:justify-end">
          <Users className="w-4 h-4" />
          <span>{userCount} users found</span>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;
