import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

export const addTask = async (req, res) => {
  try {
    const { id, goal, linked, linkedProgress, points, type, uuid, tasktype } =
      req.body;

    if (!id || !goal || !points) {
      return res.status(400).json({
        message: "An error happend, Please fill all the informations",
      });
    }
    const numericPoints = Number(points);

    if (isNaN(numericPoints)) {
      return res.status(400).json({ message: "Points must be a valid number" });
    }
    if (numericPoints < 0) {
      return res.status(400).json({ message: "Points cannot be negative" });
    }
      const model = prisma[type];
    if (!model) return res.status(400).json({ message: "Invalid model type." });

    const data = {
      goal,
      points: Number(points) || 0,
      user: { connect: { id: id } }, // ✅ switched to uuid
    };
    if (uuid) {
      data.uuid = uuid;
    }
    // if (tasktype && tasktype === type) {
    //   data.type = type;
    // }
    if (type === "daily") {
      data.weeklyProgress = Number(linkedProgress) || 0;
      if (linked?.weekly) data.weekly = { connect: { uuid: linked.weekly } }; // ✅
      if (linked?.monthly) data.monthly = { connect: { uuid: linked.monthly } };
      if (linked?.yearly) data.yearly = { connect: { uuid: linked.yearly } };
    }

    if (type === "weekly") {
      data.monthlyProgress = Number(linkedProgress) || 0;
      if (linked?.monthly) data.monthly = { connect: { uuid: linked.monthly } };
      if (linked?.yearly) data.yearly = { connect: { uuid: linked.yearly } };
    }

    if (type === "monthly") {
      data.yearlyProgress = Number(linkedProgress) || 0;
      if (linked?.yearly) data.yearly = { connect: { uuid: linked.yearly } };
    }

    const newTask = await model.create({ data });
    res.status(201).json({
      message: `${type} goal created successfully`,
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);

    // ✅ Prisma unique constraint error handler
    if (error.code === "P2002" && error.meta?.target?.includes("uuid")) {
      return res.status(400).json({
        message: "This Task already exists. Please try again.",
      });
    }

    res.status(500).json({ error: "Failed to create task" });
  }
};

export const checkGoal = async (req, res) => {
  try {
    const { type } = req.params;
    const { goalId, isChecked } = req.body;

    if (typeof isChecked !== "boolean" || !goalId)
      return res.status(400).json({ message: "Invalid input data." });

    const model = prisma[type];
    if (!model) return res.status(400).json({ message: "Invalid model type." });

    const goal = await model.findUnique({
      where: { id: goalId }, // ✅ uuid instead of id
    });
    if (!goal) return res.status(404).json({ message: "Goal not found." });

    const updatedGoal = await model.update({
      where: { id: goalId }, // ✅
      data: {
        checked: isChecked,
        ...(type !== "daily" && {
          progress: isChecked ? 100 : goal.progressBeforeCheck ?? goal.progress,
          progressBeforeCheck: isChecked ? goal.progress : null,
        }),
      },
    });

    res.status(200).json({
      message: "Goal status updated successfully.",
      goal: updatedGoal,
    });
  } catch (error) {
    console.error("Error updating goal:", error);
    res.status(500).json({ error: "Failed to update goal status." });
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

    const model = prisma[type];
    if (!model) return res.status(400).json({ message: "Invalid model type." });

    const data = { goal, points: Number(points) || 0 };
    if (type !== "daily") data.progress = Number(formProgress) || 0;

    const weeklyLinked = linked?.weekly && linked.weekly !== "none";
    const monthlyLinked = linked?.monthly && linked.monthly !== "none";
    const yearlyLinked = linked?.yearly && linked.yearly !== "none";

    if (type === "daily") {
      data.weekly = weeklyLinked
        ? { connect: { uuid: linked.weekly } }
        : { disconnect: true };
      data.weeklyProgress = weeklyLinked ? Number(linkedProgress) : 0;

      data.monthly = monthlyLinked
        ? { connect: { uuid: linked.monthly } }
        : { disconnect: true };

      data.yearly = yearlyLinked
        ? { connect: { uuid: linked.yearly } }
        : { disconnect: true };
    }

    if (type === "weekly") {
      data.monthlyProgress = monthlyLinked ? Number(linkedProgress) : 0;

      data.monthly = monthlyLinked
        ? { connect: { uuid: linked.monthly } }
        : { disconnect: true };

      data.yearly = yearlyLinked
        ? { connect: { uuid: linked.yearly } }
        : { disconnect: true };
    }

    if (type === "monthly") {
      data.yearlyProgress = yearlyLinked ? Number(linkedProgress) : 0;

      data.yearly = yearlyLinked
        ? { connect: { uuid: linked.yearly } }
        : { disconnect: true };
    }

    const updatedTask = await model.update({
      where: { id: editId }, // ✅
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
    const { userId, id, points, progress, tasktype, typeId, uuid } = req.body;

    const model = prisma[type];
    if (!model) return res.status(400).json({ message: "Invalid model type." });

    const goal = await model.findUnique({ where: { id: id } }); // ✅
    if (!goal) return res.status(404).json({ message: "Task not found." });

    const oldGoal = await prisma.doneTask.findFirst({
      where: { OR: [{ uuid: uuid }, { goal: goal.goal }] },
    });
    if (!oldGoal) {
      await prisma.doneTask.create({
        data: {
          user: { connect: { id: userId } }, // ✅
          type,
          uuid,
          goal: goal.goal,
          points: goal.points,
          progress: goal.progress ?? 100,
          linkedTo: JSON.stringify({
            weekly: goal.weeklyUuid,
            monthly: goal.monthlyUuid,
            yearly: goal.yearlyUuid,
          }),
          linkedProgress: progress || 0,
        },
      });
    } else {
      console.log("🧩 oldGoal found:", oldGoal);
      await prisma.doneTask.update({
        where: { id: oldGoal.id || undefined, uuid: oldGoal.uuid || undefined },
        data: {
          timescompleted: { increment: 1 },
        },
      });
    }

    await prisma.user.update({
      where: { id: userId }, // ✅
      data: {
        totalpoints: { increment: Number(points) || 0 },
      },
    });

    const nextModel =
      type === "daily"
        ? prisma.weekly
        : type === "weekly"
        ? prisma.monthly
        : type === "monthly"
        ? prisma.yearly
        : null;

    if (progress && typeId && nextModel) {
      await nextModel.update({
        where: { uuid: typeId }, // ✅
        data: {
          progress: { increment: Number(progress) || 0 },
        },
      });
    }

    await model.delete({ where: { id: id } }); // ✅

    res
      .status(200)
      .json({ message: "Task completed and removed successfully." });
  } catch (error) {
    console.error("❌ Error removing completed task:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to remove completed task." });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const { type } = req.params;
    const { editId, id } = req.body;

    if (!editId && !id)
      return res
        .status(400)
        .json({ message: "An error happened, Please provide the task id" });

    const model = prisma[type];
    if (!model) return res.status(400).json({ message: "Invalid model type." });
    if (!id) {
      await model.delete({ where: { id: editId } });
    } // ✅}
    else {
      await prisma.savedTasks.delete({ where: { id: id } });
    }

    res.status(200).json({
      message: `${type} goal deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
export const saveTask = async (req, res) => {
  try {
    const { id, goal, uuid, linked, linkedProgress, points, type, list } =
      req.body;

    if (!id || !goal || !uuid || !type) {
      return res
        .status(400)
        .json({ message: "Missing required fields (id, goal, uuid, type)" });
    }

    const savedTaskList = await prisma.savedTaskList.findFirst({
      where: {
        id: list, // daily / weekly / monthly / yearly
      },
    });

    if (!savedTaskList) {
      return res.status(404).json({
        message: `No saved task list found for type: ${list}`,
      });
    }

    const existingTask = await prisma.savedTasks.findUnique({
      where: { uuid },
      include: { savedtasks: true },
    });

    // ✅ If the task exists
    if (existingTask) {
      // If it already belongs to this list, just skip
      const alreadyLinked = existingTask.savedtasks.some((l) => l.id === list);
      if (alreadyLinked) {
        return res.status(200).json({
          message: "Task already saved in this list",
          task: existingTask,
        });
      }

      // Otherwise, move/update it to the new list
      const updatedTask = await prisma.savedTasks.update({
        where: { uuid },
        data: {
          savedtasks: {
            connect: { id: list },
          },
        },
      });

      return res.status(200).json({
        message: "Task moved to the new list",
        task: updatedTask,
      });
    }
    const newTask = await prisma.savedTasks.create({
      data: {
        uuid,
        type,
        goal,
        points: Number(points) || 0,
        linkedTo: linked ? JSON.stringify(linked) : null,
        linkedProgress: linkedProgress || 0,
        savedtasks: {
          connect: { id: list }, // ← multiple lists
        },
      },
    });

    return res.status(201).json({
      message: "Task successfully saved",
      task: newTask,
    });
  } catch (err) {
    console.error("❌ Error saving task:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
