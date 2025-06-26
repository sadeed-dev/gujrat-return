// components/partials/StatusCards.jsx
import React from "react"
import { Grid, Card, CardContent, Typography } from "@mui/material"

const StatusCards = ({ statusCounts, total }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={3}>
        <Card sx={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#fb923c", fontWeight: 600 }}>
              {statusCounts.pending || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">Pending</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Card sx={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#16a34a", fontWeight: 600 }}>
              {statusCounts.approved || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">Approved</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Card sx={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#ef4444", fontWeight: 600 }}>
              {statusCounts.rejected || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">Rejected</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Card sx={{ backgroundColor: "#f0f9ff", border: "1px solid #bae6fd" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#3b82f6", fontWeight: 600 }}>
              {total}
            </Typography>
            <Typography variant="body2" color="text.secondary">Total</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default StatusCards
