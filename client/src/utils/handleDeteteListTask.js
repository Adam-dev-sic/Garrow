export const handleDeteteListTask = async ({ type, id ,fetchUserData}) => {
  try {
    console.log(id, type);
    const response = await fetch(`http://localhost:5000/delete/${type}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Task Deleted");

      fetchUserData();
    } else {
      alert(data.message || "Delete failed");
    }
  } catch (error) {
    console.error("Delete error:", error);
    alert("An error occurred");
  }
};
