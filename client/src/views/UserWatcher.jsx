import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";

function UserWatcher() {
  const { retrigger, fetchUserData } = useUserStore();

//   useEffect(() => {
//     fetchUserData();
//   }, [retrigger]);

  return null; // it doesn’t render anything — it just keeps user data updated
}

export default UserWatcher;
