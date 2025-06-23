import { Chip, Box, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import { EditIcon } from "lucide-react";
import StatusActions from "../../admin/task/StatusActions";

export  function getUserColumns({ user, handleEdit, handleDelete, useUpdateUserStatus }) {
  return [
    { field: "serial", headerName: "S.No.", type: "serial", minWidth: 40, align: "center" },
    { field: "name", headerName: "Full Name", minWidth: 150, align: "center" },
    { field: "email", headerName: "Email", minWidth: 180, align: "center" },
    {
      field: "role", headerName: "Role", minWidth: 100, align: "center",
      renderCell: (params) =>
        params.row?.role && (
          <Chip
            label={params.row?.role}
            size="small"
            sx={{
              backgroundColor:
                params.row?.role === "ADMIN"
                  ? "oklch(75% 0.25 30)"
                  : "oklch(75% 0.145 163.225)",
              color: "#fff",
              fontWeight: "bold",
            }}
          />
        ),
    },
    { field: "state", headerName: "State", minWidth: 120, align: "center" },
    { field: "district", headerName: "District", minWidth: 120, align: "center" },
    { field: "tehsil", headerName: "Tehsil", minWidth: 120, align: "center" },
    ...(user?.role === "ADMIN"
      ? [
        {
          field: "isApproved",
          headerName: "Approved",
          minWidth: 120,
          align: "center",
          renderCell: ({ row }) => (
            <StatusActions
              row={{
                ...row,
                status: row.status || 'pending',
              }}
              useUpdateHook={useUpdateUserStatus}
              dialogText={{
                approveTitle: "Approve User",
                approveContent: "Are you sure to approve this user?",
                rejectTitle: "Reject User",
                rejectContent: "Are you sure to reject this user?",
              }}
            />
          )
        }
      ]
      : []),
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 140,
      align: "center",
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" gap={1}>
          <Tooltip title="Edit" arrow>
            <IconButton
              size="small"
              onClick={() => handleEdit(row)}
              sx={{
                color: "#3b82f6",
                "&:hover": {
                  backgroundColor: "#dbeafe",
                  transform: "scale(1.1)",
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton
              size="small"
              onClick={() => handleDelete(row)}
              sx={{
                color: "#ef4444",
                "&:hover": {
                  backgroundColor: "#fee2e2",
                  transform: "scale(1.1)",
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    }
  ];
}