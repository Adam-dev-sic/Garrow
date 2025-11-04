import { useUserStore } from "../store/useUserStore";

export const handleLoadingList = async ({
  userData,
  type,
  listId,
  fetchUserData,
}) => {
  //   const iterationKey =
  //     type === "daily"
  //       ? "dailies"
  //       : type === "weekly"
  //       ? "weeklies"
  //       : type === "monthly"
  //       ? "monthlies"
  //       : "yearlies";
  //   const { fetchUserData } = useUserStore();
  if (listId === "") {
    alert("Select a list first");
  }
  const iterationValue = userData.savedtaskslist.find(
    (e) => e.id === Number(listId)
  );
  console.log(iterationValue, listId);

  try {
    console.log("✅ userData:", userData);

    if (iterationValue.savedtasks.length === 0) {
      alert("You have no completed tasks to load");
      return;
    }

    for (const task of iterationValue.savedtasks) {
      if (type != task.type) continue;

      const sendData = {
        id: userData.id,
        goal: task.goal,
        uuid: task.uuid,
        linked: {
          weekly: (task.linkedTo && JSON.parse(task.linkedTo).weekly) || "",
          monthly: (task.linkedTo && JSON.parse(task.linkedTo).monthly) || "",
          yearly: (task.linkedTo && JSON.parse(task.linkedTo).yearly) || "",
        },
        linkedProgress: task.linkedProgress || 0,
        points: task.points || 0,
        type: task.type,
      };

      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(`✅ Re-added task: ${task.goal}`);
      } else {
        console.warn(`❌ Failed to re-add ${task.goal}:`, data.error);
        alert(data.message);
      }
    }
    await fetchUserData();
  } catch (error) {
    console.error("❌ Error in handleSavingList:", error);
  }
};
