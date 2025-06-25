"use client"

import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Grid,
  IconButton,
  Paper,
  Box,
  Divider,
} from "@mui/material"
import {
  Close as CloseIcon,
  Person,
  Phone,
  LocationOn,
  Assignment,
  Schedule,
} from "@mui/icons-material"
import { useNavigate, useParams } from "react-router-dom"
import { useGetLFAs } from "../../../../hook/use-Lfa.hook"
import { formatDateTime } from "../../../../utils/dateUtils"

const TaskViewDialog = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const { data: taskData } = useGetLFAs(id)

  useEffect(() => {
    if (id) setOpen(true)
  }, [id])

  const handleClose = () => {
    setOpen(false)
    navigate("/admin/task")
  }

  if (!taskData) return null

  const getStatusColor = (status) => {
    const statusColors = {
      pending: { backgroundColor: "#facc15", color: "#222" },
      approved: { backgroundColor: "#22c55e", color: "#fff" },
      rejected: { backgroundColor: "#ef4444", color: "#fff" },
    }
    return statusColors[status] || { backgroundColor: "#e5e7eb", color: "#1f2937" }
  }

  const InfoItem = ({ icon, label, value }) => (
    <Box display="flex" gap={2} alignItems="center" py={1}>
      {icon}
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          {value || "-"}
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h6" fontWeight={600}>
            Task Details
          </Typography>
          {taskData.lfaId && (
            <Chip label={taskData.lfaId} size="small" color="primary" />
          )}
        </Box>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid sx={{display:'flex', gap:2}} spacing={1.5}>
          <Grid item xs={1} md={6}>
            <Section title="Personal Information">
              <InfoItem icon={<Person fontSize="small" />} label="Name" value={taskData.name} />
              <InfoItem icon={<Phone fontSize="small" />} label="Mobile" value={taskData.mobileNumber} />
              {taskData.email && (
                <InfoItem icon={<Assignment fontSize="small" />} label="Email" value={taskData.email} />
              )}
            </Section>
          </Grid>
 {console.log(taskData)}
          <Grid item xs={12} md={6}>
         
            <Section title="Assignment Details">
              <InfoItem icon={<Person fontSize="small" />} label="Assigned By" value={taskData?.assignment?.assignedBy?.name} />
              <InfoItem icon={<Person fontSize="small" />} label="Assigned To" value={taskData?.assignment?.assignedTo?.name} />
              <InfoItem icon={<Schedule fontSize="small" />} label="Date" value={formatDateTime(taskData?.assignment?.assignedAt)} />
            </Section>
          </Grid>

          <Grid item xs={12} md={6}>
            <Section title="Location">
              <InfoItem icon={<LocationOn fontSize="small" />} label="State" value={taskData.state} />
              <InfoItem icon={<LocationOn fontSize="small" />} label="District" value={taskData.district} />
              <InfoItem icon={<LocationOn fontSize="small" />} label="Tehsil" value={taskData.tehsil} />
            </Section>
          </Grid>

          <Grid item xs={12} md={6}>
            <Section title="Work & Status">
              <Typography variant="caption" color="text.secondary">
                Interested Work
              </Typography>
              <Box mt={1} mb={2}>
                {taskData.interestedWork ? (
                  <Chip label={taskData.interestedWork} color="secondary" />
                ) : (
                  <Typography>-</Typography>
                )}
              </Box>

              <Divider sx={{ my: 1 }} />

              <Typography variant="caption" color="text.secondary">
                Status
              </Typography>
              <Box mt={1}>
                <Chip
                  label={taskData.status || "pending"}
                  sx={{
                    ...getStatusColor(taskData.status),
                    fontWeight: 600,
                    borderRadius: "999px",
                  }}
                />
              </Box>
            </Section>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const Section = ({ title, children }) => (
  <Paper variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
      {title}
    </Typography>
    {children}
  </Paper>
)

export default TaskViewDialog
