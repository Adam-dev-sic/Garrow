import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { initMidnightReset } from "../store/useTodaysPoints";

function UserWatcher() {
  const { userData, retrigger, fetchUserData } = useUserStore();

  useEffect(() => {
    fetchUserData();
    initMidnightReset();
  }, []);

  return null; // it doesn’t render anything — it just keeps user data updated
}

export default UserWatcher;
