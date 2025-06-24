"use client"

import React, { useEffect, useState } from "react"
import { useForm, Controller, useWatch } from "react-hook-form"
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Avatar,
  InputAdornment,
  IconButton,
  InputLabel,
  Paper,
  FormControl,
  Select,
} from "@mui/material"
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Visibility,
  VisibilityOff,
  Person,
  LocationOn,
  Security,
  Upload,
} from "@mui/icons-material"
import AdminNavbar from "../components/AdminNavbar"
import { useChangePassword, useGetUser, useUpdateUser } from "../hook/use-user.hook"
import { useAuth } from "../context/auth/AuthContext"
import { states } from "../data/states-data"
import { UploadFile } from "@mui/icons-material";

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false)


  const { user } = useAuth() // 
  const { data, isLoading, error } = useGetUser(user?.id)

  const userData = data?.data || null // Ensure userData is not undefined

  // Top of component
  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    register,
    watch: watchProfile,
    formState: { errors: profileErrors },
    reset: resetProfile,
    setValue,
    watch,

  } = useForm();

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isDirty }, watch: watchPassword,
  } = useForm();


  const selectedState = watch("state");
  const selectedDistrict = watch("district");

  const districts = states && states?.find((s) => s.name === selectedState)?.districts || [];
  const tehsils = districts.find((d) => d.name === selectedDistrict)?.tehsils || [];
  const { mutateAsync: updateUser, isLoading: isUpdating } = useUpdateUser();

  const { mutateAsync: changePassword } = useChangePassword();

  const onSubmitPassword = (data) => {
    changePassword({ data })
  }

  useEffect(() => {
    if (userData) {
      resetProfile({
        name: userData.name || "",
        email: userData.email || "",
        state: userData.state || "",
        district: userData.district || "",
        tehsil: userData.tehsil || "",
      });
    }
  }, [userData, resetProfile]);

  const [aadhaarPreview, setAadhaarPreview] = React.useState(userData?.aadhaarFile || "");
  const [panPreview, setPanPreview] = React.useState(userData?.panFile || "");

  const aadhaarFile = watch("aadhaarFile")?.[0];
  const panFile = watch("panFile")?.[0];

  React.useEffect(() => {
    let aadhaarUrl, panUrl;

    // Initial fallback to default
    if (userData) {
      setAadhaarPreview(userData.aadhaarFile || "");
      setPanPreview(userData.panFile || "");
    }

    // Aadhaar file change
    if (aadhaarFile instanceof File) {
      aadhaarUrl = URL.createObjectURL(aadhaarFile);
      setAadhaarPreview(aadhaarUrl);
    }

    // PAN file change
    if (panFile instanceof File) {
      panUrl = URL.createObjectURL(panFile);
      setPanPreview(panUrl);
    }

    return () => {
      if (aadhaarUrl) URL.revokeObjectURL(aadhaarUrl);
      if (panUrl) URL.revokeObjectURL(panUrl);
    };
  }, [userData, aadhaarFile, panFile]);


  const handleCancel = () => {
    if (userData) {
      reset({
        ...userData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        isEditing: false,
      })
      setAadharPreview(userData.aadhaarFile || null)
      setPanPreview(userData.panFile || null)
    }
  }

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append files if selected
    if (data.aadhaarFile?.length) {
      formData.append("aadhaarFile", data.aadhaarFile[0]);
    }
    if (data.panFile?.length) {
      formData.append("panFile", data.panFile[0]);
    }

    // Append other fields
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("state", data.state);
    formData.append("district", data.district);
    formData.append("tehsil", data.tehsil);

    try {
      await updateUser({ id: user?.id, data: formData }); // Ensure this accepts FormData
      setEditOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };



  // if (isLoading) return <p className="p-4 text-gray-500">Loading user data...</p>
  //  if (error) return <p className="p-4 text-red-500">Failed to load user data.</p>

  return (
      <div sx={{ py: 4, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar sx={{ width: 80, height: 80, backgroundColor: "#23ba7d", fontSize: "2rem", fontWeight: 700 }}>
              {userData?.name?.[0] || "U"}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600, color: "#23ba7d", mb: 1 }}>
                Profile Settings
              </Typography>
              <Typography variant="body1" sx={{ color: "#6b7280" }}>
                Manage your account information and preferences
              </Typography>
            </Box>
          </Box>

        </Box>


        <form onSubmit={handleProfileSubmit(onSubmit)}>
          <Paper  sx={{ p: 2, bgcolor: "#f9f9f9", borderRadius: 2, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              User Information
            </Typography>

            {/* Row: Personal Info + Location Details */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {/* Personal Information */}
              <Grid item xs={6} md={6}>
                <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Person fontSize="small" sx={{ color: "#23ba7d" }} />
                    Personal Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Controller
                        name="name"
                        control={profileControl}
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Full Name"
                            fullWidth
                            error={!!profileErrors.name}
                            helperText={profileErrors.name?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="email"
                        control={profileControl}
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Email"
                            fullWidth
                            error={!!passwordControl.email}
                            helperText={passwordControl.email?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Location Details */}
              <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
                <Typography variant="subtitle1" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn fontSize="small" sx={{ color: "#23ba7d" }} /> Location Details
                </Typography>
                <Grid spacing={2} sx={{ display: 'flex', gap: 1 }}>
                  <Grid item>
                    <Controller
                      name="state"
                      control={profileControl}
                      defaultValue={userData?.state || ""}
                      rules={{ required: "State is required" }}
                      render={({ field }) => (
                        <FormControl sx={{ width: "9rem" }} error={!!profileControl.state}>
                          <InputLabel>State</InputLabel>
                          <Select
                            label="State"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setValue("district", "");
                              setValue("tehsil", "");
                            }}
                          >
                            {states?.map((state) => (
                              <MenuItem key={state.name} value={state.name}>
                                {state.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item>
                    <Controller
                      name="district"
                      control={profileControl}
                      defaultValue={userData?.district || ""}
                      rules={{ required: "District is required" }}
                      render={({ field }) => (
                        <FormControl sx={{ width: "9rem" }} error={!!profileErrors.district}>
                          <InputLabel>District</InputLabel>
                          <Select
                            label="District"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setValue("tehsil", "");
                            }}
                            disabled={!selectedState}
                          >
                            {districts.map((district) => (
                              <MenuItem key={district.name} value={district.name}>
                                {district.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item>
                    <Controller
                      name="tehsil"
                      control={profileControl}
                      defaultValue={userData?.tehsil || ""}
                      rules={{ required: "Tehsil is required" }}
                      render={({ field }) => (
                        <FormControl sx={{ width: "9rem" }} error={!!profileErrors.tehsil}>
                          <InputLabel>Tehsil</InputLabel>
                          <Select
                            label="Tehsil"
                            {...field}
                            disabled={!selectedDistrict}
                          >
                            {tehsils.map((tehsil) => (
                              <MenuItem key={tehsil} value={tehsil}>
                                {tehsil}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>

              </Paper>

            </Grid>

            {/* Document Upload Section - Half Width Centered */}
            <Grid container justifyContent="left" sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <UploadFile fontSize="small" sx={{ color: "#23ba7d" }} /> Document Upload
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <InputLabel>Aadhaar File</InputLabel>
                      <input
                        type="file"
                        accept="image/*"
                        {...register("aadhaarFile")}
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                      {aadhaarPreview && (
                        <a href={aadhaarPreview} target="_blank" rel="noopener noreferrer">
                          <img
                            src={aadhaarPreview}
                            alt="Aadhaar Preview"
                            style={{
                              width: "250px",
                              height: "150px",
                              objectFit: "contain",
                              marginTop: "0.5rem",
                              borderRadius: "0.5rem",
                              display: "block",
                            }}
                          />
                        </a>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InputLabel>PAN File</InputLabel>
                      <input
                        type="file"
                        accept="image/*"
                        {...register("panFile")}
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                      {panPreview && (
                        <a href={panPreview} target="_blank" rel="noopener noreferrer">
                          <img
                            src={panPreview}
                            alt="PAN Preview"
                            style={{
                              width: "250px",
                              height: "150px",
                              objectFit: "contain",
                              marginTop: "0.5rem",
                              borderRadius: "0.5rem",
                              display: "block",
                            }}
                          />
                        </a>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            {/* Save Button Bottom-Right */}
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#23ba7d",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#00a96d" },
                  "&:disabled": { backgroundColor: "#e5e7eb", color: "#9ca3af" },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Paper>
        </form>





        {/* Password Fields */}
        <Grid item xs={12}>
          <form onSubmit={handlePasswordSubmit(onSubmitPassword)}>
            <Paper
              variant="outlined"
              sx={{ p: 3, bgcolor: "#fdfdfd", borderRadius: 2 }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Security fontSize="small" sx={{ color: "#23ba7d" }} /> Change Password
              </Typography>

              {/* Password Fields */}
              <Grid container spacing={2} mb={2}>
                {(["currentPassword", "newPassword", "confirmPassword"]).map(
                  (name) => (
                    <Grid item xs={12} md={4} key={name}>
                      <Controller
                        name={name}
                        control={passwordControl}
                        rules={{
                          required: "This field is required",
                          // you can add more rules here (minLength, validate matching, etc.)
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            label={name
                              .replace(/([a-z])([A-Z])/g, "$1 $2")
                              .replace(/^./, (s) => s.toUpperCase())}
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowPassword((v) => !v)}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                  )
                )}
              </Grid>

              {/* Button Bottom-Left */}
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  disabled={!isDirty}
                  sx={{
                    backgroundColor: "#23ba7d",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#00a96d" },
                    "&:disabled": { backgroundColor: "#e5e7eb", color: "#9ca3af" },
                  }}
                >
                  update Password
                </Button>
              </Box>
            </Paper>
          </form>
        </Grid>
      </div>
  )
}

export default Settings
