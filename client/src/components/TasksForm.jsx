import React, { useEffect, useState } from "react";
import Linked from "./Linked";
import { useUserStore } from "../store/useUserStore";
import { use } from "react";

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
  editId,
  setEditId,
}) {
  const [taskData, setTaskData] = useState({});
  const { userData, fetchUserData } = useUserStore();
  const [formGoal, setFormGoal] = useState("");
  const [formLinksIds, setFormLinksIds] = useState({
    weekly: "",
    monthly: "",
    yearly: "",
  });
  const [formLinkedPoints, setFormLinkedPoints] = useState("");
  const [formPoints, setFormPoints] = useState("");
  const [formProgress, setFormProgress] = useState("");

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

  useEffect(() => {
    if (editId) {
      const itemToEdit = iterationValue.find((item) => item.id === editId);
      if (itemToEdit) {
        setFormGoal(itemToEdit.goal || "");
        setFormPoints(itemToEdit.points || "");
        if (type !== "yearly") {
          setFormLinksIds({
            weekly: itemToEdit.weeklyId || "",
            monthly: itemToEdit.monthlyId || "",
            yearly: itemToEdit.yearlyId || "",
          });
          setFormLinkedPoints(itemToEdit[progressKey] || "");
          setFormProgress(itemToEdit.progress || "");
        }
      }
    } else {
      // Reset form fields when not editing
      setFormGoal("");
      setFormPoints("");
      setFormLinksIds({
        weekly: "",
        monthly: "",
        yearly: "",
      });
      setFormLinkedPoints("");
      setFormProgress("");
    }
  }, [editId, iterationValue, type, progressKey]);
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
        fetchUserData();
      } else {
        alert(data.message || "Registration failed");
      }

      if (!response) alert("error happend");
    } catch (error) {
      alert(error);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/delete/${type}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editId }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Task Deleted");
        setFormIsOpen(false);
        fetchUserData();
      } else {
        alert(data.message || "Delete failed");
      }

      if (!response) alert("error happend");
    } catch (error) {
      alert(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/edit/${type}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...taskData, editId, formProgress }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Task Edited");
        setFormIsOpen(false);
        fetchUserData();
      } else {
        alert(data.message || "Edit failed");
      }

      if (!response) alert("error happend");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form
      action=""
      onSubmit={editId ? handleEdit : handleSubmission}
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
        {type != "yearly" && (
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
        )}
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
              {editId ? "Edit Goal" : "Submit Goal"}
            </button>
          </div>
        ) : (
          ""
        )
      ) : (
        <div className="flex justify-between space-x-10 mt-10 p-10">
          <div className="w-[40%] space-y-8 flex flex-col items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center mt-10 space-y-2">
              <label htmlFor="goal">
                <h1 className="text-lg">Write Down Your Goal</h1>
              </label>
              <input
                type="text"
                name="goal"
                value={formGoal} // controlled input
                onChange={(e) => setFormGoal(e.target.value)}
                // className="bg-gradient-to-r from-white via-[#f2f2f2] to-[#d9d9d9] text-black w-[85%] h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#f7f7f7]"
                // className="bg-gradient-to-r from-white via-white to-[#f0f0f0] text-black w-[85%] h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#fafafa]"
                // className="bg-gradient-to-r from-white via-[#f2f2f2] to-[#d9d9d9] text-black w-[85%] h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#f7f7f7]"
                className="bg-gradient-to-r from-white mini-animation via-[#ebebeb] to-[#bdbdbd] text-black w-[85%] h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#f5f5f5]"
                // className="bg-gradient-to-r from-[#ffffff] via-[#f7f7f7] to-[#e2e2e2] text-black w-[85%] h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#f8f8f8]"

                // className="bg-gradient-to-r from-white via-[#a8a8a8] text-black to-[#282727] h-12 text-lg w-full rounded-lg p-3 z-50 focus:bg-[#251f19] w-full"
              />
              {/*
               */}
            </div>
            <div className="w-full flex ">
              {editId ? (
                <div className="flex space-x-6 w-full items-center justify-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <label htmlFor="points">
                      <h1 className="text-lg">Change Progress Bar %</h1>
                    </label>
                    <input
                      type="text"
                      // className="bg-gradient-to-r from-[#f5f5f5] via-[#cfcfcf] to-[#9b9b9b] text-black w-50 h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#dcdcdc]"
                      className="bg-gradient-to-r mini-animation rounded-full from-white via-[#d8d8d8] to-[#a0a0a0] text-black max-w-35 h-12 text-lg  p-3 z-50 focus:bg-[#e6e6e6]"
                      // className="bg-gradient-to-r from-[#d9d9d9] via-[#a6a6a6] to-[#6e6e6e] text-white w-50 h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#8c8c8c]"
                      // className="bg-gradient-to-r from-white via-[#f2f2f2] to-[#d9d9d9] text-black w-50 h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#f7f7f7]"
                      value={formProgress} // controlled input
                      onChange={(e) => setFormProgress(e.target.value)}
                      // className="bg-gradient-to-r from-white via-[#a8a8a8] text-black to-[#282727] w-50 h-12 text-lg  rounded-lg p-3 z-50 focus:bg-[#251f19]"
                    />
                  </div>
                </div>
              ) : null}
              <div className="flex space-x-6 w-full items-center justify-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <label htmlFor="points">
                    <h1 className="text-lg">Points reward</h1>
                  </label>
                  <input
                    type="text"
                    // className="bg-gradient-to-r from-[#f5f5f5] via-[#cfcfcf] to-[#9b9b9b] text-black w-50 h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#dcdcdc]"
                    className="bg-gradient-to-r mini-animation from-white via-[#d8d8d8] to-[#a0a0a0] text-black max-w-35 h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#e6e6e6]"
                    // className="bg-gradient-to-r from-[#d9d9d9] via-[#a6a6a6] to-[#6e6e6e] text-white w-50 h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#8c8c8c]"
                    // className="bg-gradient-to-r from-white via-[#f2f2f2] to-[#d9d9d9] text-black w-50 h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#f7f7f7]"
                    value={formPoints} // controlled input
                    onChange={(e) => setFormPoints(e.target.value)}
                    // className="bg-gradient-to-r from-white via-[#a8a8a8] text-black to-[#282727] w-50 h-12 text-lg  rounded-lg p-3 z-50 focus:bg-[#251f19]"
                  />
                </div>
              </div>
            </div>

            <button className="next-button">
              {" "}
              {editId ? "Edit Goal" : "Submit Goal"}
            </button>

            {editId && (
              <button className="delete-button" onClick={handleDelete}>
                Delete Task
              </button>
            )}
          </div>
          <div className="flex flex-col w-[45%] items-center justify-center mt-10 space-y-2">
            <Linked
              type={type}
              setFormLinksIds={setFormLinksIds}
              formLinksIds={formLinksIds}
              formLinkedPoints={formLinkedPoints}
              setFormLinkedPoints={setFormLinkedPoints}
            />
          </div>
        </div>
      )}
    </form>
  );
}

export default TasksForm;
