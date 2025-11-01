import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const addTask = async (req, res) => {
  try {
    const { id, goal, linked, linkedProgress, points, type } = req.body;
    if (!id || !goal || !points)
      res.status(400).json({
        message: "An error happend, Please fill all the informations",
      });

    const model = prisma[type]; // e.g., prisma.daily or prisma.weekly

    if (!model) {
      return res.status(400).json({ message: "Invalid model type." });
    }
    const data = {
      goal,
      points: Number(points) || 0,
      user: { connect: { id } },
    };

    if (type === "daily") {
      data.weeklyProgress = Number(linkedProgress) || 0;
      if (linked?.weekly)
        data.weekly = { connect: { id: Number(linked.weekly) } };
      if (linked?.monthly)
        data.monthly = { connect: { id: Number(linked.monthly) } };
      if (linked?.yearly)
        data.yearly = { connect: { id: Number(linked.yearly) } };
    }
    if (type === "weekly") {
      data.monthlyProgress = Number(linkedProgress) || 0;

      if (linked?.monthly)
        data.monthly = { connect: { id: Number(linked.monthly) } };
      if (linked?.yearly)
        data.yearly = { connect: { id: Number(linked.yearly) } };
    }

    if (type === "monthly") {
      data.yearlyProgress = Number(linkedProgress) || 0;

      if (linked?.yearly)
        data.yearly = { connect: { id: Number(linked.yearly) } };
    }
    const newTask = await model.create({ data });

    res.status(201).json({
      message: `${type} goal created successfully`,
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const checkGoal = async (req, res) => {
  try {
    const { type } = req.params;
    const { goalId, isChecked } = req.body;

    if (typeof isChecked !== "boolean" || !goalId) {
      return res.status(400).json({ message: "Invalid input data." });
    }

    const model = prisma[type]; // e.g., prisma.daily or prisma.weekly

    if (!model) {
      return res.status(400).json({ message: "Invalid model type." });
    }
    const goal = await model.findUnique({
      where: { id: Number(goalId) },
    });

    if (!goal) {
      return res.status(404).json({ message: "Daily goal not found." });
    }

    const updatedGoal = await model.update({
      where: { id: Number(goalId) },
      data: {
        checked: isChecked,
        ...(type !== "daily" && {
          progress: isChecked ? 100 : goal.progressBeforeCheck ?? goal.progress,
          progressBeforeCheck: isChecked ? goal.progress : null,
        }),
      },
    });

    res.status(200).json({
      message: "Daily goal status updated successfully.",
      goal: updatedGoal,
    });
  } catch (error) {
    console.error("Error updating daily goal status:", error);
    res.status(500).json({ error: "Failed to update daily goal status." });
  }
};

export const editTasks = async (req, res) => {
  try {
    const { type } = req.params;
    const { id, goal, linked, linkedProgress, points, editId, formProgress } =
      req.body;

    if (!id || !goal || !points)
      return res.status(400).json({
        message: "An error happened, Please fill all the informations",
      });

    const model = prisma[type]; // e.g., prisma.daily or prisma.weekly
    if (!model) {
      return res.status(400).json({ message: "Invalid model type." });
    }

    const data = {
      goal,
      points: Number(points) || 0,
    };
    if (type != "daily") {
      data.progress = Number(formProgress) || 0;
    }
    const weeklyLinked = linked?.weekly && linked.weekly !== "none";
    const monthlyLinked = linked?.monthly && linked.monthly !== "none";
    const yearlyLinked = linked?.yearly && linked.yearly !== "none";
    if (type === "daily") {
      data.weekly = weeklyLinked
        ? { connect: { id: Number(linked.weekly) } }
        : { disconnect: true };
      data.weeklyProgress = weeklyLinked ? Number(linkedProgress) : 0;

      data.monthly = monthlyLinked
        ? { connect: { id: Number(linked.monthly) } }
        : { disconnect: true };

      data.yearly = yearlyLinked
        ? { connect: { id: Number(linked.yearly) } }
        : { disconnect: true };
    }
    if (type === "weekly") {
      data.monthlyProgress = monthlyLinked ? Number(linkedProgress) : 0;

      data.monthly = monthlyLinked
        ? { connect: { id: Number(linked.monthly) } }
        : { disconnect: true };

      data.yearly = yearlyLinked
        ? { connect: { id: Number(linked.yearly) } }
        : { disconnect: true };
    }

    if (type === "monthly") {
      data.yearlyProgress = yearlyLinked ? Number(linkedProgress) : 0;

      data.yearly = yearlyLinked
        ? { connect: { id: Number(linked.yearly) } }
        : { disconnect: true };
    }

    const updatedTask = await model.update({
      where: { id: Number(editId) },
      data,
    });

    res.status(200).json({
      message: `${type} goal updated successfully`,
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const removeDoneTasks = async (req, res) => {
  try {
    const { type } = req.params;
    const { userId, id, points, progress, typeId } = req.body;

    console.log("Incoming:", { type, userId, id, points, progress });

    const model = prisma[type];
    console.log("Model resolved:", !!model);

    if (!model) {
      return res.status(400).json({ message: "Invalid model type." });
    }

    console.log("➡️ Updating user points...");
    await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        totalpoints: { increment: Number(points) || 0 },
      },
    });
    console.log("✅ User updated.");

    // Progress logic
    const nextModel =
      type === "daily"
        ? prisma.weekly
        : type === "weekly"
        ? prisma.monthly
        : type === "monthly"
        ? prisma.yearly
        : null;
    if (progress) {
      console.log(`➡️ Updating progress: Progress to increment: ${progress}`);
      if (typeId) {
        await nextModel.update({
          where: { id: Number(typeId) },
          data: {
            progress: { increment: Number(progress) || 0 },
          },
        });
        console.log("✅ Progress updated.");
      }
    }
    console.log("➡️ Deleting goal...");
    await model.delete({
      where: { id: Number(id) },
    });
    console.log("✅ Goal deleted.");

    res
      .status(200)
      .json({ message: "Task completed and removed successfully." });
  } catch (error) {
    console.error("❌ Error removing completed task:");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    res
      .status(500)
      .json({ error: error.message || "Failed to remove completed task." });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const { type } = req.params;
    const { editId } = req.body;

    if (!editId)
      return res.status(400).json({
        message: "An error happened, Please provide the task id",
      });
    const model = prisma[type]; // e.g., prisma.daily or prisma.weekly
    if (!model) {
      return res.status(400).json({ message: "Invalid model type." });
    }

    await model.delete({
      where: { id: Number(editId) },
    });

    res.status(200).json({
      message: `${type} goal deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

export const editTask = async (req, res) => {};
