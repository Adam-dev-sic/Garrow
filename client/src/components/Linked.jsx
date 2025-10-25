import React, { useState } from "react";
import { useUserStore } from "../store/useUserStore";

function Linked({ type }) {
  const { userData } = useUserStore();
 
  const [weeklyProgress, setWeeklyProgress] = useState(false);
  return (
    <div>
      {type === "daily" ? (
        <>
          <div className="flex flex-col space-y-2 mb-5">
            <h1 className="font-bold text-2xl">Weekly Goals</h1>
            <select
              name=""
              id="weeklySelect"
              className=""
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue !== "none") {
                  // Do something here when user selects a non-"None" option

                  // Example: call a function
                  setWeeklyProgress(true);
                } else setWeeklyProgress(false);
              }}
            >
              <option value="none">None</option>
              {userData.weeklies.map((weekly) => {
                return (
                  <option className="text-white text-lg" value={weekly.goal}>
                    {weekly.goal}
                  </option>
                );
              })}
            </select>
            <div
              className={`flex items-center mt-5 mb-3 space-x-3 ${
                weeklyProgress ? "!flex" : "!hidden"
              }`}
            >
              <h1>Progress</h1>
              <input
                type="text"
                className={` bg-gradient-to-r from-[#dcdcdc] via-[#f5f5f5] to-[#a0a0a0] w-30 text-black
                     font-semibold h-12 text-lg text-center rounded-full p-3 z-50 focus:bg-[#251f19] lg:w-1/2 
                     }`}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 mb-5">
            <h1 className="font-bold text-2xl">Monthly Goals</h1>
            <select name="" id="Monthlies" className="">
              <option value="none">None</option>
              {userData.monthlies.map((monthly) => {
                return (
                  <option className="text-white text-lg" value={monthly.goal}>
                    {monthly.goal}
                  </option>
                );
              })}
            </select>
            {/* <div
            className={`flex items-center mt-5 space-x-3 ${
              weeklyProgress ? "!flex" : "!hidden"
            }`}
          >
            <h1>Progress</h1>
            <input
              type="text"
              className={` bg-gradient-to-r from-[#dcdcdc] via-[#f5f5f5] to-[#a0a0a0] w-30 text-black
                     font-semibold h-12 text-lg text-center rounded-full p-3 z-50 focus:bg-[#251f19] lg:w-1/2 
                     }`}
            />
          </div> */}
          </div>{" "}
          <div className="flex flex-col space-y-2 mb-5">
            <h1 className="font-bold text-2xl">Year Goals</h1>
            <select name="" id="weeklySelect" className="">
              <option value="none">None</option>
              {userData.yearlies.map((yearly) => {
                return (
                  <option className="text-white text-lg" value={yearly.goal}>
                    {yearly.goal}
                  </option>
                );
              })}
            </select>
            {/* <div
            className={`flex items-center mt-5 space-x-3 ${
              weeklyProgress ? "!flex" : "!hidden"
            }`}
          >
            <h1>Progress</h1>
            <input
              type="text"
              className={` bg-gradient-to-r from-[#dcdcdc] via-[#f5f5f5] to-[#a0a0a0] w-30 text-black
                     font-semibold h-12 text-lg text-center rounded-full p-3 z-50 focus:bg-[#251f19] lg:w-1/2 
                     }`}
            />
          </div> */}
          </div>
        </>
      ) : type === "weekly" ? (
        <div>pablsdaasdo</div>
      ) : type === "monthly" ? (
        <div></div>
      ) : (
        type === "yearly"(<div></div>)
      )}
    </div>
  );
}

export default Linked;
