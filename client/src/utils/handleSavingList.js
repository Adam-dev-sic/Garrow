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
          weekly: (task.linkedTo && JSON.parse(task.linkedTo).weekly) || "",
          monthly: (task.linkedTo && JSON.parse(task.linkedTo).monthly) || "",
          yearly: (task.linkedTo && JSON.parse(task.linkedTo).yearly) || "",
        },
        linkedProgress: task.linkedProgress || 0,
        points: task.points || 0,
        type: task.type || type,
      };

      const response = await fetch("http://localhost:5000/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(`✅ Re-added task: ${task.goal}`);
      } else {
        console.warn(`❌ Failed to re-add ${task.goal}:`, data.error);
        // alert(data.message);
      }
    }
  } catch (error) {
    console.error("❌ Error in handleSavingList:", error);
  }
};
