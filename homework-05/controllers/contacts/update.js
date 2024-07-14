// homework-05/controllers/contacts/update.js

const contactsService = require("../../services/contacts.service");
const { contactUpdateSchema } = require("../../services/validation");

const update = async (req, res, next) => {
  try {
    const { body, user } = req;
    const { error } = contactUpdateSchema.validate(body);
    if (error) {
      return res.status(400).json({
        status: "validation-error",
        code: 400,
        data: {
          message: error.details[0].message,
        },
      });
    }
    const { id } = req.params;
    const results = await contactsService.update(id, user, user._id, body);
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
    console.error(error);
    next(error);
  }
};

module.exports = update;
