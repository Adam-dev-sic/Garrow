import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useMediaQuery } from "react-responsive";
import Linked from "./Linked";

export default function Daily({ dailyOpen, setDailyOpen }) {
  const [goal, setGoal] = useState(true);
  const [linked, setLinked] = useState(false);
  const [progression, setProgression] = useState(false);
  const [point, setPoints] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [type, setType] = useState("daily");
  const { userData, fetchUserData, triggerRefetch, isLoading } = useUserStore();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Form inputs
  const [formGoal, setFormGoal] = useState("");
  const [formLinksIds, setFormLinksIds] = useState({
    weekly: "",
    monthly: "",
    yearly: "",
  });
  const [formLinkedPoints, setFormLinkedPoints] = useState("");
  const [formPoints, setFormPoints] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div
      className="flex flex-col w-full space-y-10 min-h-2/3 
     max-h-4/5 overflow-y-auto overflow-x-auto bg-[#020201] border-2 border-white rounded-2xl text-white absolute p-5 lg:w-[70%] lg:min-h-[80%] animate-expand-vertically"
    >
      <div className="flex w-full text-center justify-between">
        <button
          onClick={() => setFormIsOpen(!formIsOpen)}
          className="task-button h-12 lg:!w-35"
        >
          {!formIsOpen ? <h1>New Goals</h1> : <h1>Your Goals</h1>}
        </button>
        <button
          onClick={() => setDailyOpen(!dailyOpen)}
          className="task-button h-12 lg:!w-35"
        >
          Close
        </button>
      </div>

      {!formIsOpen ? (
        <>
          <div className="flex justify-between overflow-x-auto h-15 space-x-10 w-full border-b-2 border-b-white">
            <h1
              onClick={() => {
                setGoal(true);
                setLinked(false);
                setProgression(false);
                setPoints(false);
              }}
              className={`min-w-[33.33%] flex-shrink-0 text-lg ${
                goal ? "underline !text-2xl lg:!no-underline lg:!text-lg" : ""
              }`}
            >
              Goal
            </h1>
            <h1
              onClick={() => {
                setGoal(false);
                setLinked(true);
                setProgression(false);
                setPoints(false);
              }}
              className={`min-w-[33.33%] flex-shrink-0 text-lg ${
                linked ? "underline !text-2xl lg:!no-underline lg:!text-lg" : ""
              }`}
            >
              Linked with
            </h1>
            <h1
              onClick={() => {
                setGoal(false);
                setLinked(false);
                setProgression(true);
                setPoints(false);
              }}
              className={`min-w-[33.33%] flex-shrink-0 text-lg ${
                progression
                  ? "underline !text-2xl lg:!no-underline lg:!text-lg"
                  : ""
              }`}
            >
              Progression W
            </h1>
            <h1
              onClick={() => {
                setGoal(false);
                setLinked(false);
                setProgression(false);
                setPoints(true);
              }}
              className={`min-w-[33.33%] flex-shrink-0 text-lg ${
                point ? "underline !text-2xl lg:!no-underline lg:!text-lg" : ""
              }`}
            >
              Points
            </h1>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center">
              Fetching Data...
            </div>
          ) : !isMobile ? (
            <>
              {userData.dailies.map((daily) => {
                const linkedWeekly = userData.weeklies.find(
                  (w) => w.id === daily.weeklyId
                );
                const linkedMonthly = userData.monthlies.find(
                  (w) => w.id === daily.monthlyId
                );
                const linkedYearly = userData.yearlies.find(
                  (w) => w.id === daily.yearlyId
                );

                return (
                  <div
                    key={daily.id}
                    className="flex rounded-lg p-5 bg-[#181818] items-start overflow-x-auto overflow-y-visible font-bold h-30 space-x-10 w-full border-b-white"
                  >
                    <div className="flex-shrink-0 mt-[2.5%] w-[33.33%]">
                      <h1>{daily.goal}</h1>
                    </div>
                    <div className="flex-shrink-0 w-[33.33%] mt-0 overflow-y-auto">
                      <h1>
                        {linkedWeekly ? linkedWeekly.goal : "No weekly linked"}
                        <br />
                        {linkedMonthly
                          ? linkedMonthly.goal
                          : "No monthly linked"}
                        <br />
                        {linkedYearly ? linkedYearly.goal : "No yearly linked"}
                      </h1>
                    </div>
                    <div className="flex-shrink-0 mt-[2.5%] w-[33.33%]">
                      <h1>Weekly progress will be: {daily.weeklyProgress}%</h1>
                    </div>
                    <div className="flex-shrink-0 mt-[2.5%] w-[33.33%]">
                      <h1>Points: {daily.points}</h1>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {userData.dailies.map((daily) => {
                const linkedWeekly = userData.weeklies.find(
                  (w) => w.id === daily.weeklyId
                );
                const linkedMonthly = userData.monthlies.find(
                  (w) => w.id === daily.monthlyId
                );
                const linkedYearly = userData.yearlies.find(
                  (w) => w.id === daily.yearlyId
                );

                return (
                  <div
                    key={daily.id}
                    className="flex rounded-lg p-5 bg-[#181818] items-start overflow-x-auto overflow-y-visible font-bold h-30 space-x-10 w-full border-b-white"
                  >
                    {goal ? (
                      <div className="flex-shrink-0 mt-[3%] w-full">
                        <h1>{daily.goal}</h1>
                      </div>
                    ) : linked ? (
                      <div className="flex-shrink-0 w-full mt-0 overflow-y-auto">
                        <h1>
                          {linkedWeekly
                            ? linkedWeekly.goal
                            : "No weekly linked"}
                          <br />
                          {linkedMonthly
                            ? linkedMonthly.goal
                            : "No monthly linked"}
                          <br />
                          {linkedYearly
                            ? linkedYearly.goal
                            : "No yearly linked"}
                        </h1>
                      </div>
                    ) : progression ? (
                      <div className="flex-shrink-0 mt-[3%] w-full">
                        <h1>
                          Weekly progress will be: {daily.weeklyProgress}%
                        </h1>
                      </div>
                    ) : point ? (
                      <div className="flex-shrink-0 mt-[3%] w-full">
                        <h1>Points: {daily.points}</h1>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </>
          )}
        </>
      ) : (
        <form action="" className="items-center justify-center">
          <div className="flex justify-between overflow-x-auto h-15 space-x-10 w-full border-b-2 border-b-white">
            <h1
              onClick={() => {
                setGoal(true);
                setLinked(false);
                setProgression(false);
                setPoints(false);
              }}
              className={`w-[25%] flex-shrink-0 text-lg ${
                goal ? "underline !text-2xl lg:!no-underline lg:!text-lg" : ""
              }`}
            >
              Goal
            </h1>
            <h1
              onClick={() => {
                setGoal(false);
                setLinked(true);
                setProgression(false);
                setPoints(false);
              }}
              className={`w-[25%] flex-shrink-0 text-lg ${
                linked ? "underline !text-2xl lg:!no-underline lg:!text-lg" : ""
              }`}
            >
              Linked with
            </h1>
            {/* <h1
              onClick={() => {
                setGoal(false);
                setLinked(false);
                setProgression(true);
                setPoints(false);
              }}
              className={`w-[33.33%] flex-shrink-0 text-lg ${
                progression
                  ? "underline !text-2xl lg:!no-underline lg:!text-lg"
                  : ""
              }`}
            >
              Progression W
            </h1> */}
            <h1
              onClick={() => {
                setGoal(false);
                setLinked(false);
                setProgression(false);
                setPoints(true);
              }}
              className={`w-[25%] flex-shrink-0 text-lg ${
                point ? "underline !text-2xl lg:!no-underline lg:!text-lg" : ""
              }`}
            >
              Points
            </h1>
          </div>
          {isMobile ? (
            goal ? (
              <div className="flex flex-col items-center justify-center mt-25 space-y-2">
                <label htmlFor="Goal">
                  <h1 className="text-lg">Write Down Your Goal</h1>
                </label>
                <input
                  type="text"
                  className="bg-gradient-to-r from-white via-[#a8a8a8] text-black to-[#282727] h-12 text-lg w-full rounded-2xl p-3 z-50 focus:bg-[#251f19] lg:w-1/2"
                />
                <button
                  onClick={() => {
                    setGoal(false);
                    setLinked(true);
                    setProgression(false);
                    setPoints(false);
                  }}
                  className="next-button w-30 mt-5 h-10 !rounded-full"
                >
                  Next
                </button>
              </div>
            ) : linked ? (
              <div className="flex flex-col items-center justify-center mt-10 space-y-2">
                <Linked type={type} />
                <button
                  onClick={() => {
                    setGoal(false);
                    setLinked(false);
                    setProgression(false);
                    setPoints(true);
                  }}
                  className="next-button w-30 mt-5 h-10 !rounded-full"
                >
                  Next
                </button>
              </div>
            ) : point ? (
              <div className="flex flex-col items-center justify-center mt-25 space-y-2">
                <label htmlFor="Goal">
                  <h1 className="text-lg">Points reward</h1>
                </label>
                <input
                  type="text"
                  className="bg-gradient-to-r from-[#dcdcdc] via-[#f5f5f5] to-[#a0a0a0] w-30 text-black font-semibold h-12 text-lg text-center rounded-full p-3 z-50 focus:bg-[#251f19] lg:w-1/2"
                />
                <button
                  onClick={() => {
                    setGoal(false);
                    setLinked(true);
                    setProgression(false);
                    setPoints(false);
                  }}
                  className="next-button w-30 mt-5 h-10 !rounded-full"
                >
                  Submit
                </button>
              </div>
            ) : (
              ""
            )
          ) : goal ? (
            <div className="flex flex-col items-center justify-center mt-10 space-y-2">
              <label htmlFor="Goal">
                <h1 className="text-lg">Write Down Your Goal</h1>
              </label>
              <input
                type="text"
                className="bg-gradient-to-r from-white via-[#a8a8a8] text-black to-[#282727] h-12 text-lg w-full rounded-lg p-3 z-50 focus:bg-[#251f19] lg:w-1/2"
              />
            </div>
          ) : linked ? (
            <div className="flex flex-col items-center justify-center mt-10 space-y-2">
              <label htmlFor="Goal">
                <h1 className="text-lg">Is it linked?</h1>
              </label>
              <input
                type="text"
                className="bg-gradient-to-r from-white via-[#a8a8a8] text-black to-[#282727] h-12 text-lg w-full rounded-lg p-3 z-50 focus:bg-[#251f19]"
              />
            </div>
          ) : progression ? (
            <div className="flex flex-col items-center justify-center mt-10 space-y-2">
              <label htmlFor="Goal">
                <h1 className="text-lg">Progression towards Week Month Year</h1>
              </label>
              <input
                type="text"
                className="bg-gradient-to-r from-white via-[#a8a8a8] text-black to-[#282727] h-12 text-lg w-full rounded-lg p-3 z-50 focus:bg-[#251f19]"
              />
            </div>
          ) : point ? (
            <div className="flex flex-col items-center justify-center mt-10 space-y-2">
              <label htmlFor="Goal">
                <h1 className="text-lg">How many dsasdapoints as a reward?</h1>
              </label>
              <input
                type="text"
                className="bg-gradient-to-r from-white via-[#a8a8a8] text-black to-[#282727] h-12 text-lg w-full rounded-lg p-3 z-50 focus:bg-[#251f19]"
              />
            </div>
          ) : (
            <div>
              <h1>Click one of the sections andsfdasfdafsda get started</h1>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
