import React, { useState } from 'react';
import { Box, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ConfirmDialog from '../lfas/dialog-box/ConfirmDialog';

const StatusActions = ({ row, useUpdateHook, dialogText = {} }) => {
  const { mutate: updateStatus } = useUpdateHook();
  const [dialog, setDialog] = useState({ open: false, type: null });

  const handleConfirm = () => {
    updateStatus({ id: row._id, status: dialog.type });
    setDialog({ open: false, type: null });
  };

  const status = row.status; // 'approved', 'rejected', or 'pending'

  return (
    <>
      <Box display="flex" justifyContent="center" gap={1}>
        {status === 'approved' && (
          <Tooltip title="Approved">
            <CheckCircleIcon sx={{ color: '#16a34a' }} />
          </Tooltip>
        )}

        {status === 'rejected' && (
          <Tooltip title="Rejected">
            <CancelIcon sx={{ color: '#ef4444' }} />
          </Tooltip>
        )}

        {status === 'pending' && (
          <>
            <Tooltip title="Approve">
              <CheckCircleIcon
                sx={{ color: '#16a34a', cursor: 'pointer' }}
                onClick={() => setDialog({ open: true, type: 'approved' })}
              />
            </Tooltip>
            <Tooltip title="Reject">
              <CancelIcon
                sx={{ color: '#ef4444', cursor: 'pointer' }}
                onClick={() => setDialog({ open: true, type: 'rejected' })}
              />
            </Tooltip>
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
  );
};

export default StatusActions;
