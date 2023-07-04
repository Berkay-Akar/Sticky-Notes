const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/cart", (req, res) => {
  db.query("SELECT * FROM notes WHERE isCarted = 1 b RETURNING *")
    .then((result) => {
      const carts = result.rows;
      res.json(carts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error (router.get)" });
    });
});

// router.route("/cart/:id").post(async (req, res) => {
//   const { description } = req.body;
//   db.query(
//     "INSERT INTO cart (description) WHERE id=$1 VALUES ($1) RETURNING *",
//     [description]
//   )
//     .then((result) => {
//       console.log(result.rows);
//       const newCart = result.rows[0];
//       res.json(newCart);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "Server Error (route.post)" });
//     });
// });

router.route("/cart/:id").delete((req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM cart WHERE id = $1", [id])
    .then(() => {
      res.json("Note Deleted Successfully!");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error Delete Todo" });
    });
});

module.exports = router;
