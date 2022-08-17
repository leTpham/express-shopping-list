/** Routes for sample app. */

const express = require("express");

const items = require("./fakeDb");
const router = new express.Router();

const { NotFoundError } = require("./expressError");

/** GET /items: get list of items */
router.get("/", function (req, res) {
  return res.json(items);
});

/** POST /items: accepts JSON data and create a new item */
router.post("/", function (req, res) {
  items.items.push(req.body);

  return res.
    status(201).
    json({"added": req.body});

});

/** GET /items/:name, returns the item of specified name*/
router.get("/:name", function (req, res) {
  let nameItem;

  for (let item of items.items) {
    if (item.name === req.params.name) {
      nameItem = item;
    }
  }

  if (!nameItem) {
    throw new NotFoundError("No such item found!");
  }

  return res.json(nameItem);
});



/** DELETE /items/[id]: delete user, return {message: Deleted} */
router.delete("/:id", function (req, res) {
  db.User.delete(req.params.id);
  return res.json({ message: "Deleted" });
});

module.exports = router;
