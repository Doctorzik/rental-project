const mongoose = require("mongoose")
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .find();

  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getSingleUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const singleUser = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .find({ _id: userId });

  singleUser.toArray().then((user) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.json(user);
  });
};

const createUser = async (req, res) => {
  console.log("am here");
  user = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
     };
   
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || " Some error occured while creating the user.");
  }
};

const deleteSingleUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .deleteOne({ _id: userId });
  console.log({ response });
  if (response.acknowledged && response.deletedCount > 0) {
    res
      .status(204)
      .send(`The Property with id ${userId}  was successfully deleted`);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while deleting the property");
  }
};

const updateUser = async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id) === false)
  {
   return res.status(400).send("Bad objectId")
   

  }
  const userId = new ObjectId(req.params.id);
  user = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
     };
   
   
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .replaceOne({ _id: userId }, user);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while deleting the property");
  }
};
module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateUser,
};
