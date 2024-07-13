// homework-05/controllers/contacts/getById.js

const contactsService = require("../../services/contacts.service");

const getById = async (req, res) => {
  try {
    const { params, user } = req;
    const { id } = params;
    const results = await contactsService.getOne(id, user._id);
    if (!results) {
      return res.status(404).json({
        status: "not-found",
        code: 404,
        data: {
          contact: results,
        },
      });
    }
    return res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      data: {
        message: error.message,
      },
    });
  }
};

module.exports = getById;
