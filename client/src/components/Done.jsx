import React, { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { useTodaysPoints } from "../store/useTodaysPoints";

function Done({ type }) {
  const { userData, triggerRefetch } = useUserStore();
  const { setTodays } = useTodaysPoints();

  const progressKey =
    type === "daily"
      ? "weeklyProgress"
      : type === "weekly"
      ? "monthlyProgress"
      : type === "monthly"
      ? "yearlyProgress"
      : "";
  const progressId =
    type === "daily"
      ? "weeklyId"
      : type === "weekly"
      ? "monthlyId"
      : type === "monthly"
      ? "yearlyId"
      : "";
  const handleCheckedTasks = async (userId, id, points, progress, typeId) => {
    const response = await fetch(`http://localhost:5000/done/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, id, points, progress, typeId }),
    });
    const data = await response.json();
    if (response.ok) {
      triggerRefetch();
      setTodays(points);
    } else {
      alert(data.message || "Operation failed");
    }

    if (!response) alert("error happened");
  };
  const dataType =
    type === "daily"
      ? "dailies"
      : type === "weekly"
      ? "weeklies"
      : type === "monthly"
      ? "monthlies"
      : "yearlies";
  const dataUser = userData[dataType] || [];

  function submitDone() {
    for (let i = 0; i < dataUser.length; i++) {
      if (dataUser[i].checked === true) {
        handleCheckedTasks(
          userData.id,
          dataUser[i].id,
          dataUser[i].points,
          dataUser[i][progressKey],
          dataUser[i][progressId]
        );
      }
    }
  }

  return (
    <button
      onClick={() => submitDone()}
      className={`task-button !bg-gradient-to-r !from-[#dcdcdc] !via-[#f5f5f5] !to-[#a0a0a0]  h-14  lg:!w-35 ${
        dataUser.some((task) => task.checked) ? "" : "hidden"
      }`}
      //   disabled={!userData.dataType.some((task) => task.checked)}
    >
      Done
    </button>
  );
}

export default Done;
