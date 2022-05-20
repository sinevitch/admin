/* eslint-disable no-underscore-dangle,no-use-before-define,max-len */
const mongoose = require('mongoose');
const validation = require('../entity/validation');

const coordinateStoreSchema = new mongoose.Schema({
  key: {
    required: true,
    type: String,
    maxlength: 10000,
    minlength: 1,
    validate(value) {
      validation.checkString(value, 'Key is invalid');
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
}, {
  timestamps: true,
});

coordinateStoreSchema.statics.findBy = async ({ latitude, longitude, maxDistance }) => {
  const stores = await CoordinateStore.find({
    location:
      {
        $near:
          {
            $geometry: { type: 'Point', coordinates: [latitude, longitude] },
            $minDistance: 0,
            $maxDistance: maxDistance,
          },
      },
  });

  return stores;
};

coordinateStoreSchema.statics.findById = async ({ id }) => {
  const stores = await CoordinateStore.find({
    key:
      {
        $regex: id,
      },
  });

  return stores;
};

const CoordinateStore = mongoose.model('CoordinateStore', coordinateStoreSchema);


module.exports = CoordinateStore;
