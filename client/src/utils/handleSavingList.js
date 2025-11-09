import { toast } from "react-toastify";
import { apiFetch } from "./api";

export const handleSavingList = async ({ e, userData, type, listId }) => {
  e.preventDefault();
  const iterationKey =
    type === "daily"
      ? "dailies"
      : type === "weekly"
      ? "weeklies"
      : type === "monthly"
      ? "monthlies"
      : "yearlies";
  const progressKey =
    type === "daily"
      ? "weeklyProgress"
      : type === "weekly"
      ? "monthlyProgress"
      : type === "monthly"
      ? "yearlyProgress"
      : "";
  console.log(listId);
  const iterationValue = userData[iterationKey] || [];

  try {
    console.log("✅ userData:", userData);

    if (iterationValue.length === 0) {
      alert("You have tasks to store");
      return;
    }

    for (const task of iterationValue) {
      const sendData = {
        id: userData.id,
        goal: task.goal,
        uuid: task.uuid,
        list: listId,
        linked: {
          weekly: task.weeklyUuid || "",
          monthly: task.monthlyUuid || "",
          yearly: task.yearlyUuid || "",
        },
        linkedProgress: task[progressKey] || 0,
        points: task.points || 0,
        type: task.type || type,
      };

      const response = await apiFetch("/api/tasks/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // for cookies/session if using passport
        body: JSON.stringify(sendData),
      });

      console.log(`✅ Re-added task: ${task.goal}`);
    }
    toast.success("List Saved ", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } catch (error) {
    console.error("❌ Error in handleSavingList:", error);
    toast.error(`Error happend", ${error}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }
};
