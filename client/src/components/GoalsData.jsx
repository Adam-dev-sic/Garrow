import React, { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { Link } from "react-router-dom";
import { useTodaysPoints } from "../store/useTodaysPoints";
import { apiFetch } from "../utils/api";

function GoalsData({
  isLoading,
  userData,
  isMobile,
  goal,
  progression,
  point,
  linked,
  type,
  editId,
  setEditId,
  formIsOpen,
  setFormIsOpen,
}) {
  const { fetchUserData, triggerRefetch, retrigger } = useUserStore();
  useEffect(() => {
    fetchUserData();
  }, [retrigger]);

  const iterationKey =
    type === "daily"
      ? "dailies"
      : type === "weekly"
      ? "weeklies"
      : type === "monthly"
      ? "monthlies"
      : "yearlies";

  const iterationValue = userData[iterationKey] || [];
  const progressKey =
    type === "daily"
      ? "weeklyProgress"
      : type === "weekly"
      ? "monthlyProgress"
      : type === "monthly"
      ? "yearlyProgress"
      : "";
  const progressText =
    type === "daily"
      ? "Weekly Progress"
      : type === "weekly"
      ? "Monthly Progress"
      : type === "monthly"
      ? "Yearly Progress"
      : "";

  const handleChecked = async (e, goalId) => {
    const isChecked = e.target.checked; // ✅ safer
    console.log(isChecked, goalId);

    try {
      const response = await apiFetch(`/goals/${type}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ goalId: goalId, isChecked }),
      });

      triggerRefetch();
    } catch (err) {
      console.error("Error:", err);
      alert("error occured ", err);
    }
  };

  // a feature i thought about adding but ended up deciding not to (this code doesnt work as i intended but thats not the reason for discarding the idea)
  // useEffect(() => {
  //   if (!iterationValue || iterationValue.length === 0) return;

  //   iterationValue.forEach((value) => {
  //     if (value.progress >= 100) {
  //       handleChecked(null, value.id, true);
  //       fetchUserData()
  //     }
  //   });
  // }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">Fetching Data...</div>
      ) : !isMobile ? (
        <>
          {iterationValue.map((goalType) => {
            let linkedDaily, linkedWeekly, linkedMonthly, linkedYearly;

            if (type === "daily") {
              linkedWeekly = userData.weeklies.find(
                (w) => w.uuid === goalType.weeklyUuid
              );
              linkedMonthly = userData.monthlies.find(
                (m) => m.uuid === goalType.monthlyUuid
              );
              linkedYearly = userData.yearlies.find(
                (y) => y.uuid === goalType.yearlyUuid
              );
            } else if (type === "weekly") {
              linkedDaily = goalType.dailies.map((connectedDailies, index) => (
                <React.Fragment key={connectedDailies.uuid || index}>
                  {connectedDailies.goal}
                  <br />
                </React.Fragment>
              ));
              linkedMonthly = userData.monthlies.find(
                (m) => m.uuid === goalType.monthlyUuid
              );
              linkedYearly = userData.yearlies.find(
                (y) => y.uuid === goalType.yearlyUuid
              );
            } else if (type === "monthly") {
              linkedDaily = goalType.dailies.map((connectedDailies, index) => (
                <React.Fragment key={connectedDailies.uuid || index}>
                  {connectedDailies.goal}
                  <br />
                </React.Fragment>
              ));
              linkedWeekly = goalType.weeklies.map(
                (connectedDailies, index) => (
                  <React.Fragment key={connectedDailies.uuid || index}>
                    {connectedDailies.goal}
                    <br />
                  </React.Fragment>
                )
              );
              linkedYearly = userData.yearlies.find(
                (y) => y.uuid === goalType.yearlyUuid
              );
            } else if (type === "yearly") {
              linkedDaily = goalType.dailies.map((connectedDailies, index) => (
                <React.Fragment key={connectedDailies.uuid || index}>
                  {connectedDailies.goal}
                  <br />
                </React.Fragment>
              ));
              linkedWeekly = goalType.weeklies.map(
                (connectedDailies, index) => (
                  <React.Fragment key={connectedDailies.uuid || index}>
                    {connectedDailies.goal}
                    <br />
                  </React.Fragment>
                )
              );
              linkedMonthly = goalType.monthlies.map(
                (connectedDailies, index) => (
                  <React.Fragment key={connectedDailies.uuid || index}>
                    {connectedDailies.goal}
                    <br />
                  </React.Fragment>
                )
              );
            }

            return (
              <div
                key={goalType.id}
                className="group relative flex rounded-lg flex-shrink-0 has-[input:checked]:border-0 has-[input:checked]:shadow-[0_0_9px_4px_rgba(255,255,255,0.8)]  p-5 bg-[#181818] items-start border-b-2 overflow-x-auto overflow-y-visible font-bold h-30 space-x-10 w-full border-b-white"
              >
                <img
                  src="/images/edit.png"
                  className="w-7 h-7 absolute left-2 top-0 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  alt="edit"
                  onClick={() => {
                    setEditId(goalType.id);
                    console.log("Editing goal with ID:", goalType.id);
                    setFormIsOpen(true);
                  }}
                />

                <div className="flex-shrink-0  text-center items-center  flex w-[72%]">
                  <label className="flex items-center space-x-3 cursor-pointer w-full select-none group">
                    <div className="relative w-7 h-7 flex-shrink-0">
                      <input
                        defaultChecked={goalType.checked ? "checked" : ""}
                        type="checkbox"
                        className="absolute inset-0 appearance-none rounded-md border-2 border-gray-400 checked:border-[#f5f5f5] checked:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] checked:bg-black transition-all duration-500 cursor-pointer"
                        onChange={(e) => handleChecked(e, goalType.id)}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute w-4 h-4 hover:opacity-40 text-white opacity-0 group-has-[input:checked]:opacity-100 transition-opacity duration-300 top-1.5 left-1.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <h1
                        className={`font-bold  text-white transition-all duration-300 group-has-[input:checked]:line-through group-has-[input:checked]:text-gray-400 ${
                          type === "daily" ? "!w-[50%] lg:text-lg" : "!w-[35%]"
                        }`}
                      >
                        {goalType.goal}
                      </h1>

                      {type != "daily" ? (
                        <div className="w-[35%] flex flex-col mt-5 items-center px-4">
                          <div className="w-full  bg-[#2a2a2a] rounded-full h-3 overflow-hidden shadow-inner relative">
                            <div
                              className={`h-full bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.6)] transition-all duration-700 ease-in-out `}
                              style={{
                                width: `${
                                  goalType.progress > 100
                                    ? 100
                                    : goalType.progress
                                }%`,
                              }}
                            ></div>
                          </div>
                          <div className="text-sm text-gray-300 mt-2  text-center">
                            {goalType.progress > 100 ? 100 : goalType.progress}%
                            Complete
                          </div>
                        </div>
                      ) : null}
                      <div
                        className={`flex flex-col space-y-5 mr-0 ${
                          type === "daily" ? "w-[50%]" : "w-[35%]"
                        } `}
                      >
                        <h1 className=" text-lg text-center group-has-[input:checked]:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] font-bold group-has-[input:checked]:!font-black ">
                          Points Reward:{goalType.points}
                        </h1>
                        {type != "yearly" && (
                          <h1 className=" text-lg text-center group-has-[input:checked]:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] font-bold group-has-[input:checked]:!font-black ">
                            {progressText}: {goalType[progressKey] ?? 0}%
                          </h1>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
                <div className="flex-shrink-0 w-[28%] flex ml-10 mt-0 overflow-y-auto">
                  <div className="flex flex-col justify-center font-bold space-y-4">
                    {type != "daily" ? (
                      linkedDaily != "" ? (
                        <>
                          {" "}
                          <h1>
                            <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                              ●{" "}
                            </span>
                            {linkedDaily}{" "}
                          </h1>
                        </>
                      ) : (
                        <>
                          <h1>
                            <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                              ●{" "}
                            </span>
                            No Dailies Linked{" "}
                          </h1>
                        </>
                      )
                    ) : (
                      ""
                    )}
                    {type === "monthly" || type === "yearly" ? (
                      linkedWeekly != "" ? (
                        <>
                          {" "}
                          <h1>
                            <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                              ●{" "}
                            </span>
                            {linkedWeekly}
                          </h1>{" "}
                        </>
                      ) : (
                        <h1>
                          <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                            ●{" "}
                          </span>
                          No Weeklies Linked
                        </h1>
                      )
                    ) : (
                      ""
                    )}{" "}
                    {type === "daily" ? (
                      linkedWeekly ? (
                        <h1>
                          <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                            ●{" "}
                          </span>
                          {linkedWeekly.goal}
                        </h1>
                      ) : (
                        <h1>
                          <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                            ●{" "}
                          </span>
                          No Weeklies Linked
                        </h1>
                      )
                    ) : null}
                    {type === "yearly" ? (
                      linkedMonthly != "" ? (
                        <>
                          <h1>
                            <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                              ●{" "}
                            </span>
                            {linkedMonthly}{" "}
                          </h1>
                        </>
                      ) : (
                        <h1>
                          <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                            ●{" "}
                          </span>
                          No Monthlies Linked
                        </h1>
                      )
                    ) : null}
                    {type != "monthly" && type != "yearly" ? (
                      linkedMonthly ? (
                        <>
                          <h1>
                            <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                              ●{" "}
                            </span>
                            {linkedMonthly.goal}
                          </h1>
                        </>
                      ) : (
                        <h1>
                          <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                            ●{" "}
                          </span>{" "}
                          No Monthlies Linked
                        </h1>
                      )
                    ) : null}
                    {type != "yearly" ? (
                      linkedYearly ? (
                        <h1>
                          <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                            ●{" "}
                          </span>
                          {linkedYearly.goal}
                        </h1>
                      ) : (
                        <h1>
                          <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                            ●{" "}
                          </span>
                          No Yearlies Linked
                        </h1>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {iterationValue.map((goalType) => {
            let linkedDaily, linkedWeekly, linkedMonthly, linkedYearly;

            if (type === "daily") {
              linkedWeekly = userData.weeklies.find(
                (w) => w.uuid === goalType.weeklyUuid
              );
              linkedMonthly = userData.monthlies.find(
                (m) => m.uuid === goalType.monthlyUuid
              );
              linkedYearly = userData.yearlies.find(
                (y) => y.uuid === goalType.yearlyUuid
              );
            } else if (type === "weekly") {
              linkedDaily = goalType.dailies.map((connectedDailies, index) => (
                <React.Fragment key={connectedDailies.uuid || index}>
                  {connectedDailies.goal}
                  <br />
                </React.Fragment>
              ));
              linkedMonthly = userData.monthlies.find(
                (m) => m.uuid === goalType.monthlyUuid
              );
              linkedYearly = userData.yearlies.find(
                (y) => y.uuid === goalType.yearlyUuid
              );
            } else if (type === "monthly") {
              linkedDaily = goalType.dailies.map((connectedDailies, index) => (
                <React.Fragment key={connectedDailies.uuid || index}>
                  {connectedDailies.goal}
                  <br />
                </React.Fragment>
              ));
              linkedWeekly = goalType.weeklies.map(
                (connectedDailies, index) => (
                  <React.Fragment key={connectedDailies.uuid || index}>
                    {connectedDailies.goal}
                    <br />
                  </React.Fragment>
                )
              );
              linkedYearly = userData.yearlies.find(
                (y) => y.uuid === goalType.yearlyUuid
              );
            } else if (type === "yearly") {
              linkedDaily = goalType.dailies.map((connectedDailies, index) => (
                <React.Fragment key={connectedDailies.uuid || index}>
                  {connectedDailies.goal}
                  <br />
                </React.Fragment>
              ));
              linkedWeekly = goalType.weeklies.map(
                (connectedDailies, index) => (
                  <React.Fragment key={connectedDailies.uuid || index}>
                    {connectedDailies.goal}
                    <br />
                  </React.Fragment>
                )
              );
              linkedMonthly = goalType.monthlies.map(
                (connectedDailies, index) => (
                  <React.Fragment key={connectedDailies.uuid || index}>
                    {connectedDailies.goal}
                    <br />
                  </React.Fragment>
                )
              );
            }
            return (
              <div
                key={goalType.uuid}
                className="flex rounded-lg flex-shrink-0 has-[input:checked]:border-0 has-[input:checked]:shadow-[0_0_9px_4px_rgba(255,255,255,0.8)]  p-5 bg-[#181818] items-start border-b-2 overflow-x-auto overflow-y-visible font-bold h-30 space-x-10 w-full border-b-white"
              >
                {goal ? (
                  <div className="flex-shrink-0 flex-col space-y-3 w-full group items-center justify-center  flex">
                    <label className="flex items-center space-x-3 cursor-pointer select-none group">
                      <div className="relative w-7 h-7 flex-shrink-0">
                        <input
                          defaultChecked={goalType.checked ? "checked" : ""}
                          type="checkbox"
                          className="absolute inset-0 appearance-none rounded-md border-2 border-gray-400 checked:border-[#f5f5f5] checked:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] checked:bg-black transition-all duration-500 cursor-pointer"
                          onChange={(e) => {
                            handleChecked(e, goalType.id);
                            goalType.progress = 100;
                          }}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute w-4 h-4 text-white opacity-0 group-has-[input:checked]:opacity-100 transition-opacity duration-300 top-1.5 left-1.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>

                      <h1 className=" font-bold text-white transition-all duration-300 group-has-[input:checked]:line-through group-has-[input:checked]:text-gray-400">
                        {goalType.goal}
                      </h1>
                    </label>
                    {type != "daily" ? (
                      <div className="w-full  px-4">
                        <div className="w-full  bg-[#2a2a2a] rounded-full h-3 overflow-hidden shadow-inner relative">
                          <div
                            className={`h-full bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.6)] transition-all duration-700 ease-in-out `}
                            style={{
                              width: `${
                                goalType.progress > 100
                                  ? 100
                                  : goalType.progress
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-300 mt-2 w-full text-center">
                          {goalType.progress > 100 ? 100 : goalType.progress}%
                          Complete
                        </div>
                      </div>
                    ) : null}
                    <div
                      className={`flex justify-between  space-x-5 p-2 w-full ${
                        type === "daily" ? "mt-6" : "mt-2"
                      }`}
                    >
                      {type != "yearly" ? (
                        <h1 className=" group-has-[input:checked]:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] font-black text-xs text-center ">
                          {progressText}: {goalType[progressKey] ?? 0}%
                        </h1>
                      ) : null}
                      {/* <h1 className=" group-has-[input:checked]:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] font-black text-xs text-center ">
                        {progressText}: {goalType[progressKey] ?? 0}%
                      </h1> */}
                      <h1
                        className={`text-xs group-has-[input:checked]:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] font-black mx-auto text-center `}
                      >
                        Points: {goalType.points}
                      </h1>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setEditId(goalType.id),
                            console.log("Editing goal with ID:", goalType.id),
                            setFormIsOpen(true);
                        }}
                        className="!h-12 cursor-pointer next-button"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ) : linked ? (
                  <div className="flex-shrink-0 w-full mt-0 overflow-y-auto">
                    <div className="flex flex-col font-bold space-y-4">
                      {type != "daily" ? (
                        linkedDaily != "" ? (
                          <>
                            {" "}
                            <h1>
                              <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                                ●{" "}
                              </span>
                              {linkedDaily}{" "}
                            </h1>
                          </>
                        ) : (
                          <>
                            <h1>
                              <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                                ●{" "}
                              </span>
                              No Dailies Linked{" "}
                            </h1>
                          </>
                        )
                      ) : (
                        ""
                      )}

                      {type === "monthly" || type === "yearly" ? (
                        linkedWeekly != "" ? (
                          <>
                            {" "}
                            <h1>
                              <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                                ●{" "}
                              </span>
                              {linkedWeekly}
                            </h1>{" "}
                          </>
                        ) : (
                          <h1>
                            <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                              ●{" "}
                            </span>
                            No Weeklies Linked
                          </h1>
                        )
                      ) : linkedWeekly ? (
                        <h1>
                          <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                            ●{" "}
                          </span>
                          {linkedWeekly.goal}
                        </h1>
                      ) : (
                        <h1>
                          <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                            ●{" "}
                          </span>
                          No Weeklies Linked
                        </h1>
                      )}

                      {type === "yearly" ? (
                        linkedMonthly != "" ? (
                          <>
                            <h1>
                              <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                                ●{" "}
                              </span>
                              {linkedMonthly}{" "}
                            </h1>
                          </>
                        ) : (
                          <h1>
                            <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                              ●{" "}
                            </span>
                            No Monthlies Linked
                          </h1>
                        )
                      ) : linkedMonthly ? (
                        <>
                          <h1>
                            <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                              ●{" "}
                            </span>
                            {linkedMonthly.goal}
                          </h1>
                        </>
                      ) : (
                        <h1>
                          <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                            ●{" "}
                          </span>{" "}
                          No Monthlies Linked
                        </h1>
                      )}

                      {type != "yearly" ? (
                        linkedYearly ? (
                          <h1>
                            <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                              ●{" "}
                            </span>
                            {linkedYearly.goal}
                          </h1>
                        ) : (
                          <h1>
                            <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] rounded-full">
                              ●{" "}
                            </span>
                            No Yearlies Linked
                          </h1>
                        )
                      ) : null}
                    </div>
                  </div>
                ) : progression ? (
                  <div className="flex-shrink-0 mt-[3%] w-full">
                    <h1 className="font-bold text-lg text-center ">
                      {progressText}:{" "}
                      <span className="drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] font-black ">
                        {" "}
                        {goalType[progressKey] ?? 0}%
                      </span>
                    </h1>
                  </div>
                ) : point ? (
                  <div className="flex-shrink-0  justify-center text-center w-full"></div>
                ) : null}
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

export default GoalsData;
