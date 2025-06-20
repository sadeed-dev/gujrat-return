import Location from '../models/location.model.js';
import { handleUpdateLocation } from '../services/location.service.js'

export const updateLocation = async (req, res) => {
  const { lat, lng } = req.body;
  const userId = req.user._id;
  const name = req.user.name;

  if (typeof lat !== "number" || typeof lng !== "number") {
    return res.status(400).json({ error: "Invalid coordinates" });
  }

  try {
    const location = await handleUpdateLocation({ userId, name, lat, lng });
    res.json(location);
  } catch (error) {
    console.error("Location update failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getLocations = async (req, res) => {
  const { userIds } = req.query; 
  let filter = {};
  if (userIds) {
    filter.userId = { $in: userIds.split(',') };
  }
  const locations = await Location.find(filter);
  res.json(locations);
};



// // Example Express route
// export const getLocationsRegion =  async (req, res) => {
//   const { lat, lng } = req.query;

//   const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
  
//   try {
//     const response = await fetch(url, {
//       headers: {
//         'User-Agent': 'LocationTrackerApp/1.0 (devteam@myapp.com)',
//       },
//     });

//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: 'Geocoding failed' });
//   }
// }
