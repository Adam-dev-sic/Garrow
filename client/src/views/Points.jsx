import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import Circle from "../components/Circle";

function Points() {
  const { userData, fetchUserData } = useUserStore();
  useEffect(() => {
    fetchUserData();
  }, []);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    if (userData?.dailies?.length) {
      const total = userData.dailies.reduce(
        (sum, daily) => sum + (daily.points || 0),
        0
      );
      setTotalPoints(total);
    } else {
      setTotalPoints(0);
    }
  }, [userData]);

  return (
    <div className="@container bg-[url('/images/wallpaperflare.com_wallpaper(11).jpg')] overflow-hidden overflow-x-hidden bg-cover bg-no-repeat bg-center h-screen items-center justify-center flex flex-col space-y-10 ">
      <button className="absolute bottom-0 task-button h-15 !w-50">
        {" "}
        <h1>Achivements.</h1> <p className="text-black/40">(coming soon)</p>
      </button>
      <h1 className="mt-30 villain-title text-center">
        Points: {userData?.totalpoints}
      </h1>
      <div className="absolute top-30 lg:w-[50%] flex">
        <span className="flex w-[50%] flex-col items-center space-y-5">
          <h1 className="border-2 text-2xl  text-center flex flex-col items-center justify-center text-white border-white w-20 h-20 rounded-full">
            {totalPoints}
          </h1>
          <p className="villain-title !text-xs font-black text-center">
            Possible Daily Points
          </p>
        </span>
        {/* <span className="flex items-center"> */}
        {/* <p className="berserk-h1 text-white text-7xl">2</p> */}
        {/* <img src="/images/[CITYPNG.COM]HD Orange Flame Silhouette Icon PNG - 800x800.png" className="w-20 h-20" alt="" /> */}
        {/* </span> */}
        <span className="flex flex-col w-[50%] items-center space-y-5 overflow-hidden">
          <h1 className="border-2 text-2xl  text-center flex flex-col items-center justify-center text-white border-white w-20 h-20 rounded-full">
            {totalPoints}
          </h1>
          <p className="w-[100%] overflow-x-auto villain-title !text-xs font-black text-center">
            Today's Earned Daily Points
          </p>
        </span>
        {/* <Circle /> */}
      </div>
    </div>
  );
}

export default Points;
