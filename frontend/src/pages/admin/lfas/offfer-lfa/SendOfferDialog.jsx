import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography, Avatar,
  ListItemText, Select, MenuItem, Checkbox,
  InputLabel, FormControl, Chip, Grid
} from "@mui/material";
import { useAuth } from '../../../../context/auth/AuthContext'

const SendOfferDialog = ({ open, onClose, allUsers, onSubmit, selectedLFA }) => {

  const { register, handleSubmit, reset, control, setValue, watch, formState } = useForm();
  const { user: currentUser } = useAuth()
  const { isSubmitting } = formState;

  const fetchSameRegionUsers = allUsers?.data?.filter(user =>
    user?.tehsil?.toLowerCase() === selectedLFA?.tehsil?.toLowerCase() &&
    user?.district?.toLowerCase() === selectedLFA?.district?.toLowerCase() &&
    user?.role !== "ADMIN"
  );

  //  const  a = allUsers.data.filter((user) =>  )
  useEffect(() => {
    if (open) {
      const regionUserIds = fetchSameRegionUsers?.map(user => user._id) || [];
      reset({ participants: regionUserIds, message: "" });
    }
    // eslint-disable-next-line
  }, [open]);


  const participants = watch("participants") || [];

  const handleFormSubmit = async (data) => {
    const selectedUsers = (allUsers.data || []).filter(u => data.participants.includes(u._id));
    await onSubmit({
      ...data,
      participants: selectedUsers,
      lfa: selectedLFA
    });
    reset();

  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "#16a34a", fontWeight: 600 }}>
        Send Offer to User
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth sx={{ mb: 1.5, mt: 2 }} variant="outlined">
            <InputLabel id="participant-select-label">Participants</InputLabel>
            <Controller
              name="participants"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="participant-select-label"
                  multiple
                  value={field.value || []}
                  onChange={field.onChange}
                  label="Participants"
                  renderValue={() =>
                    `${field.value?.length || 0} user(s) selected`
                  }
                >

                  {(allUsers?.data || [])
                    .filter(user => user._id != currentUser.id)
                    .map((user) => (

                      <MenuItem key={user._id} value={user._id}>
                        <Checkbox checked={field.value?.includes(user._id)} />
                        <Avatar sx={{ width: 24, height: 24, mr: 1 }}>{user.name[0]}</Avatar>
                        <ListItemText
                          primary={user.name}
                          secondary={`${user.district}, ${user.tehsil}`}
                        />
                      </MenuItem>
                    ))}

                </Select>
              )}
            />
          </FormControl>

          {/* Chips display below select */}
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {(allUsers?.data || [])
              ?.filter(user => participants.includes(user._id))
              ?.map(user => (
                <Grid item key={user._id}>
                  <Chip label={user.name} />
                </Grid>
              ))}
          </Grid>

          <TextField
            fullWidth
            label="Message (Optional)"
            multiline
            rows={3}
            {...register("message")}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#4ade80" },
                "&.Mui-focused fieldset": { borderColor: "#16a34a" },
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#6b7280" }}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit(handleFormSubmit)}
          disabled={isSubmitting}
          sx={{
            backgroundColor: "#3b82f6",
            "&:hover": { backgroundColor: "#2563eb" },
          }}
        >
          {isSubmitting ? "Sending..." : "Send Offer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendOfferDialog;
