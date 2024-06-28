// homework-03/controllers/contacts.controller.js

const contactsService = require("../services/contacts.service");
const {
  contactSchema,
  contactUpdateSchema,
  favoriteSchema,
} = require("../services/validation");

const get = async (req, res) => {
  try {
    const results = await contactsService.getAll();
    if (!results) {
      return res.status(404).json({
        status: "not-found",
        code: 404,
        data: {
          contacts: results,
        },
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: {
        message: error.message,
      },
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await contactsService.getOne(id);
    if (!results) {
      return res.status(404).json({
        status: "not-found",
        code: 404,
        data: {
          contact: results,
        },
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: {
        message: error.message,
      },
    });
  }
};

const create = async (req, res, next) => {
  try {
    const { body } = req;
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
    const results = await contactsService.create(body);
    res.status(201).json({
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

const update = async (req, res, next) => {
  try {
    const { body } = req;
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
    const results = await contactsService.update(id, body);
    if (!results) {
      return res.status(404).json({
        status: "not-found",
        code: 404,
        data: {
          contact: results,
        },
      });
    }
    res.json({
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

const updateFavorite = async (req, res, next) => {
  try {
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
    const { id } = req.params;
    const { favorite } = req.body;
    const results = await contactsService.updateFavorite(id, favorite);
    if (!results) {
      return res.status(404).json({
        status: "not-found",
        code: 404,
        data: {
          contact: results,
        },
      });
    }
    res.json({
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

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await contactsService.remove(id);
    if (!results) {
      return res.status(404).json({
        status: "not-found",
        code: 404,
        data: {
          contact: results,
        },
      });
    }
    res.status(204).json({
      status: "success",
      code: 204,
      data: {
        id,
        contact: results,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: {
        message: error.message,
      },
    });
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateFavorite,
  remove,
};
