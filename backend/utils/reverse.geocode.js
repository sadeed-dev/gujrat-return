
export const reverseGeocode = async (lat, lng) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'GramSeva/1.0 (your@email)'
      }
    });

    const data = await response.json();

        return {
      state: data.address?.state || '',
      district: data.address?.county || data.address?.district || '',
      tehsil: data.address?.suburb || data.address?.village || data.address?.town || data.address?.city || '',
      pincode:data?.address?.postcode,
      location:data?.address.road || data?.address?.neighbourhood

    };
  } catch (err) {
    console.error('Reverse geocoding failed:', err);
    return { state: '', district: '', tehsil: '' };
  }
};
