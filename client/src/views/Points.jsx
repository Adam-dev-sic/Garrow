import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import Circle from "../components/Circle";
import { useTodaysPoints } from "../store/useTodaysPoints";
import { apiFetch } from "../utils/api";
import Achievements from "../components/Achievements";

function Points() {
  const { userData, fetchUserData } = useUserStore();
  const [achievementLayout, setAchievementLayout] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const { setTodays, resetTodaysPoints } = useTodaysPoints();
  const [achivementTrigger, setAchivementTrigger] = useState(5000);
  const [tutorialModal, setTutorialModal] = useState(false);
  // console.log(todaysPoints);
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
  useEffect(() => {
    const checkAchievements = async () => {
      if (!userData || !userData.id) return;
      let hasRan = false;
      if (!hasRan) {
        const id = await userData.id;
        if (userData?.totalpoints >= userData?.reqAchivPoints) {
          try {
            const response = await apiFetch("/api/achievements/add", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ id }), // send as an object!
            });

            if (response.ok) {
              console.log("🎉 Achievement generation triggered!");
            } else {
              console.error(
                "❌ Failed to generate achievement:",
                response.status
              );
            }
            hasRan = true;
          } catch (err) {
            alert("❌ Error generating achievement: " + err.message);
          }
        }
      }
    };

    checkAchievements();
  }, []);

  return (
    <div className="@container animate-fade-in bg-[url('/images/wallpaperflare.com_wallpaper11.jpg')] overflow-hidden overflow-x-hidden bg-cover bg-no-repeat bg-center h-screen items-center justify-center flex flex-col space-y-10 ">
      <button
        onClick={() => {
          setAchievementLayout(!achievementLayout);
        }}
        className="absolute bottom-0 task-button h-15 !w-50"
      >
        {" "}
        <h1>Achivements</h1>
      </button>
      <h1 className="mt-30 villain-title text-center">
        Points: {userData?.totalpoints}
      </h1>
      <div className="absolute top-30 lg:w-[50%] flex">
        <span className="flex w-[50%] flex-col items-center space-y-5">
          <div className="border-2 text-2xl  text-center flex flex-col items-center justify-center text-white border-white w-20 h-20 rounded-full">
            <h1>{totalPoints}</h1>
          </div>
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
            {userData?.todaysPoints || 0}
          </h1>
          <p className="w-[100%] overflow-x-auto villain-title !text-xs font-black text-center">
            Points Earned Today
          </p>
        </span>
        {/* <Circle /> */}
      </div>
      {achievementLayout && (
        <div
          className="fixed inset-0.5 w-full h-full bg-black/50 flex items-center justify-center mt-10"
          onClick={() => {
            setAchievementLayout(!achievementLayout);
          }}
        >
          <Achievements userData={userData} />
        </div>
      )}
    </div>
  );
}

export default Points;
