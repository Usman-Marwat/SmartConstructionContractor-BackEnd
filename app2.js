const express = require("express");
const categories = require("./routes/categories");
const listings = require("./routes/listings");
const listing = require("./routes/listing");
const users = require("./routes/users");
const user = require("./routes/user");
const auth = require("./routes/auth");
const my = require("./routes/my");
const messages = require("./routes/messages");
const projects = require("./routes/projects");
const members = require("./routes/members");
const tasks = require("./routes/tasks");
const taskDetails = require("./routes/taskDetails");
const expoPushTokens = require("./routes/expoPushTokens");
const helmet = require("helmet");
const compression = require("compression");
const config = require("config");
const mongoose = require("mongoose");
const app = express();

const dbURI =
  "mongodb+srv://usman:12345@cluster0.cp523.mongodb.net/fyp-0?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    const port = process.env.PORT || config.get("port");
    app.listen(port, function () {
      console.log(`Server started on port ${port}...`);
    });
  })
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(compression());

app.use("/api/categories", categories);
app.use("/api/listing", listing);
app.use("/api/listings", listings);
app.use("/api/user", user);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/my", my);
app.use("/api/expoPushTokens", expoPushTokens);
app.use("/api/messages", messages);
app.use("/api/projects", projects);
app.use("/api/members", members);
app.use("/api/tasks", tasks);
app.use("/api/taskDetails", taskDetails);
