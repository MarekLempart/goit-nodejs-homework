// homework-06/controllers/contacts/remove.js

const contactsService = require("../../services/contacts.service");

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const results = await contactsService.remove(id, user._id);
    if (!results) {
      return res.status(404).json({
        status: "not-found",
        code: 404,
        data: {
          contact: results,
        },
      });
    }
    return res.status(204).json({
      status: "success",
      code: 204,
      data: {
        id,
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

module.exports = remove;
