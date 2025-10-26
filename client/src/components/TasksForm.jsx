import React, { useEffect, useState } from "react";
import Linked from "./Linked";
import { useUserStore } from "../store/useUserStore";

function TasksForm({
  goal,
  point,
  linked,
  type,
  progression,
  setGoal,
  setLinked,
  setProgression,
  setPoints,
  isMobile,
  setFormIsOpen,
}) {
  const [taskData, setTaskData] = useState({});

  const { userData,fetchUserData } = useUserStore();
  const [formGoal, setFormGoal] = useState("");
  const [formLinksIds, setFormLinksIds] = useState({
    weekly: "",
    monthly: "",
    yearly: "",
  });
  const [formLinkedPoints, setFormLinkedPoints] = useState("");
  const [formPoints, setFormPoints] = useState("");
  useEffect(() => {
    setTaskData({
      id: userData.id,
      goal: formGoal,
      linked: formLinksIds,
      linkedProgress: formLinkedPoints,
      points: formPoints,
      type: type,
    });
  }, [userData.id, formGoal, formLinksIds, formLinkedPoints, formPoints, type]);
  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Task Added");
        setFormIsOpen(false);
        fetchUserData()
      } else {
        alert(data.message || "Registration failed");
      }

      if (!response) alert("error happend");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form
      action=""
      onSubmit={handleSubmission}
      className="items-center justify-center"
    >
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
        {type !="yearly" &&(
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
        </h1>)}
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
              value={formGoal} // controlled input
              onChange={(e) => setFormGoal(e.target.value)}
            />
            <button
              onClick={() => {
                setGoal(false);
                setLinked(true);
                setPoints(false);
              }}
              type=""
              className="next-button w-30 mt-5 h-10 !rounded-full"
            >
              Next
            </button>
          </div>
        ) : linked ? (
          
          <div className="flex flex-col items-center justify-center mt-10 space-y-2">
            <Linked
              type={type}
              setFormLinksIds={setFormLinksIds}
              formLinksIds={formLinksIds}
              formLinkedPoints={formLinkedPoints}
              setFormLinkedPoints={setFormLinkedPoints}
            />
            <button
              onClick={() => {
                setGoal(false);
                setLinked(false);
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
              name="points"
              className="bg-gradient-to-r from-[#dcdcdc] via-[#f5f5f5] to-[#a0a0a0] w-30 text-black font-semibold h-12 text-lg text-center rounded-full p-3 z-50 focus:bg-[#251f19] lg:w-1/2"
              value={formPoints} // controlled input
              onChange={(e) => setFormPoints(e.target.value)}
            />
            <button
              type="submit"
              className="next-button w-30 mt-5 h-12 !rounded-full"
            >
              Submit
            </button>
          </div>
        ) : (
          ""
        )
      ) : goal ? (
        <div className="flex flex-col items-center justify-center mt-10 space-y-2">
          <label htmlFor="goal">
            <h1 className="text-lg">Write Down Your Goal</h1>
          </label>
          <input
            type="text"
            name="goal"
            className="bg-gradient-to-r from-white via-[#a8a8a8] text-black to-[#282727] h-12 text-lg w-full rounded-lg p-3 z-50 focus:bg-[#251f19] lg:w-1/2"
          />
        </div>
      ) : linked ? (
        <div className="flex flex-col items-center justify-center mt-10 space-y-2">
          <label htmlFor="">
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
          <label htmlFor="points">
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
  );
}

export default TasksForm;
