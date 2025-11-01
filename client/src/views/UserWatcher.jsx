import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";

function UserWatcher() {
  const { userData,retrigger, fetchUserData } = useUserStore();

  useEffect(() => {
    
    fetchUserData();
  }, []);

  return null; // it doesn’t render anything — it just keeps user data updated
}

export default UserWatcher;
