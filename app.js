import express from "express";
import connectDB from "./db/connectdb.js";
import web from "./routes/web.js";
const app = express();
const port = process.env.PORT || "8000";
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";
import ProjectModel from "./models/Projects.js";

// Database Connection
connectDB(DATABASE_URL);
async function run() {
  try {
    const project = await ProjectModel.create({
      id: 2,
      title: "Charsadda NGOs",
      description: "Road Development",
      team: [
        {
          name: "Usman Khan",
          photo:
            "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
        },
        {
          name: "Umar Ayub",
          photo:
            "https://images.unsplash.com/photo-1618827840222-fcf8f42509c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2062&q=80",
        },
        {
          name: "Ali Ahmad",
          photo:
            "https://images.unsplash.com/photo-1558392204-ac78741f4abf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        },
      ],
      progress: 100,
      createdAt: "Mar 17 2017",
      tasks: 37,
      status: "completed",
    });
  } catch (error) {}
}

// JSON
app.use(express.json());

// Load Routes
app.use("/api", web);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// run();
