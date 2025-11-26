const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Import Routers
const adminRouter = require("./laith/routes/admin");
const userRouter = require("./mohammed/routes/user");

// Routes Middleware
app.use("/admin", adminRouter);
app.use("/user", userRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));
app.listen(PORT, async () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
