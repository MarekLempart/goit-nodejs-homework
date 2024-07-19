// homework-06/controllers/contacts/create.js

const contactsService = require("../../services/contacts.service");
const { contactSchema } = require("../../services/validation");

const create = async (req, res, next) => {
  try {
    const { body, user } = req;
    const { error } = contactSchema.validate(body);
    if (error) {
      return res.status(400).json({
        status: "validation-error",
        code: 400,
        data: {
          message: error.details[0].message,
        },
      });
    }
    const results = await contactsService.create({ ...body, owner: user._id });
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact: results,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = create;
