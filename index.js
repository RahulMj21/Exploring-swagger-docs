require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const fileupload = require("express-fileupload");

const courses = [
  {
    id: "course_01",
    name: "Frontend Developer",
    price: "500",
  },
  {
    id: "course_02",
    name: "Backend Developer",
    price: "500",
  },
  {
    id: "course_03",
    name: "Dev Oops",
    price: "500",
  },
];

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileupload());

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to our Swagger Project 🚀🚀</h1>");
});
app.get("/api/v1/smilyweb", (req, res) => {
  res.status(200).send("welcome to smilyweb");
});
app.get("/api/v1/smilywebobject", (req, res) => {
  res
    .status(200)
    .send({ id: "course_01", name: "Pro node.js developer", price: "500" });
});
app.get("/api/v1/smilywebarray", (req, res) => {
  res.status(200).send(courses);
});
app.get("/api/v1/courses/:course_id", (req, res) => {
  const course = courses.find((item) => item.id === req.params.course_id);
  res.status(200).send(course);
});
app.post("/api/v1/create_course", (req, res) => {
  courses.push(req.body);
  res.status(200).json(req.body);
});
app.get("/api/v1/searchqueryex", (req, res) => {
  const location = req.query.location;
  const device = req.query.device;
  res.status(200).send({ location, device });
});
app.post("/api/v1/uploadimage", (req, res) => {
  console.log(req.headers);
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpg";

  file.mv(path, (err) => {
    res.send(true);
  });
});

app.listen(PORT, () =>
  console.log("Your server is running on PORT " + PORT + "...")
);
