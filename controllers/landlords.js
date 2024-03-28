const mongoose = require("mongoose");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const joi = require("joi");
const validateFun = require("../schemas");

const landLordSchema = joi.object({
  name: joi.string().min(3).max(30).lowercase().required(),
  phone: joi.number().required(),
  email: joi.string().email().required(),
  address: joi.string().required(),
});

const getAllLandlords = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("landlords")
    .find();

  result.toArray().then((landlords) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(landlords);
  });
};

const getSingleLandlord = async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id) === false) {
    return res.status(400).json("Bad objectId");
  }

  const landlordId = new ObjectId(req.params.id);
  const singleLandlord = await mongodb
    .getDatabase()
    .db()
    .collection("landlords")
    .find({ _id: landlordId });

  singleLandlord.toArray().then((landlord) => {
    
    if ((landlord.length == 0)) {
      return res.status(400).send("No landlord with  the provided id");
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.json(landlord);
  });
};

const createLandlord = async (req, res) => {
  const { error, value } = validateFun.validate(landLordSchema, req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("landlords")
    .insertOne(value);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || " Some error occured while creating the user.");
  }
};

const deleteSingleLandlord = async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id) === false) {
    return res.status(400).send("Bad objectId");
  }
  const landLordId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("landlords")
    .deleteOne({ _id: landLordId });

  if (response.acknowledged && response.deletedCount > 0) {
    res
      .status(204)
      .send(`The Property with id ${landLordId}  was successfully deleted`);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while deleting the property");
  }
};

const updateLandlord = async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id) === false) {
    return res.status(400).send("Bad objectId");
  }

  const { error, value } = validateFun.validate(landLordSchema, req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  const id = new ObjectId(req.params.id);

  try {
    // Update the landlord in the database
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("landlords")
      .replaceOne({ _id: id }, value);

    // Check if the landlord was successfully updated
    if (response.modifiedCount > 0) {
      return res.status(204).send(); // Send success response
    } else {
      return res.status(404).json("Landlord not found"); // Landlord not found
    }
  } catch (error) {
    return res.status(500).json("Error occurred while updating landlord"); // Server error
  }
};
module.exports = {
  createLandlord,
  getAllLandlords,
  getSingleLandlord,
  deleteSingleLandlord,
  updateLandlord,
};
