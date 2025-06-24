import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

export const states = [
  {
    name: "Gujarat",
    districts: [
      { name: "Ahmedabad", tehsils: ["Daskroi", "Sanand", "Viramgam"] },
      { name: "Surat", tehsils: ["Choryasi", "Olpad", "Bardoli"] },
      { name: "Rajkot", tehsils: ["Kotda Sangani", "Lodhika", "Jasdan"] },
      { name: "Vadodara", tehsils: ["Savli", "Waghodia", "Padra"] },
    ],
  },
  {
    name: "Maharashtra",
    districts: [
      { name: "Pune", tehsils: ["Haveli", "Mulshi", "Baramati"] },
      { name: "Mumbai", tehsils: ["Andheri", "Borivali", "Kurla"] },
      { name: "Nagpur", tehsils: ["Nagpur Rural", "Kamptee", "Hingna"] },
      { name: "Nashik", tehsils: ["Niphad", "Sinnar", "Yeola"] },
    ],
  },
  {
    name: "Rajasthan",
    districts: [
      { name: "Jaipur", tehsils: ["Amber", "Sanganer", "Shahpura"] },
      { name: "Udaipur", tehsils: ["Girwa", "Mavli", "Kherwara"] },
    ],
  },
  {
    name: "Karnataka",
    districts: [
      {
        name: "Bengaluru Urban",
        tehsils: ["Bangalore North", "Bangalore South", "Yelahanka"],
      },
      { name: "Mysuru", tehsils: ["Mysore", "Nanjangud", "Tirumakudal"] },
    ],
  },
  {
    name: "Tamil Nadu",
    districts: [
      { name: "Chennai", tehsils: ["Mambalam", "Egmore", "Perambur"] },
      { name: "Coimbatore", tehsils: ["Pollachi", "Sulur", "Mettupalayam"] },
    ],
  },
];


const UserEditForm = ({ defaultValues, onSubmit, onClose , isViewOnly = false }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
  });

  const selectedState = watch("state");
  const selectedDistrict = watch("district");

  const districts = states.find((s) => s.name === selectedState)?.districts || [];
  const tehsils = districts.find((d) => d.name === selectedDistrict)?.tehsils || [];

  const [aadhaarPreview, setAadhaarPreview] = React.useState(defaultValues?.aadhaarFile || "");
  const [panPreview, setPanPreview] = React.useState(defaultValues?.panFile || "");

  const aadhaarFile = watch("aadhaarFile")?.[0];
  const panFile = watch("panFile")?.[0];

  React.useEffect(() => {
    let aadhaarUrl, panUrl;

    // Initial fallback to default
    if (defaultValues) {
      setAadhaarPreview(defaultValues.aadhaarFile || "");
      setPanPreview(defaultValues.panFile || "");
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
  }, [defaultValues, aadhaarFile, panFile]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ p: 2 }}>
        <Grid item>
          <TextField
            label="Full Name"
            sx={{ width: "15rem" }}
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
              InputProps={{ readOnly: isViewOnly }}

          />
        </Grid>

        <Grid item>
          <TextField
            label="Email"
            sx={{ width: "15rem" }}
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
              InputProps={{ readOnly: isViewOnly }}

          />
        </Grid>

        <Grid item>
          <FormControl sx={{ width: "15rem" }} error={!!errors.role}>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              defaultValue={defaultValues?.role || ""}
              {...register("role", { required: "Role is required" })}
              disabled={isViewOnly}
            >
              <MenuItem value="USER">User</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Controller
            name="state"
            control={control}
            defaultValue={defaultValues?.state || ""}
            rules={{ required: "State is required" }}
            render={({ field }) => (
              <FormControl sx={{ width: "15rem" }} error={!!errors.state}>
                <InputLabel>State</InputLabel>
                <Select
                  label="State"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setValue("district", "");
                    setValue("tehsil", "");
                  }}
                    disabled={isViewOnly}

                >
                  {states.map((state) => (
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
            control={control}
            defaultValue={defaultValues.district || ""}
            rules={{ required: "District is required" }}
            render={({ field }) => (
              <FormControl sx={{ width: "15rem" }} error={!!errors.district}>
                <InputLabel>District</InputLabel>
                <Select
                  label="District"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setValue("tehsil", "");
                  }}
                  disabled={!selectedState || isViewOnly}

                  
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
            control={control}
            defaultValue={defaultValues.tehsil || ""}
            rules={{ required: "Tehsil is required" }}
            render={({ field }) => (
              <FormControl sx={{ width: "15rem" }} error={!!errors.tehsil}>
                <InputLabel>Tehsil</InputLabel>
                <Select
                  label="Tehsil"
                  {...field}
                  disabled={!selectedDistrict || isViewOnly}
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


        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center" wrap="nowrap">
            <Grid item xs={6}>
              <InputLabel>Aadhaar File</InputLabel>
              <input type="file" accept="image/*" {...register("aadhaarFile")}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                 disabled={isViewOnly}/>

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
                disabled={isViewOnly}
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

        {/* Action Buttons */}
     <Grid item xs={12} sx={{ textAlign: "left" }}>
  <Button onClick={onClose} variant="outlined" sx={{ mr: 2 }}>
    {isViewOnly ? "Close" : "Cancel"}
  </Button>

  {!isViewOnly && (
    <Button
      type="submit"
      variant="contained"
      sx={{ background: "#16A34A" }}
      disabled={isSubmitting}
    >
      Save
    </Button>
  )}
</Grid>

      </Grid>
    </form>
  );
};

export default UserEditForm;
