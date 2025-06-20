import React, { useState } from 'react'
import { Box } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import ConfirmDialog from '../lfas/dialog-box/ConfirmDialog'

const   StatusActions = ({ row, useUpdateHook, dialogText = {} }) => {
  const { mutate: updateStatus } = useUpdateHook()
  const [dialog, setDialog] = useState({ open: false, type: null })
  console.log(updateStatus)

  const handleConfirm = () => {
    updateStatus({ id: row._id, status: dialog.type }) // assuming API expects isApproved: true/false
    setDialog({ open: false, type: null })
  }

  const status = row.status // 'approved', 'rejected', or 'pending'
  return (
    <>
      <Box display="flex" justifyContent="center" gap={1}>
        {status === 'approved' && (
          <CheckCircleIcon sx={{ color: '#16a34a' }} titleAccess="Approved" />
        )}

        {status === 'rejected' && (
          <CancelIcon sx={{ color: '#ef4444' }} titleAccess="Rejected" />
        )}

        {status === 'pending' && (
          <>
            <CheckCircleIcon
              sx={{ color: '#16a34a', cursor: 'pointer' }}
              titleAccess="Approve"
              onClick={() => setDialog({ open: true, type: 'approved' })}
            />
            <CancelIcon
              sx={{ color: '#ef4444', cursor: 'pointer' }}
              titleAccess="Reject"
              onClick={() => setDialog({ open: true, type: 'rejected' })}
            />
          </>
        )}
      </Box>

      <ConfirmDialog
        open={dialog.open}
        title={
          dialog.type === 'approved'
            ? dialogText.approveTitle || 'Approve User'
            : dialogText.rejectTitle || 'Reject User'
        }
        content={
          dialog.type === 'approved'
            ? dialogText.approveContent || 'Are you sure you want to approve this user?'
            : dialogText.rejectContent || 'Are you sure you want to reject this user?'
        }
        onCancel={() => setDialog({ open: false, type: null })}
        onConfirm={handleConfirm}
        confirmLabel={dialogText.confirmLabel || 'Confirm'}
        cancelLabel={dialogText.cancelLabel || 'Cancel'}
      />
    </>
  )
}

export default StatusActions
