// components/partials/LfaFormDialog.jsx
import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material"
import LfaApplicationForm from "../../../form/LfaApplicationForm"

const LfaFormDialog = ({ formDialog, setFormDialog }) => {
  const handleClose = () => {
    setFormDialog({ open: false, row: null })
  }

  return (
    <Dialog
      open={formDialog.open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ color: "#16a34a", fontWeight: 600 }}>
        Edit LFA
      </DialogTitle>
      <DialogContent>
        <LfaApplicationForm
          defaultValues={formDialog.row}
          isEditForm={true}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  )
}

export default LfaFormDialog
