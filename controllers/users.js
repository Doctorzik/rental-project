const mongoose = require("mongoose")
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const joi = require("joi")
const validateFun = require("../schemas")




const userSchema = joi.object({
  name: joi.string().min(3).max(30).lowercase().required(),
  phone: joi.number().required(),
  email: joi.string().email().required(),
  address: joi.string().required(),
});
const getAllUsers = async (req, res) => {
      // #swagger.tags = ['Users']
       // #swagger.summary = Get all the users from the rental api
       // #swagger.description = 'When called, all the users will be retrived'
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
    // #swagger.tags = ['Users']
    if (mongoose.isValidObjectId(req.params.id) === false)
    {
     return res.status(400).send("Bad objectId")
     
  
    }
  const userId = new ObjectId(req.params.id);
  const singleUser = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .find({ _id: userId });

  singleUser.toArray().then((user) => {
     
    if ((user.length == 0)) {
      return res.status(400).send("No Users with  the provided id");
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.json(user);
  });
};

const createUser = async (req, res) => {
    // #swagger.tags = ['Users']
    
  const { error, value } = validateFun.validate(userSchema, req.body);
  if (error) {
    return res.status(400).json(error.details);
  }
   
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .insertOne(value);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || " Some error occured while creating the user.");
  }
};

const deleteSingleUser = async (req, res) => {
    // #swagger.tags = ['Users']
    if (mongoose.isValidObjectId(req.params.id) === false)
    {
     return res.status(400).send("Bad objectId")
     
  
    }
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
    // #swagger.tags = ['Users']
  if (mongoose.isValidObjectId(req.params.id) === false)
  {
   return res.status(400).send("Bad objectId")
   

  }
  const { error, value } = validateFun.validate(userSchema, req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  const userId = new ObjectId(req.params.id);

   
   
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .replaceOne({ _id: userId }, value);

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
