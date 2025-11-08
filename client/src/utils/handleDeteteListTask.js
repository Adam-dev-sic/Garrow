import { toast } from "react-toastify";
import { apiFetch } from "./api";

export const handleDeteteListTask = async ({ type, id, fetchUserData }) => {
  try {
    console.log(id, type);
    const response = await apiFetch(`/api/tasks/delete/${type}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // for cookies/session if using passport
      body: JSON.stringify({ id }),
    });
     toast.info("Task Deleted!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
    fetchUserData();
  } catch (error) {
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

    console.error("Delete error:", error);
  }
};
