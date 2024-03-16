const { response } = require("express");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllProperties = async (req, res) => {
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
  property = {
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    price: req.body.price,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    size: req.body.size,
    amenities: [],

    images: [],
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("properties")
    .insertOne(property);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || " Some error occured while creating the user.");
  }
};

const deleteSingleProperty = async (req, res) => {
  const propertyId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("properties")
    .deleteOne({ _d: propertyId });
  for (i in response) {
    console.log(i);
  }
  if (response.acknowledged) {
    res
      .status(200)
      .send(`The Property with id ${propertyId}  was successfully deleted`);
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
};
