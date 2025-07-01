import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";

const LfaHeader = ({ activeView, setActiveView, chatCount }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      alignItems={isMobile ? "flex-start" : "center"}
      justifyContent="space-between"
      mb={1}
      gap={isMobile ? 1 : 0}
    >
      <Typography
        variant="h5"
        component="h1"
        fontWeight={500}
        sx={{
          color: "#16a34a",
          fontSize: isMobile ? "18px" : "24px", // Adjust font size
        }}
      >
        LFA Management System
      </Typography>

      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        gap={1}
        width={isMobile ? "100%" : "auto"}
      >
        <Button
          fullWidth={isMobile}
          variant={activeView === "table" ? "contained" : "outlined"}
          onClick={() => setActiveView("table")}
          sx={{
            backgroundColor: activeView === "table" ? "#16a34a" : "transparent",
            borderColor: "#16a34a",
            color: activeView === "table" ? "white" : "#16a34a",
            "&:hover": {
              backgroundColor: activeView === "table" ? "#15803d" : "#f0fdf4",
            },
          }}
        >
          LFA Table
        </Button>

        <Button
          fullWidth={isMobile}
          variant={activeView === "chat" ? "contained" : "outlined"}
          onClick={() => setActiveView("chat")}
          sx={{
            backgroundColor: activeView === "chat" ? "#16a34a" : "transparent",
            borderColor: "#16a34a",
            color: activeView === "chat" ? "white" : "#16a34a",
            "&:hover": {
              backgroundColor: activeView === "chat" ? "#15803d" : "#f0fdf4",
            },
          }}
        >
          Chat Rooms ({chatCount})
        </Button>
      </Box>
    </Box>
  );
};

export default LfaHeader;
