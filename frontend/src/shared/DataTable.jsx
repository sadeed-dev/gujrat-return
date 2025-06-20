"use client"
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
  FormControl,
  Select,
  MenuItem,
  Button
} from "@mui/material"
import { Edit as EditIcon, Delete as DeleteIcon, AttachFile as FileIcon } from "@mui/icons-material"
import React from 'react'
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
  renderActions, // ✅ Accept this prop
  editDeleteBtn,
  getRowProps, // <-- Add this line


}) => {
  const handleChangePage = (event, newPage) => {
    onPageChange(newPage)
  }

  const { user } = useAuth()

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(Number.parseInt(event.target.value, 10))
  }

  const handleStatusChange = (row, newStatus) => {
    if (newStatus !== row.status) {
      onStatusChange(row, newStatus)
    }
  }

  const renderCellContent = (column, row, rowIndex) => {
    const value = row[column.field]
    // ✅ If custom renderCell function exists, use it
    if (column.renderCell) {
      return column.renderCell({ row, value, rowIndex });
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
  );


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
        return row.assignedUserName ? (
          <Chip
            label={row.assignedUserName}
            sx={{
              backgroundColor: "#f0fdf4",
              color: "#16a34a",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          />
        ) : (
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#16a34a",
              color: "white",
              fontWeight: 600,
              borderRadius: "9999px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#15803d" },
            }}
            onClick={() => onAssign(row)}
          >
            Assign To
          </Button>
        );
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
                    backgroundColor: "oklch(85% 0.15 163.223)", // lighter variant
                    color: "white",
                    fontWeight: 600,
                    minWidth: column.minWidth || 100,
                  }}

                >
                  {column.headerName}
                </TableCell>
              ))}
              


            </TableRow>
          </TableHead>
<TableBody>
  {data?.length === 0 ? (
    <TableRow>
      <TableCell colSpan={columns.length} align="center">
        <Typography variant="body1" color="text.secondary" py={4}>
          No data available
        </Typography>
      </TableCell>
    </TableRow>
  ) : (
    data?.map((row, index) => (
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
