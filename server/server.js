const express = require("express");
const cors = require("cors");
const notesRoutes = require("./routes/notes");
const cartRoutes = require("./routes/cart");

const app = express();
const PORT = 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use("/", notesRoutes);
app.use("/", cartRoutes);
app.all("*", (req, res) => {
  res.status(404).json({});
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Something went wrong.";
  res.status(status).json({});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
