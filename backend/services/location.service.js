
import Location from "../models/location.model.js";


export const handleUpdateLocation = async ({ userId, name, lat, lng }) => {
  const { state, district, tehsil } = await reverseGeocode(lat, lng);

  const location = await Location.findOneAndUpdate(
    { userId },
    { lat, lng, name, state, district, tehsil, updatedAt: new Date() },
    { upsert: true, new: true }
  );

  return location;
};

export const reverseGeocode = async (lat, lng) => {
  let state = "", district = "", tehsil = "";

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    const response = await fetch(url, {
      headers: { "User-Agent": "GramSeva/1.0 (contact@gramseva.org)" }
    });

    const data = await response.json();
    state = data.address?.state || "";
    district = data.address?.county || data.address?.district || "";
    tehsil = data.address?.suburb || data.address?.village || data.address?.town || data.address?.city || "";
  } catch (err) {
    console.error("Reverse geocoding failed:", err);
  }

  return { state, district, tehsil };
};
