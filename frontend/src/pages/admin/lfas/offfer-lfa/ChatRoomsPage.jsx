import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button, Box, Chip, Stack } from "@mui/material";
import { useAuth } from '../../../../context/auth/AuthContext'
import { useGetAllRooms } from "../../../../hook/use-lfachat.hook";
import { useNavigate } from "react-router-dom";

const ChatRoomsPage = () => {
 const { data: allRooms = [] } = useGetAllRooms();
const rooms = allRooms.filter((room) => !room.isDeleted);
  const navigate = useNavigate();

  return (
    <Container  
      maxWidth={false} 
      disableGutters
      sx={{ backgroundColor: "#f9fafb", minHeight: "100vh", p: 0 }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4" component="h1" fontWeight={500} sx={{ color: "#16a34a" }}>
          Chat Rooms
        </Typography>
      </Box>
      {rooms.length === 0 ? (
        <Card sx={{ textAlign: "center", py: 6 }}>
          <CardContent>
            <Typography variant="h5" sx={{ color: "#1f2937", fontWeight: 600, mb: 1 }}>
              No Chat Rooms Yet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Send offers to users to create chat rooms for discussions.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2} sx={{ p: 0 }}>
          {rooms?.map((room) => (
            <Grid item xs={12} md={6} lg={4} key={room?._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#1f2937" }}>
                      {room?.name?.split(" - ")[0]}
                    </Typography>
                    {room?.name?.match(/\(([^)]+)\)/) && (
                      <Chip
                        label={room.name.match(/\(([^)]+)\)/)[1]}
                        variant="outlined"
                        size="small"
                        sx={{
                          backgroundColor: "#f9dedc",
                          borderColor: "#b3261e",
                          color: "#BF360C",
                          fontWeight: 100
                        }}
                      />
                    )}
                  </Stack>
                  <Typography>
                    Offered By: {room?.createdByName}{" "}
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full ml-2">
                      Admin
                    </span>
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2} mb={2}></Box>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate(`/admin/lfas/chatroom/${room._id}`)}
                    sx={{
                      mt: 2,
                      backgroundColor: "#3b82f6",
                      "&:hover": { backgroundColor: "#2563eb" },
                    }}
                  >
                    Enter Room
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ChatRoomsPage;