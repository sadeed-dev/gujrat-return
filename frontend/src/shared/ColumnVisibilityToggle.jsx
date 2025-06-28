// shared/ColumnVisibilityToggle.js

import {
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import SearchIcon from "@mui/icons-material/Search";

const ColumnVisibilityToggle = ({ columns, visibility, setValue ,toggleField}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const open = Boolean(anchorEl);
  const ref = useRef(null);

  // const handleToggle = (field) => {
  //   console.log(field)
  //   setValue(`visibility.${field}`, !visibility?.[field]);
  // };

  const handleShowAll = () => {
    const allVisible = {};
    columns.forEach((col) => {
      allVisible[col.field] = true;
    });
    setValue("visibility", allVisible);
  };

  const handleHideAll = () => {
    const allHidden = {};
    columns.forEach((col) => {
      allHidden[col.field] = false;
    });
    setValue("visibility", allHidden);
  };

  const handleReset = () => {
    const defaults = {};
    columns.forEach((col) => {
      defaults[col.field] = true;
    });
    setValue("visibility", defaults);
  };

  const filteredColumns = columns.filter((col) =>
    col.headerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box display="flex" alignItems="center" gap={1}>

      <Tooltip title="Manage Columns">
    <Box
  display="flex"
  alignItems="center"
  gap={1}
  sx={{
    ml: 2,
    px: 2,
    py: 0.5,
    backgroundColor: "#f9fafb",
    borderRadius: "999px",
    border: "1px solid #e5e7eb",
    "&:hover": {
      backgroundColor: "#f0fdf4",
      borderColor: "#4ade80",
    },
  }}
>
  <Typography variant="body2" fontWeight={600} color="#111827">
    Column View
  </Typography>
  <IconButton
    size="small"
    onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
    ref={ref}
    sx={{
      p: "4px",
      backgroundColor: "#fff",
      borderRadius: "50%",
      "&:hover": {
        backgroundColor: "#dcfce7",
      },
    }}
  >
    <ViewColumnIcon sx={{ color: "#16a34a", fontSize: 20 }} />
  </IconButton>
</Box>

      </Tooltip>

    <Popper open={open} anchorEl={anchorEl} placement="bottom-start" style={{ zIndex: 1300 }}>
  <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
    <Paper sx={{ width: 260, maxHeight: 400, p: 1, display: 'flex', flexDirection: 'column' }}>
      <TextField
        placeholder="Search columns"
        fullWidth
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 1 }}
      />

      {/* Scrollable columns list */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <MenuList dense>
          {filteredColumns.map((col) => (
            <MenuItem key={col.field} disableGutters>
              <Checkbox
                size="small"
                checked={visibility[col.field] !== false}
                onChange={() => toggleField(col.field)}
              />
              <Typography variant="body2">{col.headerName}</Typography>
            </MenuItem>
          ))}
        </MenuList>
      </Box>

      {/* Fixed action buttons */}
      <Box display="flex" justifyContent="space-between" px={1} mt={1}>
        <Button
          size="small"
          variant="outlined"
          onClick={handleShowAll}
          sx={{ fontSize: '0.65rem', padding: '2px 6px', fontWeight: 'bold' }}
        >
          Show All
        </Button>

        <Button
          size="small"
          variant="outlined"
          onClick={handleHideAll}
          sx={{ fontSize: '0.65rem', padding: '2px 6px', fontWeight: 'bold' }}
        >
          Hide All
        </Button>

        <Button
          size="small"
          variant="contained"
          onClick={handleReset}
          sx={{ fontSize: '0.65rem', padding: '2px 6px', fontWeight: 'bold' }}
        >
          Reset
        </Button>
      </Box>
    </Paper>
  </ClickAwayListener>
</Popper>

    </Box>
  );
}
export default ColumnVisibilityToggle