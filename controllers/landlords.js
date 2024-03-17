const mongoose = require("mongoose")
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

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
  const landlordId = new ObjectId(req.params.id);
  const singleLandlord = await mongodb
    .getDatabase()
    .db()
    .collection("landlords")
    .find({ _id: landlordId });

  singleLandlord.toArray().then((landlord) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.json(landlord);
  });
};

const createLandlord = async (req, res) => {
  console.log("am here");
  landlord = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
     };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("landlords")
    .insertOne(landlord);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || " Some error occured while creating the user.");
  }
};

const deleteSingleLandlord = async (req, res) => {
  const landLordId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("properties")
    .deleteOne({ _id: landLordId });
  console.log({ response });
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
  if (mongoose.isValidObjectId(req.params.id) === false)
  {
   return res.status(400).send("Bad objectId")
   

  }
  const id = new ObjectId(req.params.id);

     landlord = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
     };
   
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("properties")
    .replaceOne({ _id: id }, landlord);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while deleting the property");
  }
};
module.exports = {
  createLandlord,
  getAllLandlords,
  getSingleLandlord,
  deleteSingleLandlord,
  updateLandlord,
};
