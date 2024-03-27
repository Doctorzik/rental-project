const mongoose = require("mongoose");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const joi = require("joi");
const  validateFun =  require("../schemas");

const propertySchema = joi.object({
  title: joi.string().lowercase().length(30).required(),
  description: joi.string().lowercase().required(),
  address: joi.string().lowercase().required(),
  city: joi.string().lowercase().required(),
  state: joi.string().lowercase().required(),
  price: joi.number().min(5).required(),
  bedrooms: joi.number().min(1),
  bathrooms: joi.number().min(1).required(),
  size: joi.number().min(1).required(),
});

const getAllProperties = async (req, res) => {
  // #swagger.tags = ['Properties']
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("properties")
    .find();

  result.toArray().then((properties) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(properties);
  });
};

const getSingleProperty = async (req, res) => {
  // #swagger.tags = ['Properties']

  if (mongoose.isValidObjectId(req.params.id) === false) {
    return res.status(400).send("Bad objectId");
  }
  const propertyId = new ObjectId(req.params.id);
  const singleProperty = await mongodb
    .getDatabase()
    .db()
    .collection("properties")
    .find({ _id: propertyId });

  singleProperty.toArray().then((properties) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.json(properties);
  });
};

const createProperties = async (req, res) => {
  // #swagger.tags = ['Properties']

  

  const { error, value } = validateFun.validate(propertySchema, req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("properties")
    .insertOne(value);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || " Some error occured while creating the user.");
  }
};

const deleteSingleProperty = async (req, res) => {
  // #swagger.tags = ['Properties']
  if (mongoose.isValidObjectId(req.params.id) === false) {
    return res.status(400).send("Bad objectId");
  }
  const propertyId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("properties")
    .deleteOne({ _id: propertyId });
  console.log({ response });
  if (response.acknowledged && response.deletedCount > 0) {
    res
      .status(204)
      .send(`The Property with id ${propertyId}  was successfully deleted`);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while deleting the property");
  }
};

const updateProperty = async (req, res) => {
  // #swagger.tags = ['Properties']

  if (mongoose.isValidObjectId(req.params.id) === false) {
    return res.status(400).send("Bad objectId");
  }
  const id = new ObjectId(req.params.id);

  const { error, value } = validateFun.validate(propertySchema, req.body);
  if (error) {
    return res.status(400).json(error.details);
  }


  const response = await mongodb
    .getDatabase()
    .db()
    .collection("properties")
    .replaceOne({ _id: id }, value);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while deleting the property");
  }
};
module.exports = {
  createProperties,
  getAllProperties,
  getSingleProperty,
  deleteSingleProperty,
  updateProperty,
};
