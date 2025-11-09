import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";

function Linked({
  type,
  formLinkedPoints,
  formLinksIds,
  setFormLinksIds,
  setFormLinkedPoints,
}) {
  const { userData } = useUserStore();

  const [weeklyProgress, setWeeklyProgress] = useState(false);
  const [monthlyProgress, setMonthlyProgress] = useState(false);
  const [yearlyProgress, setYearlyProgress] = useState(false);
  useEffect(() => {
    if (type === "daily") {
      setWeeklyProgress(!!formLinksIds.weekly); // true if uuid exists
    } else if (type === "weekly") {
      setMonthlyProgress(!!formLinksIds.monthly);
    } else {
      setYearlyProgress(!!formLinksIds.yearly);
    }
  }, [formLinksIds, type]);

  return (
    <div className="w-full">
      <>
        {type === "daily" ? (
          <div className="flex flex-col space-y-2 mb-5">
            <h1 className="font-bold text-2xl w-full">
              Weekly Goals{" "}
              <span>
                <p className="opacity-80 text-xs">(optional)</p>
              </span>
            </h1>
            <select
              name=""
              id="weeklySelect"
              className="border-2 w-full border-white p-2 rounded-2xl mini-animation"
              value={formLinksIds.weekly}
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue !== "none") {
                  // Do something here when user selects a non-"None" option

                  // Example: call a function

                  setFormLinksIds({ ...formLinksIds, weekly: selectedValue });
                  if (type === "daily") setFormLinkedPoints(14.29);
                  setFormLinkedPoints(14.29);
                } else {
                  setFormLinksIds({ ...formLinksIds, weekly: "" });
                }
              }}
            >
              <option value="none">None</option>
              {userData.weeklies.map((weekly) => {
                return (
                  <option
                    key={weekly.uuid}
                    className="text-white text-lg"
                    value={weekly.uuid}
                  >
                    {weekly.goal}
                  </option>
                );
              })}
            </select>
            <div
              className={`flex items-center mt-2 space-x-4 ${
                weeklyProgress ? "!flex" : "!hidden"
              }`}
            >
              <h1>Progress (%)</h1>
              <input
                value={formLinkedPoints} // controlled input
                onChange={(e) => setFormLinkedPoints(e.target.value)}
                type="text"
                className={` bg-gradient-to-r from-[#dcdcdc] via-[#f5f5f5] to-[#a0a0a0] w-30 text-black
                     font-semibold h-12 text-lg text-center rounded-full p-3 z-50 focus:bg-[#251f19] lg:w-1/2 
                     }`}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {type === "daily" || type === "weekly" ? (
          <div className="flex flex-col space-y-2 mb-5">
            <h1 className="font-bold text-2xl">
              Monthly Goals{" "}
              <span>
                <p className="opacity-80 text-xs">(optional)</p>
              </span>
            </h1>
            <select
              className="w-full border-2 border-white mini-animation p-2 rounded-2xl"
              name=""
              id="Monthlies"
              value={formLinksIds.monthly}
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue !== "none") {
                  // Do something here when user selects a non-"None" option

                  // Example: call a function

                  setFormLinksIds({
                    ...formLinksIds,
                    monthly: selectedValue,
                  });
                  if (type === "weekly") setFormLinkedPoints(25);
                } else setFormLinksIds({ ...formLinksIds, monthly: "" });
              }}
            >
              <option value="none">None</option>
              {userData.monthlies.map((monthly) => {
                return (
                  <option
                    key={monthly.uuid}
                    className="text-white text-lg"
                    value={monthly.uuid}
                  >
                    {monthly.goal}
                  </option>
                );
              })}
            </select>
            <div
              className={`flex items-center mt-5 space-x-3 ${
                monthlyProgress ? "!flex" : "!hidden"
              }`}
            >
              <h1>Progress (%)</h1>
              <input
                type="text"
                value={formLinkedPoints} // controlled input
                onChange={(e) => setFormLinkedPoints(e.target.value)}
                className={` bg-gradient-to-r from-[#dcdcdc] via-[#f5f5f5] to-[#a0a0a0] w-30 text-black
                font-semibold h-12 text-lg text-center rounded-full p-3 z-50 focus:bg-[#251f19] lg:w-1/2 
                }`}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {type === "daily" || type === "weekly" || type === "monthly" ? (
          <div className="flex flex-col space-y-2 mb-5">
            <h1 className="font-bold text-2xl">
              Year Goals{" "}
              <span>
                <p className="opacity-80 text-xs">(optional)</p>
              </span>
            </h1>
            <select
              name=""
              id="yearlySelect"
              className="border-2 border-white p-2 mini-animation w-full rounded-2xl"
              value={formLinksIds.yearly}
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue !== "none") {
                  // Do something here when user selects a non-"None" option

                  // Example: call a function

                  setFormLinksIds({ ...formLinksIds, yearly: selectedValue });
                  if (type === "monthly") setFormLinkedPoints(8.3);
                } else setFormLinksIds({ ...formLinksIds, yearly: "" });
              }}
            >
              <option value="none">None</option>
              {userData.yearlies.map((yearly) => {
                return (
                  <option
                    key={yearly.uuid}
                    className="text-white text-lg"
                    value={yearly.uuid}
                  >
                    {yearly.goal}
                  </option>
                );
              })}
            </select>
            <div
              className={`flex items-center mt-5 space-x-3 mini-animation ${
                yearlyProgress ? "!flex" : "!hidden"
              }`}
            >
              <h1>Progress (%)</h1>
              <input
                type="text"
                value={formLinkedPoints} // controlled input
                onChange={(e) => setFormLinkedPoints(e.target.value)}
                className={` bg-gradient-to-r from-[#dcdcdc] via-[#f5f5f5] to-[#a0a0a0] w-30 text-black
                     font-semibold h-12 text-lg text-center rounded-full p-3 z-50 focus:bg-[#251f19] lg:w-1/2 
                     }`}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    </div>
  );
}

export default Linked;
