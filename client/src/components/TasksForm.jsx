// src/components/TasksForm.jsx
import React, { useEffect, useState } from "react";
import Linked from "./Linked";
import { useUserStore } from "../store/useUserStore";
import { apiFetch } from "../utils/api";

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
    weekly: "", // will store weekly UUID
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
          // Use the exact Prisma field names returned by the backend
          setFormLinksIds({
            weekly: itemToEdit.weeklyUuid || "",
            monthly: itemToEdit.monthlyUuid || "",
            yearly: itemToEdit.yearlyUuid || "",
          });
          setFormLinkedPoints(itemToEdit[progressKey] ?? "");
          setFormProgress(itemToEdit.progress ?? "");
        }
      }
    } else {
      setFormGoal("");
      setFormPoints("");
      setFormLinksIds({ weekly: "", monthly: "", yearly: "" });
      setFormLinkedPoints("");
      setFormProgress("");
    }
  }, [editId, iterationValue, type, progressKey]);

  useEffect(() => {
    setTaskData({
      id: userData.id,
      goal: formGoal,
      // send uuid strings to backend as linked values
      linked: {
        weekly: formLinksIds.weekly,
        monthly: formLinksIds.monthly,
        yearly: formLinksIds.yearly,
      },
      linkedProgress: formLinkedPoints,
      points: formPoints,
      type: type,
    });
  }, [
    userData.id,
    formGoal,
    formLinksIds.weekly,
    formLinksIds.monthly,
    formLinksIds.yearly,
    formLinkedPoints,
    formPoints,
    type,
  ]);

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
        setLinked(false);
        setGoal(true);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await apiFetch(`/delete/${type}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editId }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Task Deleted");
        setFormIsOpen(false);
        fetchUserData();
        setLinked(false);
        setGoal(true);
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred");
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0]; // "YYYY-MM-DD"
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiFetch(`/edit/${type}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...taskData, editId, formProgress }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Task Edited");
        setFormIsOpen(false);
        fetchUserData();
        setLinked(false);
        setGoal(true);
      } else {
        alert(data.message || "Edit failed");
      }
    } catch (error) {
      console.error("Edit error:", error);
      alert("An error occurred");
    }
  };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate());
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2); // FIXED: subtract 2

  const [selectedDate, setSelectedDate] = useState("");
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const handleAddedTasks = async (date) => {
    try {
      console.log("🧩 Running handleAddedTasks with:", date);
      console.log("✅ userData:", userData);
      const doneTasks = userData.tasksdone || [];

      if (doneTasks.length === 0) {
        console.warn("⚠️ No tasksdone found in userData");
        alert("You have no completed tasks to restore");
        return;
      }

      const restoreDate = formatDate(date);
      if (!restoreDate) {
        alert("Invalid date selected");
        return;
      }

      for (const task of doneTasks) {
        if (!task.completedAt) continue;

        const taskCompletedAt = formatDate(task.completedAt);
        console.log("Comparing:", taskCompletedAt, "vs", restoreDate);

        if (taskCompletedAt === restoreDate) {
          console.log("✅ Match found for:", task.goal);

          const sendData = {
            id: userData.id,
            goal: task.goal,
            uuid: task.uuid,
            linked: {
              // Expecting doneTask.linkedTo to be JSON (strings of UUIDs) — parse safely
              weekly: (task.linkedTo && JSON.parse(task.linkedTo).weekly) || "",
              monthly:
                (task.linkedTo && JSON.parse(task.linkedTo).monthly) || "",
              yearly: (task.linkedTo && JSON.parse(task.linkedTo).yearly) || "",
            },
            linkedProgress: task.linkedProgress || 0,
            points: task.points || 0,
            type: task.type || type,
          };

          const response = await apiFetch(`/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sendData),
          });

          const data = await response.json();
          if (response.ok) {
            console.log(`✅ Re-added task: ${task.goal}`);
            setFormIsOpen(false);
          } else {
            console.warn(`❌ Failed to re-add ${task.goal}:`, data.error);
            alert(data.message);
          }
        } else {
          console.log("No match for:", task.goal);
        }
      }

      fetchUserData();
    } catch (err) {
      console.error("Error re-adding tasks:", err);
      alert("An error occurred while restoring tasks");
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
          className={`w-[40%] text-center flex-shrink-0 text-lg ${
            goal ? "underline !text-2xl lg:!no-underline lg:!text-lg" : ""
          }`}
        >
          Goal
        </h1>
        {type !== "yearly" && (
          <h1
            onClick={() => {
              setGoal(false);
              setLinked(true);
              setProgression(false);
              setPoints(false);
            }}
            className={`w-[40%] text-center flex-shrink-0 text-lg ${
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
            setProgression(false);
            setPoints(true);
          }}
          className={`w-[25%] flex-shrink-0 text-lg ${
            point ? "underline !text-2xl lg:!no-underline lg:!text-lg" : ""
          }`}
        >
          Points
        </h1> */}
      </div>

      <div />
      {isMobile ? (
        <>
          {!linked ? (
            <>
              <div className="flex justify-between space-x-10 mt-10 p-10">
                <div
                  className={`w-[100%] space-y-8 flex flex-col items-center justify-center ${
                    type === "yearly" ? "!w-[100%] px-50" : ""
                  }`}
                >
                  <div className="flex w-full flex-col items-center justify-center mt-10 space-y-2">
                    <label htmlFor="goal">
                      <h1 className="text-lg">Write Down Your Goal</h1>
                    </label>
                    <input
                      type="text"
                      name="goal"
                      value={formGoal}
                      onChange={(e) => setFormGoal(e.target.value)}
                      className="bg-gradient-to-r from-white mini-animation via-[#ebebeb] to-[#bdbdbd] text-black w-[85%] h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#f5f5f5]"
                    />
                  </div>

                  {/* Points / Progress inputs and submit */}
                  <div className="w-full items-center justify-center space-x-2.5 flex ">
                    {editId ? (
                      <div className="flex space-x-6 w-full items-center justify-center">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <label htmlFor="points">
                            <h1 className="text-lg">Progress Bar %</h1>
                          </label>
                          <input
                            type="text"
                            value={formProgress}
                            onChange={(e) => setFormProgress(e.target.value)}
                            className="bg-gradient-to-r mini-animation rounded-full from-white via-[#d8d8d8] to-[#a0a0a0] text-black max-w-35 h-12 text-lg  p-3 z-50 focus:bg-[#e6e6e6]"
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
                          value={formPoints}
                          onChange={(e) => setFormPoints(e.target.value)}
                          className="bg-gradient-to-r mini-animation from-white via-[#d8d8d8] to-[#a0a0a0] text-black max-w-35 h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#e6e6e6]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setGoal(false), setLinked(true);
                    }}
                    className="next-button"
                  >
                    Next
                  </button>

                  {editId && (
                    <button className="delete-button" onClick={handleDelete}>
                      Delete Task
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {type !== "yearly" && (
                <div className="flex flex-col w-[100%] items-center justify-center mt-10 space-y-2">
                  <Linked
                    type={type}
                    setFormLinksIds={(newLinks) =>
                      setFormLinksIds((s) => ({ ...s, ...newLinks }))
                    }
                    formLinksIds={formLinksIds}
                    formLinkedPoints={formLinkedPoints}
                    setFormLinkedPoints={setFormLinkedPoints}
                  />
                  <button className="next-button" type="submit">
                    {editId ? "Edit Goal" : "Submit Goal"}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="flex justify-between space-x-10 mt-10 p-10">
          <div
            className={`w-[40%] space-y-8 flex flex-col items-center justify-center ${
              type === "yearly" ? "!w-[100%] px-50" : ""
            }`}
          >
            <div className="flex w-full flex-col items-center justify-center mt-10 space-y-2">
              <label htmlFor="goal">
                <h1 className="text-lg">Write Down Your Goal</h1>
              </label>
              <input
                type="text"
                name="goal"
                value={formGoal}
                onChange={(e) => setFormGoal(e.target.value)}
                className="bg-gradient-to-r from-white mini-animation via-[#ebebeb] to-[#bdbdbd] text-black w-[85%] h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#f5f5f5]"
              />
            </div>

            {/* Points / Progress inputs and submit */}
            <div className="w-full flex ">
              {editId ? (
                <div className="flex space-x-6 w-full items-center justify-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <label htmlFor="points">
                      <h1 className="text-lg">Change Progress Bar %</h1>
                    </label>
                    <input
                      type="text"
                      value={formProgress}
                      onChange={(e) => setFormProgress(e.target.value)}
                      className="bg-gradient-to-r mini-animation rounded-full from-white via-[#d8d8d8] to-[#a0a0a0] text-black max-w-35 h-12 text-lg  p-3 z-50 focus:bg-[#e6e6e6]"
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
                    value={formPoints}
                    onChange={(e) => setFormPoints(e.target.value)}
                    className="bg-gradient-to-r mini-animation from-white via-[#d8d8d8] to-[#a0a0a0] text-black max-w-35 h-12 text-lg rounded-lg p-3 z-50 focus:bg-[#e6e6e6]"
                  />
                </div>
              </div>
            </div>

            <button className="next-button" type="submit">
              {editId ? "Edit Goal" : "Submit Goal"}
            </button>

            {editId && (
              <button className="delete-button" onClick={handleDelete}>
                Delete Task
              </button>
            )}
          </div>

          {type !== "yearly" && (
            <div className="flex flex-col w-[45%] items-center justify-center mt-10 space-y-2">
              <Linked
                type={type}
                setFormLinksIds={(newLinks) =>
                  setFormLinksIds((s) => ({ ...s, ...newLinks }))
                }
                formLinksIds={formLinksIds}
                formLinkedPoints={formLinkedPoints}
                setFormLinkedPoints={setFormLinkedPoints}
              />
            </div>
          )}
        </div>
      )}
    </form>
  );
}

export default TasksForm;
