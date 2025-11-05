import React, { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { useTodaysPoints } from "../store/useTodaysPoints";
import { apiFetch } from "../utils/api";

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
      ? "weeklyUuid"
      : type === "weekly"
      ? "monthlyUuid"
      : type === "monthly"
      ? "yearlyUuid"
      : "";
  const handleCheckedTasks = async (
    userId,
    id,
    points,
    progress,
    typeId,
    uuid
  ) => {
    try {
      const response = await apiFetch(`done/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // for cookies/session if using passport

        body: JSON.stringify({ userId, id, points, progress, typeId, uuid }),
      });

      triggerRefetch();
      setTodays(points);
    } catch (error) {
      alert("Error occured: ", error);
    }
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
          dataUser[i][progressId],
          dataUser[i].uuid
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
