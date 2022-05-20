/* eslint-disable no-underscore-dangle,no-use-before-define,max-len */
const mongoose = require('mongoose');
const validation = require('../entity/validation');

const coordinatePosterSchema = new mongoose.Schema({
  key: {
    required: true,
    type: String,
    maxlength: 10000,
    minlength: 1,
    validate(value) {
      validation.checkString(value, 'Key is invalid');
    },
  },
  type: {
    required: true,
    type: String,
    maxlength: 100,
    minlength: 1,
    validate(value) {
      validation.checkType(value);
    },
  },
  typePoster: {
    required: true,
    type: String,
    maxlength: 100,
    minlength: 1,
    validate(value) {
      validation.checkTypePoster(value);
    },
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      validate(value) {
        validation.checkString(value, 'Location type is invalid');
      },
      required: true,
    },
    coordinates: {
      type: Array,
      required: true,
      validate(value) {
        validation.checkLocation(value);
      },
    },
  },
});

coordinatePosterSchema.statics.findBy = async ({
  lat, lng, typePoster, type, maxDistance,
}) => {
  const posters = await CoordinatePoster.find({
    type,
    typePoster,
    location:
      {
        $near:
          {
            $geometry: { type: 'Point', coordinates: [lat, lng] },
            $minDistance: 0,
            $maxDistance: maxDistance,
          },
      },
  }, {
    createdAt: 0,
    updatedAt: 0,
    type: 0,
    typePoster: 0,
  });

  return posters;
};

coordinatePosterSchema.statics.findById = async ({ id }) => {
  const posters = await CoordinatePoster.find({
    key:
      {
        $regex: id,
      },
  });

  return posters;
};

const CoordinatePoster = mongoose.model('CoordinatePoster', coordinatePosterSchema);

module.exports = CoordinatePoster;
