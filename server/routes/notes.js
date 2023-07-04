const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/notes", (req, res) => {
  console.log(req.body);
  db.query("SELECT * FROM notes")
    .then((result) => {
      const notes = result.rows;
      res.json(notes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error (router.get)" });
    });
});

router.route("/notes").post(async (req, res) => {
  const { description, color } = req.body;
  console.log(description);
  db.query("INSERT INTO notes (description,color) VALUES ($1,$2) RETURNING *", [
    description,
    color,
  ])
    .then((result) => {
      console.log(result.rows);
      const newNote = result.rows[0];
      res.json(newNote);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error (router.post)" });
    });
});

router.route("/notes/:id").post(async (req, res) => {
  const { id } = req.params;
  db.query("UPDATE notes SET isCarted= B'1' WHERE id = $1 RETURNING *", [id])
    .then((result) => {
      const addedNote = result.rows[0];
      res.json(addedNote);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error Update Todo" });
    });
});

router.route("/notes/:id").delete((req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM notes WHERE id = $1", [id])
    .then((result) => {
      console.log(result.rows);
      res.json("Note Deleted Successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error (router.delete)" });
    });
});

router.route("/notes/:id").put((req, res) => {
  const { description, id } = req.body;
  db.query("UPDATE notes SET description = $1 WHERE id = $2 RETURNING *", [
    description,
    id,
  ])
    .then((result) => {
      const updatedTodo = result.rows[0];
      res.json(updatedTodo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error Update Note" });
    });
});

module.exports = router;
