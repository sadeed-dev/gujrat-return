import { Chip, Button, IconButton, Tooltip, Box } from "@mui/material"
import { Visibility as VisibilityIcon } from "@mui/icons-material"
import DeleteIcon from "@mui/icons-material/Delete"
import { EditIcon, SendIcon } from "lucide-react"
import { useGetAllRooms } from "../../../../hook/use-lfachat.hook"

// ✅ Reusable column generator for LFA Table
export const getLfaTableColumns = ({
  isAdmin,
  handleView,
  handleEdit,
  handleDelete,
  handleSendOffer,
  handleDisclose,
  allChatRooms,
}) => {

  return [
    { field: "serial", headerName: "S.No.", type: "serial", minWidth: 40, align: "center" },

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

    { field: "name", headerName: "Full Name", minWidth: 150, align: "center" },

    {
      field: "interestedWork",
      headerName: "Interested Work",
      minWidth: 180,
      align: "center",
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

    { field: "mobileNumber", headerName: "Mo. Number", minWidth: 150, align: "center" },
    { field: "aadhaarFile", headerName: "Aadhaar", type: "file", minWidth: 120, align: "center" },
    { field: "panFile", headerName: "PAN", type: "file", minWidth: 120, align: "center" },
    { field: "bankAccountNumber", headerName: "Account No", minWidth: 130, align: "center" },
    { field: "ifscCode", headerName: "IFSC Code", minWidth: 130, align: "center" },
    { field: "state", headerName: "State", minWidth: 120, align: "center" },
    { field: "district", headerName: "District", minWidth: 120, align: "center" },
    { field: "tehsil", headerName: "Tehsil", minWidth: 120, align: "center" },

    {
      field: "status",
      headerName: "Status",
      type: "status",
      minWidth: 100,
      align: "center",
      renderCell: (params) => {
        const status = params.row?.status
        const statusColors = {
          pending: { backgroundColor: "#facc15", color: "#222222" },
          approved: { backgroundColor: "#22c55e", color: "#fff" },
          rejected: { backgroundColor: "#ef4444", color: "#fff" },
        }
        const { backgroundColor, color } = statusColors[status] || {
          backgroundColor: "#e5e7eb",
          color: "#1f2937",
        }
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
        )
      },
    },

    ...(isAdmin
      ? [
          {
            field: "askOffer",
            headerName: "Ask Offer",
            minWidth: 180,
            align: "center",
            renderCell: (params) => {
              const chatRoom = allChatRooms?.find((room) => room.lfaId === params.row._id)
              if (chatRoom?.isDeleted) {
                return (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleDisclose(params.row)}
                    sx={{
                      backgroundColor: "#f9dedc",
                      color: "#b3261e",
                      textTransform: "none",
                    }}
                  >
                    Disclosed Offer
                  </Button>
                )
              }
                              {console.log(allChatRooms)}

              return (
                // <Button
                //   variant="contained"
                //   size="small"
                //   startIcon={<SendIcon />}
                //   onClick={() => handleSendOffer(params.row)}
                //   disabled={allChatRooms?.some((room) => room.lfaId === params.row._id && !room.isDeleted)}
                //   sx={{
                //     backgroundColor: "#3b82f6",
                //     "&:hover": { backgroundColor: "#2563eb" },
                //     textTransform: "none",
                //   }}
                // >
                //   Send Offer
                // </Button>
                 <Button
                variant="contained"
                size="small"
                startIcon={<SendIcon />}
                onClick={() => handleSendOffer(params.row)}
                disabled={allChatRooms?.some(room => room.lfaId === params.row._id && !room.isDeleted)}
                sx={{
                  backgroundColor: "#3b82f6",
                  "&:hover": {
                    backgroundColor: "#2563eb",
                  },
                  textTransform: "none",
                }}
              >
                Send Offer
              </Button>
              )
            },
          },
        ]
      : []),

      

    ...(isAdmin
      ? [
          {
            field: "assignedUserName",
            headerName: "Assigned To",
            minWidth: 180,
            type: "assign",
            align: "center",
          },
        ]
      : []),

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 140,
      align: "center",
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" gap={1}>
          <Tooltip title="View" arrow>
            <IconButton
              size="small"
              onClick={() => handleView(row)}
              sx={{
                color: "#10b981",
                backgroundColor: "#d1fae5",
                "&:hover": { backgroundColor: "#bbf7d0", transform: "scale(1.1)" },
              }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit" arrow>
            <IconButton
              size="small"
              onClick={() => handleEdit(row)}
              sx={{
                color: "#3b82f6",
                "&:hover": { backgroundColor: "#dbeafe", transform: "scale(1.1)" },
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
                "&:hover": { backgroundColor: "#fee2e2", transform: "scale(1.1)" },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]
}
