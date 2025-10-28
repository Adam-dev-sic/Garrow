import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useMediaQuery } from "react-responsive";
import Linked from "./Linked";
import TasksForm from "./TasksForm";
import GoalsData from "./GoalsData";
import { Link } from "react-router-dom";
import Done from "./Done";

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

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div
      className="flex flex-col w-full space-y-10 min-h-2/3 
      max-h-4/5 overflow-y-auto overflow-x-auto bg-[#020201] border-2 border-white rounded-2xl text-white absolute p-5 lg:w-[70%] lg:min-h-[80%] animate-expand-vertically"
    >
      <div className="relative flex w-full space-x-3 text-center justify-between">
        <button
          onClick={() => setFormIsOpen(!formIsOpen)}
          className="task-button  h-14 lg:!w-35"
        >
          {!formIsOpen ? <h1>New Goals</h1> : <h1>Your Goals</h1>}
        </button>
     <Done type={type} />
        <button
          onClick={() => setDailyOpen(!dailyOpen)}
          className="task-button h-14  lg:!w-35"
        >
          Close
        </button>
      </div>

      {!formIsOpen ? (
        <>
          <div className="flex flex-shrink-0 justify-between overflow-x-auto h-15 space-x-10 w-full border-b-2 border-b-white">
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

          {userData ? (
            <>
              <GoalsData
                isLoading={isLoading}
                userData={userData}
                isMobile={isMobile}
                goal={goal}
                progression={progression}
                point={point}
                linked={linked}
                type={type}
              />
            </>
          ) : (
            <div className="flex items-center justify-center w-full">
              <h1>
                You must{" "}
                <span className="font-black drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] underline">
                  <Link to={"/auth"}>Login</Link>
                </span>{" "}
                first
              </h1>
            </div>
          )}
        </>
      ) : userData ? (
        <TasksForm
          setFormIsOpen={setFormIsOpen}
          goal={goal}
          point={point}
          linked={linked}
          progression={progression}
          type={type}
          isMobile={isMobile}
          setGoal={setGoal}
          setLinked={setLinked}
          setProgression={setProgression}
          setPoints={setPoints}
        />
      ) : (
        <h1 className="items-center justify-center w-full">
          {" "}
          You must login first
        </h1>
      )}
    </div>
  );
}
