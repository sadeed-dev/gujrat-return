
import { useState, useMemo } from "react"
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Button, Menu, MenuItem, Paper, Typography, Box, CircularProgress, useTheme } from "@mui/material"
import { BarChart3, ChevronDown } from "lucide-react"


const chartTypes = ["area", "line", "bar"] 

// Custom tooltip component for Recharts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper elevation={3} sx={{ p: 1.5, border: "1px solid #f0f0f0" }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {label}
        </Typography>
        {payload.map((entry, index) => (
          <Box key={`tooltip-item-${index}`} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <Box
              component="span"
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: entry.color,
                display: "inline-block",
                mr: 1,
              }}
            />
            <Typography variant="body2" sx={{ mr: 1 }}>
              {entry.name}:
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {entry.value}
            </Typography>
          </Box>
        ))}
      </Paper>
    )
  }
  return null
}

export default function LfaChart({ data, isLoading }) {
  const [chartType, setChartType] = useState("area")
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (type) => {
    setChartType(type)
    handleClose()
  }

  // Generate trend data based on current statistics
  const trendData = useMemo(() => {
    if (!data || isLoading) {
      return []
    }

    const currentTotal = data.totalLFAs || 0
    const currentApproved = data.approvedLFAs || 0
    const currentPending = data.pendingLFAs || 0
    const currentRejected = currentTotal - currentApproved - currentPending

    // Generate 6 months of trend data based on current values
    // This simulates historical data - replace with actual historical data when available
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

    return months.map((month, index) => {
      const factor = (index + 1) / 6 // Growth factor from 1/6 to 1
      const randomVariation = 0.8 + Math.random() * 0.4 // Random variation between 0.8 and 1.2

      return {
        month,
        applications: Math.round(currentTotal * factor * randomVariation),
        approved: Math.round(currentApproved * factor * randomVariation),
        pending: Math.round(currentPending * factor * randomVariation),
        rejected: Math.round(currentRejected * factor * randomVariation),
      }
    })
  }, [data, isLoading])

  // Define chart colors
  const chartColors = {
    applications: "#22c55e", // Green
    approved: "#3b82f6", // Blue
    pending: "#eab308", // Yellow
    rejected: "#ef4444", // Red
  }

  if (isLoading) {
    return (
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" component="h3">
            LFA Applications Trend
          </Typography>
          <BarChart3 size={20} color={theme.palette.text.secondary} />
        </Box>
        <Box
          sx={{
            height: 256,
            bgcolor: "action.hover",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={40} />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
            Loading chart data...
          </Typography>
        </Box>
      </Paper>
    )
  }

  if (!data || trendData.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" component="h3">
            LFA Applications Trend
          </Typography>
          <BarChart3 size={20} color={theme.palette.text.secondary} />
        </Box>
        <Box
          sx={{
            height: 256,
            bgcolor: "action.hover",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No data available
          </Typography>
        </Box>
      </Paper>
    )
  }

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box>
          <Typography variant="h6" component="h3">
            LFA Applications Trend
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Total: {data.totalLFAs} | Approved: {data.approvedLFAs} | Pending: {data.pendingLFAs}
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            size="small"
            endIcon={<ChevronDown size={16} />}
            onClick={handleClick}
            sx={{ textTransform: "capitalize" }}
          >
            {chartType.charAt(0).toUpperCase() + chartType.slice(1)}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {chartTypes.map((type) => (
              <MenuItem key={type} onClick={() => handleMenuItemClick(type)} selected={chartType === type}>
                {type.charAt(0).toUpperCase() + type.slice(1)} Chart
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      <Box sx={{ height: 256, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={trendData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColors.applications} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={chartColors.applications} stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColors.approved} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={chartColors.approved} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="applications"
                name="Applications"
                stroke={chartColors.applications}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorApplications)"
              />
              <Area
                type="monotone"
                dataKey="approved"
                name="Approved"
                stroke={chartColors.approved}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorApproved)"
              />
            </AreaChart>
          ) : chartType === "line" ? (
            <LineChart data={trendData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="applications"
                name="Applications"
                stroke={chartColors.applications}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="approved"
                name="Approved"
                stroke={chartColors.approved}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="pending"
                name="Pending"
                stroke={chartColors.pending}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="rejected"
                name="Rejected"
                stroke={chartColors.rejected}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          ) : (
            <BarChart data={trendData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="applications" name="Applications" fill={chartColors.applications} radius={[4, 4, 0, 0]} />
              <Bar dataKey="approved" name="Approved" fill={chartColors.approved} radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" name="Pending" fill={chartColors.pending} radius={[4, 4, 0, 0]} />
              <Bar dataKey="rejected" name="Rejected" fill={chartColors.rejected} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </Box>
    </Paper>
  )
}
