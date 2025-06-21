


// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, Box, Divider, Typography } from "@mui/material";
// import CheckIcon from "@mui/icons-material/Check";

// const AssignDialog = ({
//   open,
//   usersList,
//   selectedUser,
//   onChange,
//   onClose,
//   onConfirm,
//   lfaRegion = {}, // { state, district, tehsil }
//   title = "Assign LFA To User",
//   confirmLabel = "Confirm",
//   cancelLabel = "Cancel",
//   themeColor = "#16a34a"
// }) => {
//   // Prepare users array
//   const users = usersList?.data || [];

//   // Filter and sort users: matching region first
//   const matchingUsers = [];
//   console.log('matchingUsers',matchingUsers)
//   const otherUsers = [];
//   users.forEach(user => {
//     const match =
//       user.state === lfaRegion.state &&
//       user.district === lfaRegion.district &&
//       user.tehsil === lfaRegion.tehsil;
//     if (match) matchingUsers.push(user);
//     else otherUsers.push(user);
//   });

//   // Helper to format address
//   const formatAddress = (user) =>
//     [user.state, user.district, user.tehsil].filter(Boolean).join(", ");

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
//       <DialogTitle sx={{ color: themeColor, fontWeight: 600 }}>{title}</DialogTitle>
//       <DialogContent>
//         <FormControl fullWidth sx={{ mt: 2 }}>
//           <InputLabel id="assign-user-label" sx={{ color: themeColor }}>Select User</InputLabel>


// <Select
//   labelId="assign-user-label"
//   value={selectedUser || ""}
//   onChange={onChange}
//   label="Select User"
//   sx={{
//     "& .MuiOutlinedInput-notchedOutline": { borderColor: "#4ade80" },
//     "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: themeColor },
//   }}
//   MenuProps={{
//     PaperProps: {
//       style: { maxHeight: 350 }
//     }
//   }}
// >
//   {/* Users in this region */}
//   {matchingUsers.length > 0 && [
//     <Typography
//       key="matching-label"
//       sx={{ px: 2, pt: 1, color: "#16a34a", fontWeight: 600, fontSize: 13 }}
//     >
//       Users in this region
//     </Typography>,
//     ...matchingUsers.map(user => (
//       <MenuItem key={user._id} value={user._id} selected={selectedUser === user._id}>
//         <Box display="flex" alignItems="center" width="100%">
//           {selectedUser === user._id && (
//             <CheckIcon sx={{ color: "#16a34a", mr: 1, fontSize: 20 }} />
//           )}
//           <span>
//             {user.name}{" "}
//             <span style={{ color: "#6b7280", fontSize: 13 }}>
//               ({formatAddress(user)})
//             </span>
//           </span>
//         </Box>
//       </MenuItem>
//     )),
//     otherUsers.length > 0 && <Divider key="divider" sx={{ my: 1 }} />
//   ].filter(Boolean)}

//   {/* Other users */}
//   {otherUsers.length > 0 && [
//     matchingUsers.length === 0 && (
//       <Typography
//         key="other-label"
//         sx={{ px: 2, pt: 1, color: "#64748b", fontWeight: 600, fontSize: 13 }}
//       >
//         Other Users
//       </Typography>
//     ),
//     ...otherUsers.map(user => (
//       <MenuItem key={user._id} value={user._id} selected={selectedUser === user._id}>
//         <Box display="flex" alignItems="center" width="100%">
//           {selectedUser === user._id && (
//             <CheckIcon sx={{ color: "#16a34a", mr: 1, fontSize: 20 }} />
//           )}
//           <span>
//             {user.name}{" "}
//             <span style={{ color: "#6b7280", fontSize: 13 }}>
//               ({formatAddress(user)})
//             </span>
//           </span>
//         </Box>
//       </MenuItem>
//     ))
//   ].filter(Boolean)}
// </Select>
//         </FormControl>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} sx={{ color: "#6b7280" }}>
//           {cancelLabel}
//         </Button>
//         <Button
//           onClick={onConfirm}
//           variant="contained"
//           disabled={!selectedUser}
//           sx={{
//             backgroundColor: themeColor,
//             "&:hover": { backgroundColor: "#15803d" },
//           }}
//         >
//           {confirmLabel}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AssignDialog;




















import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Divider,
  Typography,
  Checkbox,
} from "@mui/material";

const AssignDialog = ({
  open,
  usersList,
  selectedUser,
  onChange,
  onClose,
  onConfirm,
  lfaRegion = {},
  title = "Assign LFA To User",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  themeColor = "#16a34a"
}) => {
const users = usersList?.data.filter((user) => user.role !== "ADMIN") || [];

  const matchingUsers = [];
  const otherUsers = [];

  users.forEach(user => {
    const match =
      user.state === lfaRegion.state &&
      user.district === lfaRegion.district &&
      user.tehsil === lfaRegion.tehsil;
    if (match) matchingUsers.push(user);
    else otherUsers.push(user);
  });

  const formatAddress = (user) =>
    [user.state, user.district, user.tehsil].filter(Boolean).join(", ");
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: themeColor, fontWeight: 600 }}>{title}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="assign-user-label" sx={{ color: themeColor }}>Select User</InputLabel>

          <Select
            labelId="assign-user-label"
            value={selectedUser || ""}
            onChange={onChange}
            label="Select User"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#4ade80" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: themeColor },
            }}
            MenuProps={{
              PaperProps: {
                style: { maxHeight: 350 }
              }
            }}
          >
            {/* Users in this region */}
            {matchingUsers.length > 0 && [
              <Typography
                key="matching-label"
                sx={{ px: 2, pt: 1, color: "#16a34a", fontWeight: 600, fontSize: 13 }}
              >
                Users in same region
              </Typography>,
              ...matchingUsers.map(user => (
                <MenuItem key={user._id} value={user._id}>
                  <Box display="flex" alignItems="center" width="100%">
                    <Checkbox
                      checked={selectedUser === user._id}
                      sx={{ p: 0, pr: 1 }}
                    />
                    <span>
                      {user.name}{" "}
                      <span style={{ color: "#6b7280", fontSize: 13 }}>
                        ({formatAddress(user)})
                      </span>
                    </span>
                  </Box>
                </MenuItem>
              )),
              otherUsers.length > 0 && <Divider key="divider" sx={{ my: 1 }} />
            ].filter(Boolean)}

            {/* Other users */}
            {otherUsers.length > 0 && [
                 <Typography
                key="matching-label"
                sx={{ px: 2, pt: 1, color: "#64748b", fontWeight: 600, fontSize: 13 }}
              >
                Users in diffrent region
              </Typography>,
              matchingUsers.length === 0 && (
                <Typography
                  key="other-label"
                  sx={{ px: 2, pt: 1, color: "#64748b", fontWeight: 600, fontSize: 13 }}
                >
                </Typography>
              ),
              ...otherUsers.map(user => (
                <MenuItem key={user._id} value={user._id}>
                  <Box display="flex" alignItems="center" width="100%">
                    <Checkbox
                      checked={selectedUser === user._id}
                      sx={{ p: 0, pr: 1 }}
                    />
                    <span>
                      {user.name}{" "}
                      <span style={{ color: "#6b7280", fontSize: 13 }}>
                        ({formatAddress(user)})
                      </span>
                    </span>
                  </Box>
                </MenuItem>
              ))
            ].filter(Boolean)}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#6b7280" }}>
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={!selectedUser}
          sx={{
            backgroundColor: themeColor,
            "&:hover": { backgroundColor: "#15803d" },
          }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignDialog;
