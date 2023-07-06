const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/cart", (req, res) => {
  db.query(
    "SELECT c.cart_id, n.id, n.description, n.color FROM cart c LEFT JOIN notes n ON c.note_id = n.id WHERE c.cart_id = 1"
  )
    .then((result) => {
      const carts = result.rows;
      res.json(carts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error (router.get)" });
    });
});

router.route("/cart/:noteId").post(async (req, res) => {
  const { noteId } = req.params;
  db.query(
    "INSERT INTO cart (note_id) " +
      "SELECT id " +
      "FROM notes WHERE id = $1 " +
      "RETURNING *",
    [noteId]
  )
    .then((result) => {
      console.log("Added To Cart");
      console.log(result.rows);
      const newCart = result.rows[0];
      res.json(newCart);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error (route.post)" });
    });
});

router.delete("/cart/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM cart WHERE note_id = $1", [id])
    .then(() => {
      res.json("Note Deleted Successfully!");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error Delete Note" });
    });
});

module.exports = router;
