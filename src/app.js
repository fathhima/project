const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user added successfully...");
  } catch (err) {
    res.status(400).send("error saving the user" + err.message);
  }
});

// get user by email

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// get user by findOne if it has duplicates

app.get("/userone", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const userone = await User.findOne({ emailId: userEmail });
    if (!userone) {
      res.status(404).send("user not found");
    } else {
      res.send(userone);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// feed API - get all users

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// delete a user by Id

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(400).send("user not found");
    } else {
      res.send("user deleted ");
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data);
    if (!user) {
      res.status(400).send("user not found");
    } else {
      res.send("user updated successfully");
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection Established");
    app.listen(5000, () => {
      console.log("server is listening on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be Connected!!!");
  });
