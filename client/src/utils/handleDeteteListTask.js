import { apiFetch } from "./api";

export const handleDeteteListTask = async ({ type, id, fetchUserData }) => {
  try {
    console.log(id, type);
    const response = await apiFetch(`/delete/${type}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // for cookies/session if using passport
      body: JSON.stringify({ id }),
    });

    fetchUserData();
  } catch (error) {
    console.error("Delete error:", error);
    alert("An error occurred");
  }
};
