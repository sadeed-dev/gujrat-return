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
import { useGetUser } from "../hook/use-user.hook"
import { useAuth } from "../context/auth/AuthContext"

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false)


  const {user} = useAuth() // 
  const { data, isLoading, error } = useGetUser(user?.id)

  const userData = data?.data || null // Ensure userData is not undefined
console.log("User Data in Settings:", userData)

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
    register,
    watch
  } = useForm()


  const stateOptions = ["Karnataka", "Maharashtra", "Gujarat", "Tamil Nadu", "Kerala"]
  const districtOptions = ["Bengaluru Urban", "Mumbai", "Ahmedabad", "Chennai", "Kochi"]
  const tehsilOptions = ["Bangalore South", "Andheri", "Sanand", "T. Nagar", "Fort Kochi"]


 
  
useEffect(() => {
  if (userData) {
    reset({
      name: userData.name || "",
      email: userData.email || "",
      state: userData.state || "",
      district: userData.district || "",
      tehsil: userData.tehsil || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      isEditing: false,
  
    });
  }
}, [userData, reset]);

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

  const handleEdit = () => setValue("isEditing", true)

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

  const onSubmit = (data) => {
    console.log("Submitted form data:", data)
    setValue("isEditing", false)
  }

  const InfoSection = ({ title, icon, children }) => (
    <Card elevation={0} sx={{ border: "1px solid #e5e7eb", borderRadius: 2, mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Box sx={{ color: "#16a34a" }}>{icon}</Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#374151" }}>
            {title}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  )

  if (isLoading) return <p className="p-4 text-gray-500">Loading user data...</p>
  if (error) return <p className="p-4 text-red-500">Failed to load user data.</p>

  return (
    <AdminNavbar>
      <Container maxWidth="lg" sx={{ py: 4, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar sx={{ width: 80, height: 80, backgroundColor: "#16a34a", fontSize: "2rem", fontWeight: 700 }}>
              {userData?.name?.[0] || "U"}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600, color: "#16a34a", mb: 1 }}>
                Profile Settings
              </Typography>
              <Typography variant="body1" sx={{ color: "#6b7280" }}>
                Manage your account information and preferences
              </Typography>
            </Box>
          </Box>
      
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* Personal Info */}
            <Grid item xs={12} md={6}>
              <InfoSection title="Personal Information" icon={<Person />}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Full Name"
                          fullWidth
                          error={!!errors.name}
                          helperText={errors.name?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="email"
                      control={control}
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
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </InfoSection>
            </Grid>

            {/* Location Info */}
            <Grid item xs={12} md={6}>
              <InfoSection title="Location Details" icon={<LocationOn />}>
                <Grid container spacing={2}>
                  {["state", "district", "tehsil"].map((fieldName) => (
                    <Grid item xs={12} key={fieldName}>
                      <Controller
                        name={fieldName}
                        control={control}
                        rules={{ required: `${fieldName} is required` }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                            fullWidth
                            error={!!errors[fieldName]}
                            helperText={errors[fieldName]?.message}
                          >
                            {(fieldName === "state"
                              ? stateOptions
                              : fieldName === "district"
                              ? districtOptions
                              : tehsilOptions
                            ).map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>
                  ))}
                </Grid>
              </InfoSection>
            </Grid>

            {/* Document Uploads */}
            {/* <Grid item xs={12}>
              <InfoSection title="Document Information" icon={<Upload />}>
                        <Grid item xs={6}>
                              <InputLabel>Aadhaar File</InputLabel>
                              <input type="file" accept="image/*" {...register("aadhaarFile")}
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                              />
                
                              {aadhaarPreview && (
                                <a href={aadhaarPreview} target="_blank" rel="noopener noreferrer">
                
                                  <img
                                    src={aadhaarPreview}
                                    alt="Aadhaar Preview"
                                    style={{
                                      width: "150px",
                                      height: "150px",
                                      objectFit: "contain",
                                      marginBottom: "0.5rem",
                                      borderRadius: "0.5rem",
                                      display: "block",
                                    }}
                                  />
                                </a>
                
                              )}
                            </Grid>
                
                            <Grid item xs={6}>
                              <InputLabel >PAN File</InputLabel>
                              <input type="file" accept="image/*" {...register("panFile")}
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              
                              />
                
                              {panPreview && (
                                <a href={panPreview} target="_blank" rel="noopener noreferrer">
                
                                  <img
                                    src={panPreview}
                                    alt="PAN Preview"
                                    style={{
                                      width: "150px",
                                      height: "150px",
                                      objectFit: "contain",
                                      marginBottom: "0.5rem",
                                      borderRadius: "0.5rem",
                                      display: "block",
                                    }}
                                  />
                                </a>
                
                              )}
                            </Grid>
              </InfoSection>
            </Grid> */}

 <Grid item xs={12}>
            
                    <Grid item xs={12}>
                      <Grid container spacing={2} alignItems="center" wrap="nowrap">
                        <Grid item xs={6}>
                          <InputLabel>Aadhaar File</InputLabel>
                          <input type="file" accept="image/*" {...register("aadhaarFile")}
                            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                          />
            
                          {aadhaarPreview && (
                            <a href={aadhaarPreview} target="_blank" rel="noopener noreferrer">
            
                              <img
                                src={aadhaarPreview}
                                alt="Aadhaar Preview"
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  objectFit: "contain",
                                  marginBottom: "0.5rem",
                                  borderRadius: "0.5rem",
                                  display: "block",
                                }}
                              />
                            </a>
            
                          )}
                        </Grid>
            
                        <Grid item xs={6}>
                          <InputLabel >PAN File</InputLabel>
                          <input type="file" accept="image/*" {...register("panFile")}
                            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            
                          />
            
                          {panPreview && (
                            <a href={panPreview} target="_blank" rel="noopener noreferrer">
            
                              <img
                                src={panPreview}
                                alt="PAN Preview"
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  objectFit: "contain",
                                  marginBottom: "0.5rem",
                                  borderRadius: "0.5rem",
                                  display: "block",
                                }}
                              />
                            </a>
            
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
            </Grid>

            

            {/* Password Change */}
              <Grid item xs={12}>
                <InfoSection title="Change Password" icon={<Security />}>
                  <Grid container spacing={2}>
                    {["currentPassword", "newPassword", "confirmPassword"].map((name, i) => (
                      <Grid item xs={12} md={4} key={name}>
                        <Controller
                          name={name}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label={name.replace(/([a-z])([A-Z])/g, "$1 $2")}
                              type={showPassword ? "text" : "password"}
                              fullWidth
                              InputProps={{
                                endAdornment:
                                  i === 0 ? (
                                    <InputAdornment position="end">
                                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  ) : null,
                              }}
                            />
                          )}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </InfoSection>
              </Grid>
          </Grid>

          {/* Actions */}
            <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
              <Button onClick={handleCancel} startIcon={<CancelIcon />}>
                Cancel
              </Button>
              <Button
                type="submit"
                startIcon={<SaveIcon />}
                disabled={!isDirty}
                sx={{
                  backgroundColor: "#16a34a",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#15803d" },
                  "&:disabled": { backgroundColor: "#e5e7eb", color: "#9ca3af" },
                }}
              >
                Save Changes
              </Button>
            </Box>
        
        </form>
      </Container>
    </AdminNavbar>
  )
}

export default Settings
