import React, { useMemo, useState } from 'react'
import DataTable from '../../../shared/DataTable'
import { useGetAssignedLFAs, useUpdateLfaStatus } from '../../../hook/use-Lfa.hook'
import { Container, Typography, Box, TextField, Grid, Chip, IconButton, Button, Tooltip } from '@mui/material'
import StatusActions from './StatusActions'

import { useAuth } from '../../../context/auth/AuthContext'
import { DeleteIcon, EditIcon } from 'lucide-react'
import { Visibility as VisibilityIcon } from "@mui/icons-material"
import { Outlet, useNavigate } from 'react-router-dom'
import TaskActionButton from './TaskActionButton'
import TableSkeleton from '../../../shared/TableSkelton'
import useColumnVisibility from '../../../hook/use-columnVisibility.hook'
import ColumnVisibilityToggle from '../../../shared/ColumnVisibilityToggle'
import TaskColumns from './columns/TaskColumns'


const Task = () => {
  // Fetch all assigned LFAs (for admin)
  const { data, isLoading } = useGetAssignedLFAs()

  const naviagte = useNavigate()
 

  const handleView = (row) => {

    naviagte(`/admin/task/view/${row._id}`)
  }


  const {user}  = useAuth()
  // Search/filter state
  const [searchName, setSearchName] = useState("")
  const [searchAssignedBy, setSearchAssignedBy] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Define columns
const columns = TaskColumns(handleView);


  const {
    visibility,
    setValue,
    toggleField
  } = useColumnVisibility(columns, "taskTable");
  const visibleColumns = columns.filter(col => visibility[col.field] !== false);


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
    <>
          <div maxWidth="xl" sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
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

            
          <Box >
<ColumnVisibilityToggle
  columns={columns}
  visibility={visibility}
  setValue={setValue}
  toggleField={toggleField}
/>
</Box>
          </Grid>
        </Box>

      {
        isLoading ? (
  <TableSkeleton columns={columns.length} rows={8} />

        ): (
        <DataTable
          data={paginatedData}
          columns={visibleColumns}
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
        )
      }

      </div>
      <Outlet />
    </>

  )
}

export default Task