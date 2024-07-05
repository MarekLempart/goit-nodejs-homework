// homework-04/services/contacts.service.js
const Contact = require("../models/contact.model");

const getAll = async ({ owner, page = 1, limit = 20, ...query }) => {
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner, ...query })
    .skip(skip)
    .limit(limit)
    .exec();
  return contacts;
};

const getOne = async (id, userId) => {
  return Contact.findOne({ _id: id, owner: userId });
};

const create = async (data) => {
  return Contact.create(data);
};

const update = async (id, userId, data) => {
  return Contact.findOneAndUpdate({ _id: id, owner: userId }, data, {
    new: true,
  });
};

const updateFavorite = async (id, userId, favorite) => {
  return Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { favorite },
    {
      new: true,
    }
  );
};

const remove = async (id, userId) => {
  return Contact.findOneAndDelete({ _id: id, owner: userId });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  updateFavorite,
  remove,
};
