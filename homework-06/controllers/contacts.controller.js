// homework-06/controllers/contacts.controller.js

const get = require("./contacts/get");
const getById = require("./contacts/getById");
const create = require("./contacts/create");
const update = require("./contacts/update");
const updateFavorite = require("./contacts/updateFavorite");
const remove = require("./contacts/remove");

module.exports = {
  get,
  getById,
  create,
  update,
  updateFavorite,
  remove,
};
