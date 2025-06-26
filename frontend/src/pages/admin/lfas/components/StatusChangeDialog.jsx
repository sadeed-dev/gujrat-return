// components/partials/StatusChangeDialog.jsx
import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material"

const StatusChangeDialog = ({ dialog, setDialog, onConfirm }) => {
  const handleClose = () => {
    setDialog({ open: false, row: null, newStatus: "", oldStatus: "" })
  }

  const { row, newStatus, oldStatus } = dialog

  return (
    <Dialog
      open={dialog.open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          border: "2px solid #4ade80",
        },
      }}
    >
      <DialogTitle sx={{ color: "#16a34a", fontWeight: 600 }}>
        Confirm Status Change
      </DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to change the status of{" "}
          <strong style={{ color: "#16a34a" }}>{row?.fullName}</strong> from{" "}
          <strong style={{ color: "#fb923c" }}>{oldStatus}</strong> to{" "}
          <strong style={{ color: "#16a34a" }}>{newStatus}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ color: "#6b7280" }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm()
            handleClose()
          }}
          variant="contained"
          sx={{
            backgroundColor: "#16a34a",
            "&:hover": {
              backgroundColor: "#15803d",
            },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StatusChangeDialog
