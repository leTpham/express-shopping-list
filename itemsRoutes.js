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

/** PATCH /items/:name accepts JSON body, modify them, return it */
router.patch("/:name", function (req, res) {
  let updateItem;

  for (let item of items.items) {
    if (item.name === req.params.name) {
      item.name = req.body.name || item.name;
      item.price = req.body.price || item.price;
      updateItem = item;
    }
  }

  if (!updateItem) {
    throw new NotFoundError("No such item found!");
  }

  return res
          .status(200)
          .json({"updated": updateItem})
})


/** DELETE /items/[id]: delete user, return {message: Deleted} */
router.delete("/:name", function (req, res) {
  let deleteItem;
  for (let i = 0; i < items.items.length; i++) {
    if (items.items[i].name === req.params.name) {
      deleteItem = items.items[i];
      items.items.splice(i, 1);
    }
  }

  if (!deleteItem) {
    throw new NotFoundError("No such item found!");
  }

  return res.json({ message: "Deleted" });
});

module.exports = router;
