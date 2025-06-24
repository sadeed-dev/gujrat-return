

// import React, { useEffect, useState, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import io from "socket.io-client";
// import axios from "axios";
// import { Box, Typography } from "@mui/material";

// const socket = io("http://localhost:5000"); 
// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// export default function LocationDashboard({ user }) {
//   const [users, setUsers] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const mapRef = useRef();

//   // Fetch all users
//   useEffect(() => {
//     axios.get(`${apiBaseUrl}/user/get-users`, {
//       headers: { Authorization: `Bearer ${user?.token}` }
//     }).then(res => setUsers(res.data.data || []));
//   }, [user?.token]);

//   // Fetch all locations
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const res = await axios.get(`${apiBaseUrl}/location/all`, {
//           headers: { Authorization: `Bearer ${user?.token}` }
//         });
//         setLocations(res.data);
//       } catch (error) {
//         console.error("Error fetching locations:", error);
//       }
//     };
//     fetchLocations();
//   }, [user?.token]);

//   // Listen for real-time location updates
// useEffect(() => {
//   // This function runs when a new location is received
//   function updateLocation(newLocation) {
//     setLocations((oldLocations) => {
//       // Try to find if the user already exists in the list
//       const userExists = oldLocations.some(
//         (user) => user.userId === newLocation.userId
//       );

//       if (userExists) {
//         // If user exists, update their location
//         return oldLocations.map((user) => {
//           if (user.userId === newLocation.userId) {
//             // Merge old data with new location
//             return { ...user, ...newLocation };
//           }
//           return user; // Keep others as is
//         });
//       } else {
//         // If it's a new user, add them to the list
//         return [...oldLocations, newLocation];
//       }
//     });
//   }

//   // Start listening to "locationUpdate" from the server
//   socket.on("locationUpdate", updateLocation);

//   // When component is removed, stop listening
//   return () => {
//     socket.off("locationUpdate", updateLocation);
//   };
// }, []);


//   const usersWithLocation = users.map(u => {
//     const loc = locations.find(l => String(l.userId) === String(u._id));
//     return {
//       ...u,
//       lat: loc?.lat,
//       lng: loc?.lng,
//       updatedAt: loc?.updatedAt,
//     };
//   });

//   return (
//     <Box display="flex" gap={4} p={2}>
//       <Box flex={1} height="80vh">
//         <Typography variant="h6" mb={2}>All Users Last Known Location</Typography>
//         <MapContainer
//           center={[22.9734, 78.6569]} // Center of India
//           zoom={5}
//           style={{ height: "100%", width: "100%" }}
//           ref={mapRef}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//  {usersWithLocation
//             .filter(u => u.lat && u.lng)
//             .map(u => (
//               <Marker key={u._id} position={[u.lat, u.lng]}>
//                 <Popup>
//                   <b>{u.name}</b><br />
//                   Last updated: {u.updatedAt ? new Date(u.updatedAt).toLocaleString() : "Never"}
//                 </Popup>
//               </Marker>
//             ))}
//         </MapContainer>
//       </Box>
//     </Box>
//   );
// }import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import socket from "../../../socket/socket";
import { useRef } from "react";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
import { useEffect } from "react";
import { useState } from "react";
const defaultAvatar = "https://www.gravatar.com/avatar/?d=mp";

// Create a custom avatar icon for markers
const createAvatarIcon = (url) =>
  L.divIcon({
    html: `<div class="custom-avatar-marker"><img src="${url}" /></div>`,
    className: "", // <- very important to leave this empty
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -22],
  });


const LocationDashboard = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  const mapRef = useRef();



  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${apiBaseUrl}/user/get-users`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setUsers(data.data || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    if (user?.token) fetchUsers();
  }, [user?.token]);

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await axios.get(`${apiBaseUrl}/location/all`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    if (user?.token) fetchLocations();
  }, [user?.token]);

  // Socket listener for location updates
  // useEffect(() => {
  //   const handleLocationUpdate = (newLocation) => {
  //     setLocations((prev) => {
  //       const index = prev.findIndex((l) => l.userId === newLocation.userId);
  //       if (index >= 0) {
  //         const updated = [...prev];
  //         updated[index] = { ...updated[index], ...newLocation };
  //         return updated;
  //       }
  //       return [...prev, newLocation];
  //     });
  //   };

  //   socket.on("locationUpdate", handleLocationUpdate);
  //   return () => socket.off("locationUpdate", handleLocationUpdate);
  // }, []);

  // Combine user and their location
  { console.log(locations) }

  const usersWithLocation = users
    .map((u) => {
      const loc = locations.find((l) => String(l.userId) === String(u._id));
      if (!loc) return null;
      return { user: u, location: loc };
    })
    .filter(Boolean); // remove null entries

  const renderTooltipContent = (user, location) => (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      p={1}
      gap={0.5}
      sx={{
        zIndex: 10000,
        backgroundColor: "white",
        position: "absolute",
        left: 35, // instead of relative
        boxShadow: 2,
        borderRadius: 1,
      }}
    >
      <Typography variant="subtitle2" fontWeight={600}>
        {user.name}
      </Typography>

      <Typography variant="caption">
        <strong>Email:</strong> {user.email}
      </Typography>
      <Typography variant="caption">
        <strong>State:</strong> {location.state}
      </Typography>
      <Typography variant="caption">
        <strong>District:</strong> {location.district}
      </Typography>
      <Typography variant="caption">
        <strong>Tehsil:</strong> {location.tehsil}
      </Typography>
      <Typography variant="caption">
        <strong>Location:</strong> {location.location}
      </Typography>
      <Typography variant="caption">
        <strong>Last updated:</strong>{" "}
        {location.updatedAt ? new Date(location.updatedAt).toLocaleString() : "Never"}
      </Typography>
    </Box>
  );

  return (
    <Box display="flex" gap={3} p={3}>
      <Box flex={1} height="85vh">
        <Typography variant="h6" mb={2}>
          User Locations
        </Typography>

        <MapContainer
          center={[22.9734, 78.6569]} // Center of India
          zoom={5}
          scrollWheelZoom
          style={{ height: "100%", width: "100%", borderRadius: "8px" }}
          ref={mapRef}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {usersWithLocation.map(({ user, location }) => (
            <Marker
              key={user._id}
              position={[location.lat, location.lng]}
              icon={createAvatarIcon(user.profilePicture || defaultAvatar)}
            >
              <Tooltip
                direction="top"
                offset={[0, -10]}
                permanent={false}
                sticky
              >
                {renderTooltipContent(user, location)}
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default LocationDashboard;
