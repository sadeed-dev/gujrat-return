// src/pages/admin/task/TaskColumns.js

import React from 'react';
import { Chip, Box, IconButton, Tooltip } from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import StatusActions from '../StatusActions';
import TaskActionButton from '../TaskActionButton';
import { useAuth } from '../../../../context/auth/AuthContext';
import { useUpdateLfaStatus } from '../../../../hook/use-Lfa.hook';
import { formatDateTime } from '../../../../utils/dateUtils';

const TaskColumns = (handleView) => {
  const { user } = useAuth();

  const columns = [
    { field: "serial", headerName: "S.No.", type: "serial", minWidth: 80, align: "center" },

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

{
  field: "assignedTo",
  headerName: "Assigned To",
  minWidth: 180,
  align: "center",
  renderCell: (params) => (
    <span>
      {params?.row?.assignment?.assignedTo?.name || "-"}
    </span>
  ),
},
{
  field: "assignedBy",
  headerName: "Assigned By",
  minWidth: 180,
  align: "center",
  renderCell: (params) => (
    <span>
      {params?.row?.assignment?.assignedBy?.name || "-"}
    </span>
  ),
},

{
  field: "assignedDate",
  headerName: "Assigned Date",
  minWidth: 180,
  align: "center",
  renderCell: (params) => (
    <span>
{
  params?.row?.assignment?.assignedAt
    ? new Date(params.row.assignment.assignedAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : "-"
}

    </span>
  ),
},
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
    backgroundColor: '#0d9488',
    color: '#fff',
    px: 1,
    py: 0.5,
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: 500,
    display: 'inline-block'
  }}
            size="small"
          />
        ),
    },

      {
      field: "remark",
      headerName: "Remark",
      minWidth: 150,
      align: "center",
      renderCell: (params) =>
        params.row?.remark && (
          <Chip
            label={params.row.remark}
            s sx={{
    backgroundColor: '#e5e7eb',
    color: '#374151',
    px: 1,
    py: 0.5,
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: 500,
    display: 'inline-block'
  }}
            size="small"
          />
        ),
    },
    { field: "name", headerName: "Name", minWidth: 150, align: "center" },
    { field: "mobileNumber", headerName: "Number", minWidth: 150, align: "center" },
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
          pending: { backgroundColor: "#facc15", color: "#222222" },
          approved: { backgroundColor: "#22c55e", color: "#fff" },
          rejected: { backgroundColor: "#ef4444", color: "#fff" },
        };

        const { backgroundColor, color } = statusColors[status] || {
          backgroundColor: "#e5e7eb",
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

    ...(user?.role === "ADMIN"
      ? [
          {
            field: "actions",
            headerName: "Actions",
            minWidth: 120,
            align: "center",
            renderCell: ({ row }) => (
              <StatusActions
                row={row}
                useUpdateHook={useUpdateLfaStatus}
                dialogText={{
                  approveTitle: "Approve Task",
                  approveContent: "Are you sure you want to approve this task?",
                  rejectTitle: "Reject Task",
                  rejectContent: "Are you sure you want to reject this task",
                }}
              />
            ),
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
              sx={{
                color: "#10b981",
                backgroundColor: "#d1fae5",
                "&:hover": {
                  backgroundColor: "#d1fae5",
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
      headerName: "Submitted Task",
      minWidth: 160,
      align: "center",
      renderCell: ({ row }) => <TaskActionButton row={row} />,
    },
  ];

  return columns;
};

export default TaskColumns;
