"use client"
import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Chip,
  Box,
  Typography,
  Button,
  TableSortLabel
} from "@mui/material"
import { Edit as EditIcon, Delete as DeleteIcon, AttachFile as FileIcon } from "@mui/icons-material"
import { useAuth } from "../context/auth/AuthContext"

const DataTable = ({
  data = [],
  columns = [],
  page = 0,
  rowsPerPage = 10,
  totalCount = 0,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  onStatusChange,
  onAssign,
  renderActions,
  editDeleteBtn,
  getRowProps,
}) => {

  const { user } = useAuth()

  const [orderBy, setOrderBy] = useState("")
  const [orderDirection, setOrderDirection] = useState("asc")

  const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === "asc"
    setOrderDirection(isAsc ? "desc" : "asc")
    setOrderBy(field)
  }

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(Number.parseInt(event.target.value, 10))
  }

  const handleStatusChange = (row, newStatus) => {
    if (newStatus !== row.status) {
      onStatusChange(row, newStatus)
    }
  }

  const sortedData = React.useMemo(() => {
    const sorted = [...data]
    if (orderBy) {
      sorted.sort((a, b) => {
        const valA = a[orderBy] ?? ""
        const valB = b[orderBy] ?? ""
        if (valA < valB) return orderDirection === "asc" ? -1 : 1
        if (valA > valB) return orderDirection === "asc" ? 1 : -1
        return 0
      })
    }
    return sorted
  }, [data, orderBy, orderDirection])

  const renderCellContent = (column, row, rowIndex) => {
    const value = row[column.field]
    if (column.renderCell) {
      return column.renderCell({ row, value, rowIndex })
    }

    switch (column.type) {
      case "serial":
        return (
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              color: "#333333",
            }}
          >
            {page * rowsPerPage + rowIndex + 1}
          </Box>
        )
      case "file":
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <FileIcon fontSize="small" sx={{ color: "#4ade80" }} />
            <Typography variant="body2">{value ? "Uploaded" : "Not uploaded"}</Typography>
          </Box>
        )
      case "multiselect":
        return (
          <Box display="flex" flexWrap="wrap" gap={0.5}>
            {value?.map((item, index) => (
              <Chip
                key={index}
                label={item}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: "0.75rem",
                  borderColor: "#4ade80",
                  color: "#16a34a",
                }}
              />
            ))}
          </Box>
        )
      case "assign":
        return row?.assignment?.assignedTo?.name ? (
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              "&:hover .edit-icon": { opacity: 1 },
            }}
          >
            <Chip
              variant="outlined"
              label={row.assignedUserName}
              sx={{
                borderColor: "#16a34a",
                color: "#16a34a",
                fontWeight: 500,
                fontSize: "0.9rem",
                borderRadius: "9999px",
                px: 1.5,
              }}
            />
            <IconButton
              size="small"
              className="edit-icon"
              onClick={() => onAssign(row)}
              sx={{
                position: "absolute",
                top: -6,
                right: -6,
                p: "2px",
                backgroundColor: "#ffffff",
                border: "1px solid #d1d5db",
                boxShadow: 1,
                opacity: 0,
                transition: "opacity 0.2s",
              }}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ) : (
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#f0fdf4",
              borderColor: "#16a34a",
              color: "#16a34a",
              borderRadius: "9999px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#dcfce7",
                borderColor: "#15803d",
                color: "#15803d",
              },
            }}
            onClick={() => onAssign(row)}
          >
            Assign To
          </Button>
        )
      default:
        return <Typography variant="body2">{value || "-"}</Typography>
    }
  }

  return (
    <Paper elevation={2} sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align={column.align || "center"}
                  sx={{
                  backgroundColor: "oklch(85% 0.15 163.223)",
                    color: "white",
                    fontWeight: 600,
                    minWidth: column.minWidth || 100,
                    cursor: "pointer",
                        py: 0.5 // ✅ Add vertical padding (1.5 = ~12px)

                  }}
                  onClick={() => handleSort(column.field)}
                >
                  <TableSortLabel
                    active={orderBy === column.field}
                    direction={orderBy === column.field ? orderDirection : "asc"}
sx={{ '& .MuiTableSortLabel-root': { color: 'white !important', fontWeight: 600 }, color: 'white', '& .MuiTableSortLabel-icon': { color: '#6b7280 !important', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', padding: '4px', boxShadow: '0 0 0 1px #6b7280 inset' }, '&.Mui-active .MuiTableSortLabel-icon': { color: '#6b7280 !important' } }}
                  >
                    {column.headerName}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="body1" color="text.secondary" py={4}>
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((row, index) => (
                <TableRow
                  key={row.id || index}
                  hover
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#f9fafb",
                    },
                    "&:hover": {
                      backgroundColor: "#f0fdf4",
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.field} align={column.align || "left"}>
                      {renderCellContent(column, row, index)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: 1,
          borderColor: "divider",
          backgroundColor: "#f9fafb",
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            color: "#374151",
            fontWeight: 500,
          },
          "& .MuiTablePagination-select": {
            color: "#16a34a",
            fontWeight: 600,
          },
          "& .MuiIconButton-root": {
            color: "#4ade80",
            "&:hover": {
              backgroundColor: "#f0fdf4",
            },
          },
        }}
      />
    </Paper>
  )
}

export default DataTable
