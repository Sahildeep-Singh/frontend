import React, { useEffect, useState } from "react";

const GetLocation = () => {
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("position", position);

          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  return userLocation;
};

export default GetLocation;
