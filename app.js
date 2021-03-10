const { request } = require("express");
const express = require("express");
const students = require("./students");

const app = express();
app.use(express.json());
const port = 3000;

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/api/students", (req, res) => {
  res.json(students);
});

app.post("/api/students", (req, res) => {
  if (!req.body.email) {
    res.status(400);
    return res.json({ error: "email id required" });
  }
  let user = {
    id: students.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  };

  students.push(user);
  res.json(user);
});

app.put("/api/students/:id", (req, res) => {
  let id = req.params.id;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;

  let index = students.findIndex((student) => {
    return (student.id == Number.parseInt(id));
  });

  if (index >= 0) {
    let std = students[index];
    std.first_name = first_name;
    std.last_name = last_name;
    std.email = email;
    res.json(std);
  } else {
    res.status(404);
    res.end()
  }
});

app.delete("/api/students/:id", (req, res)=>{
    let id=req.params.id;
    let index = students.findIndex((student) => {
        return (student.id == Number.parseInt(id));
      });

      if (index >= 0) {
          let std=students[index]
         students.splice(index, 1)
         res.json(std)
      } else {
        res.status(404);
      }
});