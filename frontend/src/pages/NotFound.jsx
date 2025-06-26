import React from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Stack,
  useTheme,
} from "@mui/material"
import { Home, ArrowLeft, Search, RefreshCw } from "lucide-react"
import { Link } from "react-router-dom"

const NotFound = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(to bottom right, #ecfdf5, #d1fae5)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
      }}
    >
      {/* Floating Bubbles */}
      <Box
        sx={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 80,
          height: 80,
          bgcolor: "#a7f3d0",
          borderRadius: "50%",
          opacity: 0.2,
          animation: "bounce 2s infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: 64,
          height: 64,
          bgcolor: "#99f6e4",
          borderRadius: "50%",
          opacity: 0.2,
          animation: "bounce 2s infinite",
          animationDelay: "1s",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: 20,
          width: 28,
          height: 28,
          bgcolor: "#6ee7b7",
          borderRadius: "50%",
          opacity: 0.2,
          animation: "bounce 2s infinite",
          animationDelay: "2s",
        }}
      />

      <div style={{display:'flex', alignItems:'center', flexDirection:'column', textAlign:'center'}}>
        {/* 404 Visual */}
        <Box sx={{ position: "relative", mb: 1 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "8rem",},
              fontWeight: "bold",
              color: "#d1fae5",
              userSelect: "none",
            }}
          >
            404
          </Typography>
          <Box
            sx={{
              position: "absolute",
              top: "30%",
              left: "36%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#10b981",
              width: { xs:50, md: 60 },
              height: { xs: 50, md: 60 },
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "pulse 2s infinite",
            }}
          >
            <Search color="#fff" size={40} />
          </Box>
        </Box>

        {/* Card Content */}
        <Card sx={{ border: "1px solid #a7f3d0", boxShadow: 4 }}>
          <CardContent sx={{ p: { xs: 1, md: 2 } }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Page Not Found
            </Typography>
            <Typography variant="body3" color="text.secondary" paragraph>
              Oops! The page you're looking for doesn’t exist. Maybe it moved,<br></br> or maybe you mistyped the URL.
            </Typography>

<Stack
  direction={{ xs: "column", sm: "row" }}
  spacing={2}
  justifyContent="center"
  sx={{ my: 4 }}
>
  <Button
    component={Link}
    to="/"
    variant="contained"
    sx={{
      backgroundColor: "#10b981",
      color: "#fff",
      minWidth: 160,
      "&:hover": { backgroundColor: "#059669" },
    }}
    startIcon={<Home size={20} />}
  >
    Go Home
  </Button>

  <Button
    variant="outlined"
    sx={{
      borderColor: "#10b981",
      color: "#10b981",
      minWidth: 160,
      "&:hover": { backgroundColor: "#ecfdf5" },
    }}
    onClick={() => window.history.back()}
    startIcon={<ArrowLeft size={20} />}
  >
    Go Back
  </Button>

  <Button
    variant="outlined"
    sx={{
      borderColor: "#10b981",
      color: "#10b981",
      minWidth: 160,
      "&:hover": { backgroundColor: "#ecfdf5" },
    }}
    onClick={() => window.location.reload()}
    startIcon={<RefreshCw size={20} />}
  >
    Refresh
  </Button>
</Stack>


            <Box
              sx={{
                bgcolor: "#ecfdf5",
                border: "1px solid #a7f3d0",
                borderRadius: 2,
                p: 3,
                mt: 2,
              }}
            >
              <Typography fontWeight="600" color="#065f46" mb={1}>
                Need Help?
              </Typography>
              <Typography variant="body2" color="#047857">
                If you believe this is an error, check the URL or contact support. We’re happy to assist you!
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Footer */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 4, display: "block" }}
        >
          © 2025 Your Company. All rights reserved.
        </Typography>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
    </Box>
  )
}

export default NotFound
