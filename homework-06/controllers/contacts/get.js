// homework-06/controllers/contacts/get.js

const contactsService = require("../../services/contacts.service");

const get = async (req, res) => {
  try {
    const { query, user } = req;
    const { page = 1, limit = 20 } = query;

    const results = await contactsService.getAll({
      ...query,
      owner: user._id,
      page: parseInt(page),
      limit: parseInt(limit),
    });

    if (!results) {
      return res.status(404).json({
        status: "not-found",
        code: 404,
        data: {
          contacts: results,
        },
      });
    }
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
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

module.exports = get;
