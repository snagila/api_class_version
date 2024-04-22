import express from "express";
import { idGenerator } from "../utils.js";
import {
  deleteTask,
  getTasks,
  insertTask,
  updateTask,
} from "../models/task/TaskModel.js";
const router = express.Router();

let fakeDb = [];

//controllers

//get data
router.get("/", async (req, res) => {
  // db query to get the data
  const tasks = await getTasks();
  console.log(Object.keys(tasks));
  res.json({
    message: "Here are the tasks",
    tasks: tasks,
  });
});

//Post data
router.post("/", async (req, res) => {
  try {
    const result = await insertTask(req.body);
    result?._id
      ? res.json({
          message: "New task has been added",
        })
      : res.json({
          message: "Failed to add new data",
        });
  } catch (error) {
    console.log(error);
  }
  // const id = idGenerator()
  // fakeDb.push({ ...req.body, id });
});

//update task
router.patch("/", async (req, res) => {
  const { _id, type } = req.body;
  const result = await updateTask(req.body);
  console.log(result);
  try {
    result?._id
      ? res.json({
          messaeg: "Your task has been updated",
        })
      : res.json({
          messaeg: "Your task has been updated",
        });
  } catch (error) {
    res.status(500).json({
      messaeg: "Failed to update data",
    });
  }
});
//delete task
router.delete("/", async (req, res) => {
  const { _id } = req.body;
  const result = await deleteTask(_id);
  try {
    result?.id
      ? res.json({
          messaeg: " Your task has been deleted",
        })
      : res.json({
          messaeg: "Failed to delete data",
        });
  } catch (error) {
    res.json({
      messaeg: "Error",
    });
  }
});

export default router;
