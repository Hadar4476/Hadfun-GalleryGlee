const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const artSchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    artName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    artDescription: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 650,
    },
    artImage: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 1024,
    },
    artNumber: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 9999,
    },
    public: {
      type: Boolean,
      required: true,
    },
    creator_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false }
);

const Art = mongoose.model("Art", artSchema);

function validateArt(art) {
  const joiSchema = Joi.object({
    creator: Joi.string()
      .required()
      .min(2)
      .max(255)
      .regex(/^[A-z](?!.*[A-Z_0-9]){2,255}\w+$/),
    artName: Joi.string().required().min(2).max(255),
    artDescription: Joi.string().required().min(21).max(650),
    artImage: Joi.string().required().min(11).max(1024),
    public: Joi.boolean().required(),
  });
  return joiSchema.validate(art);
}
async function genArtNumber(Art) {
  while (true) {
    let randNum = _.random(100, 9999);
    let art = await Art.findOne({ artNumber: randNum });
    if (!art) return String(randNum);
  }
}

exports.Art = Art;
exports.validateArt = validateArt;
exports.genArtNumber = genArtNumber;
