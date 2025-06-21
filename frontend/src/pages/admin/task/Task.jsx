import React, { useMemo, useState } from 'react'
import AdminLayout from '../../../components/AdminLayout'
import DataTable from '../../../shared/DataTable'
import { useGetAssignedLFAs, useUpdateLfaStatus } from '../../../hook/use-Lfa.hook'
import { Container, Typography, Box, TextField, Grid, Chip, IconButton, Button, Tooltip } from '@mui/material'
import StatusActions from './StatusActions'

import { useAuth } from '../../../context/auth/AuthContext'
import { DeleteIcon, EditIcon } from 'lucide-react'
import { Visibility as VisibilityIcon } from "@mui/icons-material"
import { Outlet, useNavigate } from 'react-router-dom'
import TaskActionButton from './TaskActionButton'


const Task = () => {
  // Fetch all assigned LFAs (for admin)
  const { data, isLoading } = useGetAssignedLFAs()
  console.log(data);
  const naviagte = useNavigate()
 

  const handleView = (row) => {
    console.log("View row:", row)
    naviagte(`/admin/task/view/${row._id}`)
  }


  const {user}  = useAuth()
  // Search/filter state
  const [searchName, setSearchName] = useState("")
  const [searchAssignedBy, setSearchAssignedBy] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Define columns
const columns = [
  { field: "serial", headerName: "S.No.", type: "serial", minWidth: 80, align: "center" 
    
  },
    {
      field: "lfaId",
      headerName: "LFA ID",
      minWidth: 100,
      align: "center",
      renderCell: (params) =>
        params.row?.lfaId && (
          <Chip
            label={params.row.lfaId}
            sx={{
              backgroundColor: "oklch(75% 0.145 163.225)",
              color: "#ffffff",
            }}
            size="small"
          />
        ),
    },

  { field: "assignedBy", headerName: "Assigned By", minWidth: 150, align: "center" },
    { field: "assignedTo", headerName: "Assigned To", minWidth: 150, align: "center" },

  { field: "interestedWork", headerName: "Interested Work", minWidth: 180, align: "center" ,
     renderCell: (params) =>
       params.row?.interestedWork && (
         <Chip
           label={params.row.interestedWork}
           sx={{
             backgroundColor: "oklch(75% 0.145 163.225)",
             color: "#ffffff",
           }}
           size="small"
         />
       ),
   },
  { field: "name", headerName: "Name", minWidth: 150, align: "center" },
  { field: "mobileNumber", headerName: "Mobile Number", minWidth: 150, align: "center" },
  { field: "assignedDate", headerName: "Assigned Date", minWidth: 160, align: "center" },
  { field: "state", headerName: "State", minWidth: 120, align: "center" },
  { field: "district", headerName: "District", minWidth: 120, align: "center" },
  { field: "tehsil", headerName: "Tehsil", minWidth: 10, align: "center" },
  {
    field: "status",
    headerName: "Status",
    type: "status",
    minWidth: 100,
    align: "center",
    renderCell: (params) => {
      const status = params.row?.status;
  
      const statusColors = {
        pending: { backgroundColor: "#facc15", color: " #222222" },     // Yellow
        approved: { backgroundColor: "#22c55e", color: "#fff" },    // Green
        rejected: { backgroundColor: "#ef4444", color: "#fff" },    // Red
      };
  
      const { backgroundColor, color } = statusColors[status] || {
        backgroundColor: "#e5e7eb", // Default gray
        color: "#1f2937",
      };
  
      return (
        <Chip
          label={status}
          size="small"
          sx={{
            backgroundColor,
            color,
            fontWeight: 500,
            borderRadius: "9999px",
          }}
        />
      );
    },
  },
  
  // Conditionally include the Actions column for ADMIN only
    ...(user?.role === "ADMIN"
      ? [
            {
              field: "actions",
              headerName: "Actions",
              minWidth: 120,
              align: "center",
              renderCell: ({ row }) => <StatusActions row={row} 
                                         useUpdateHook ={useUpdateLfaStatus}
                                          dialogText={{
    approveTitle: "Approve Task",
    approveContent: "Are you sure you want to approve this task?",
    rejectTitle: "Reject Task",
    rejectContent: "Are you sure you want to reject this task",
  }}
              />,
            },
          ]
        : []),
{
      field: "view",
      headerName: "View",
      minWidth: 140,
      align: "center",
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" gap={1}>
          <Tooltip title="View Task Details">
          <IconButton
           key={`actions-${row._id}`}
            size="small"
            onClick={() => handleView(row)}
            title="View"
            sx={{
              color: "#10b981", // Green/Emerald
              backgroundColor: "#d1fae5", // Light green hover

              "&:hover": {
                backgroundColor: "#d1fae5", // Light green hover
                transform: "scale(1.1)",
              },
            }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          </Tooltip>
       
        </Box>
      ),
    },

    
{
  field: "taskAction",
  headerName: "Task",
  minWidth: 160,
  align: "center",
  renderCell: ({ row }) => <TaskActionButton row={row} />,
}

];


  // Prepare and filter data
  const filteredData = useMemo(() => {
    if (!Array.isArray(data?.data)) return []
    return data?.data
      .map(item => ({
        ...item,
        assignedBy: item.assignment?.assignedBy?.name || "-", // admin name
        assignedTo: item.assignment?.assignedTo?.name || "-", // lfa name
        assignedByEmail: item.assignment?.assignedBy?.email || "",
        assignedDate: item.assignment?.assignedAt
          ? new Date(item.assignment.assignedAt).toLocaleDateString()
          : "-",
        interestedWork: Array.isArray(item.interestedWork)
          ? item.interestedWork.join(", ")
          : item.interestedWork || "-",
      }))
      .filter(item =>
        (!searchName || item.name?.toLowerCase().includes(searchName.toLowerCase())) &&
        (!searchAssignedBy || item.assignedBy?.toLowerCase().includes(searchAssignedBy.toLowerCase()))
      )
  }, [data, searchName, searchAssignedBy])

  // Pagination
  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage
    return filteredData.slice(start, start + rowsPerPage)
  }, [filteredData, page, rowsPerPage])

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <Box mb={3}>
          <Typography variant="h4" component="h1" fontWeight={500} sx={{ color: "#16a34a" }}>
            All Assigned LFA Tasks
          </Typography>
        </Box>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Search Name"
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Search Assigned By"
                value={searchAssignedBy}
                onChange={e => setSearchAssignedBy(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </Box>
        <DataTable
          data={paginatedData}
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={filteredData.length}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onStatusChange={() => { }}
          // renderActions={(row) => <StatusActions row={row} />}
          onAssign={() => { }}
          editDelteBtn={false}
        />
      </Container>
      <Outlet />
    </AdminLayout>
  )
}

export default Task