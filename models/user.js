const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    last_name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    gender: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 6,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    phone: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 10,
    },
    artist: {
      type: Boolean,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    favorites: {
      type: Array,
      required: true,
    },
  },
  { versionKey: false }
);

userSchema.methods.genAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, artist: this.artist },
    config.get("jwtKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const joiSchema = Joi.object({
    first_name: Joi.string()
      .required()
      .min(2)
      .max(255)
      .regex(/^[A-z](?!.*[A-Z_0-9]){2,255}\w+$/),
    last_name: Joi.string()
      .required()
      .min(2)
      .max(255)
      .regex(/^[A-z](?!.*[A-Z_0-9]){2,255}\w+$/),
    gender: Joi.string()
      .required()
      .min(4)
      .max(6)
      .regex(/^(male|Male|female|Female)$/),
    email: Joi.string().required().min(6).max(255).email(),
    password: Joi.string().required().min(5).max(1024),
    phone: Joi.string()
      .required()
      .min(9)
      .max(10)
      .regex(/^0[2-9]\d{7,8}$/),
    artist: Joi.boolean().required(),
    favorites: Joi.array().required(),
  });

  return joiSchema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
