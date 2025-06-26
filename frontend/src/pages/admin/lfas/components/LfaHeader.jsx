// components/partials/LfaHeader.jsx
import React from "react"
import { Box, Typography, Button } from "@mui/material"

const LfaHeader = ({ activeView, setActiveView, chatCount }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
      <Typography variant="h4" component="h1" fontWeight={500} sx={{ color: "#16a34a" }}>
        LFA Management System
      </Typography>
      <Box display="flex" gap={1}>
        <Button
          variant={activeView === "table" ? "contained" : "outlined"}
          onClick={() => setActiveView("table")}
          sx={{
            backgroundColor: activeView === "table" ? "#16a34a" : "transparent",
            borderColor: "#16a34a",
            color: activeView === "table" ? "white" : "#16a34a",
            "&:hover": {
              backgroundColor: activeView === "table" ? "#15803d" : "#f0fdf4",
            },
          }}
        >
          LFA Table
        </Button>
        <Button
          variant={activeView === "chat" ? "contained" : "outlined"}
          onClick={() => setActiveView("chat")}
          sx={{
            backgroundColor: activeView === "chat" ? "#16a34a" : "transparent",
            borderColor: "#16a34a",
            color: activeView === "chat" ? "white" : "#16a34a",
            "&:hover": {
              backgroundColor: activeView === "chat" ? "#15803d" : "#f0fdf4",
            },
          }}
        >
          Chat Rooms ({chatCount})
        </Button>
      </Box>
    </Box>
  )
}

export default LfaHeader
