import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "./Header";
import ActionAreaCard from "./Cards";
import axios from "axios";
import GetLocation from "./GetLocation";
import { API } from "../config/api";

const Home = ({ setIsLogin }) => {
  const [profile, setProfile] = useState({});
  const [users, setUsers] = useState([]);
  const userLocation = GetLocation();

  const fetchProfile = async () => {
    try {
      // Make a POST request to your API endpoint
      const response = await axios.get(API.API_BASE_URL + API.PROFILE, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      // Check if the response is successful
      if (response.data?.statusCode === 200) {
        // Redirect to the home page or perform other actions
        setProfile(response.data?.data);
        console.log("Profile Fetched successful");
      }
    } catch (error) {
      // Handle any network or server errors
      console.error("Error during fetch profile:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      // Make a POST request to your API endpoint
      const response = await axios.get(API.API_BASE_URL + API.USERS, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          lat: userLocation.latitude,
          long: userLocation.longitude,
        },
      });

      // Check if the response is successful
      if (response.data?.statusCode === 200) {
        // Redirect to the home page or perform other actions
        setUsers(response.data?.data);
        console.log("Profile Fetched successful");
      }
    } catch (error) {
      // Handle any network or server errors
      console.error("Error during fetch Users:", error);
    }
  };

  const fetchApis = () => {
    try {
      Promise.all([fetchProfile(), fetchUsers()]);
    } catch (error) {
      // Handle any network or server errors
      console.error("Error during fetch API's:", error);
    }
  };

  useEffect(() => {
    fetchApis();
  }, [userLocation]);

  return (
    <>
      <ResponsiveAppBar profile={profile} setIsLogin={setIsLogin} />
      <div
        style={{
          display: "flex",
          gap: "15px",
          margintop: "20px;",
        }}
      >
        {users && users?.map((user) => <ActionAreaCard user={user} />)}
      </div>
    </>
  );
};

export default Home;
