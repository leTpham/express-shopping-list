"use strict";

const express = require("express");
const app = express();
const itemsRoutes = require("./itemsRoutes");

const { NotFoundError } = require("./expressError");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// apply /users prefix to every route in itemsRoutes
app.use("/items", itemsRoutes);


/** 404 handler: matches unmatched routes. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});
// end


module.exports = app;