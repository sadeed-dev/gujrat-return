import { useState } from "react";
import { Button, Dialog, DialogContent, Tooltip } from "@mui/material";
import { useAuth } from "../../../context/auth/AuthContext";
import { useGetAllLfaTasks, useGetReviewLfaTask } from "../../../hook/use-task.hook";
import TaskUploadForm from "./TaskUploadForm";

const TaskActionButton = ({ row }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [open, setOpen] = useState(false);
  const [enabledFetch, setEnabledFetch] = useState(false);

  const { data: allTasks } = useGetAllLfaTasks();
  const hasTask = allTasks?.data?.some(task => task.lfaId === row.lfaId);

  const { data: taskData, isLoading, isError } = useGetReviewLfaTask(row?.lfaId, {
    enabled: !!row?.lfaId && enabledFetch,
  });

  const handleClick = () => {
    setEnabledFetch(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEnabledFetch(false);
  };

  const label = isAdmin ? "View Task" : "Upload Task";
  const disabled = isAdmin && !hasTask;

  const tooltipTitle = isAdmin
    ? hasTask
      ? "View submitted task"
      : "No task found"
    : "Upload your task for this LFA";

  return (
    <>
      <Tooltip title={tooltipTitle} arrow>
        <span> {/* required to wrap Button when it can be disabled */}
          <Button
            variant="outlined"
            size="small"
            onClick={handleClick}
            disabled={disabled}
            sx={{
              backgroundColor: "#f0f9ff",            // modern light blue
              color: "#0369a1",                      // strong readable blue
              borderColor: "#38bdf8",                // vibrant cyan border
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "9999px",
              fontSize: "0.8rem",
              paddingX: 2,
              "&:hover": {
                backgroundColor: "#e0f2fe",
                borderColor: "#0284c7",
                color: "#075985",
              },
            }}
          >
            {label}
          </Button>
        </span>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          {isLoading ? (
            <p>Loading task...</p>
          ) : isError ? (
            <p>Error loading task.</p>
          ) : (
            <TaskUploadForm
              row={row}
              taskData={taskData}
              onClose={handleClose}
              isViewMode={isAdmin}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskActionButton;
