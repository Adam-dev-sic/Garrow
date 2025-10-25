import { response } from "express";
import React, { useState } from "react";

function UserInfo({retrigger}) {
  const [userData, setUserData] = useState(null);
  useEffect(async () => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // for cookies/session if using passport
        });
        if (!res.ok) return console.log("Failed to fetch data: ", res.status);

        const data = res.json;
        console.log("Fetched user data:", data);
        setUserData(data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData;
  }, [retrigger]);

  return <div>UserInfo</div>;
}

export default UserInfo;
