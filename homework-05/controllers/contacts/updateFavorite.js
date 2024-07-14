// homework-05/controllers/contacts/updateFavorite.js

const contactsService = require("../../services/contacts.service");
const { favoriteSchema } = require("../../services/validation");

const updateFavorite = async (req, res, next) => {
  try {
    const { body, params, user } = req;
    const { error } = favoriteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "validation-error",
        code: 400,
        data: {
          message: error.details[0].message,
        },
      });
    }
    const { id } = params;
    const { favorite } = body;
    const results = await contactsService.updateFavorite(
      id,
      user._id,
      favorite
    );
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

module.exports = updateFavorite;
