import { useState, useEffect } from "react";
import { useAuth } from '../../../context/auth/AuthContext';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Dialog, DialogContent, Menu, MenuItem } from "@mui/material";
import TaskUploadForm from "./TaskUploadForm";
import { useGetAllLfaTasks, useGetReviewLfaTask } from '../../../hook/use-task.hook'; // adjust path as needed

const MoreMenu = ({ row }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [enabledFetch, setEnabledFetch] = useState(false);
  const { user } = useAuth();

  // Only fetch when enabledFetch is true
  const { data: taskData, isLoading, isError } = useGetReviewLfaTask(row?.lfaId, {
    enabled: !!row?.lfaId && enabledFetch,
  });


  const {data} = useGetAllLfaTasks()

console.log(data)
const task =  data?.data?.length > 0 && data?.data?.find(task => task.lfaId === row.lfaId);

const shouldDisableViewTask = !task; // disable if no matching 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleUpload = () => {
    setEnabledFetch(true);
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEnabledFetch(false); // Disable for next time until re-enabled
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{ elevation: 3, sx: { minWidth: 150 } }}
      >
<MenuItem
  onClick={handleUpload}
  disabled={user?.role === "ADMIN" && shouldDisableViewTask}
>
  {user?.role === "ADMIN" ? 'View Task' : 'Upload Task'}
</MenuItem>

      </Menu>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogContent>
          {isLoading ? (
            <p>Loading task...</p>
          ) : isError ? (
            <p>Error fetching task.</p>
          ) : (
            <TaskUploadForm
              row={row}
              taskData={taskData}
              onClose={handleCloseDialog}
              isViewMode={user?.role === "USER" || "ADMIN"}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MoreMenu;

// // utils/api.js
// import axios from 'axios';


// import { useState } from 'react';
// import { IconButton, Menu, MenuItem, Dialog, DialogContent } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { useAuth } from '../../../context/auth/AuthContext';
// import TaskUploadForm from './TaskUploadForm';

// import { useQuery } from '@tanstack/react-query';
// // Add interceptor to inject the token into headers
// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });
// API.interceptors.request.use((config) => {
//   const userStr = localStorage.getItem('user');
//   const user = userStr ? JSON.parse(userStr) : null;
// debugger
//   if (user?.token) {
//     config.headers.Authorization = `Bearer ${user.token}`;
//   }

//   return config;
// });


// // hooks/useTaskByLfaId.js




// export const useTaskByLfaId = (lfaId, enabled) => {
//   return useQuery({
//     queryKey: ['task', lfaId],
//     queryFn: () => axios.get(`http://localhost:5000/api/task/view/${lfaId}` ).then(res => res.data),
//     enabled: !!lfaId && enabled, // only runs when both are true
//     refetchOnWindowFocus: false, // avoid refetch on tab focus
//     retry: false, // optional: disable retry for development
//   });
// };

// const MoreMenu = ({ row }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [enabledFetch, setEnabledFetch] = useState(false);

//   const { user } = useAuth();

//   const { data: taskData, isLoading, isError } = useTaskByLfaId(row?.lfaId, enabledFetch);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   const handleUpload = () => {
//     setEnabledFetch(true);
//     setOpenDialog(true);
//     handleCloseMenu();
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setEnabledFetch(false);
//   };

//   return (
//     <>
//       <IconButton onClick={handleClick} size="small">
//         <MoreVertIcon fontSize="small" />
//       </IconButton>

//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleCloseMenu}
//         PaperProps={{ elevation: 3, sx: { minWidth: 150 } }}
//       >
//         <MenuItem onClick={handleUpload}>
//           {user.role === 'ADMIN' ? 'View Task' : 'Upload Task'}
//         </MenuItem>
//       </Menu>

//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//         <DialogContent>
//           {isLoading ? (
//             <p>Loading task...</p>
//           ) : isError ? (
//             <p>Error loading task data.</p>
//           ) : (
//             <TaskUploadForm
//               row={row}
//               taskData={taskData}
//               onClose={handleCloseDialog}
//               isViewMode={user.role === 'ADMIN'}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default MoreMenu;
