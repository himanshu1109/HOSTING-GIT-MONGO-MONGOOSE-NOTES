const mongoose = require("mongoose");

// Connection with URL (mongodb://localhost:27017/db_name)
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

// Create a new Schema
const fruitSchema = new mongoose.Schema({
  // using Mongoose built-in validators required, min, max
  name: {
    type: String,
    required: [true, "where is the name"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

// New collection mongoose.model("Collection_name", Schema)
const Fruit = mongoose.model("Fruit", fruitSchema);

// Inserting data 
const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit"
});

// Saving Data
fruit.save();

// Challenge
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  // Estabilising Relationships
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 9,
  review: "Great"
});

const mango = new Fruit({
  name: "Mango",
  rating: 9,
  review: "Great"
});

pineapple.save();

const person = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
});

const john = new Person({
  name: "John",
  age: 12,
  favouriteFruit: pineapple
});

Person.updateOne({name:"John"}, {favouriteFruit:mango}, (err)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log("Successfully added");
  }
});
john.save();

// Creating diff. objects of Fruit
const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "The Best Fruit!"
});

const orange = new Fruit({
  name: "Orange",
  rating: 4,
  review: "Too Sour for me"
});

const banana = new Fruit({
  name: "Banana",
  rating: 3,
  review: "Weird Texture"
});

// To insert many objects at once
Fruit.insertMany([kiwi, orange, banana], (err)=>{
  if (err){
    console.log(err);
  }
  else{
    console.log("Successfully saved all the fruits to fruitsDB");
  }
});


// Reading and Fetching
Fruit.find((err, fruits)=>{
  if (err){
    console.log(err);
  }
  else{

    // Closing Database/Connection
    mongoose.connection.close();

    for (let fruit of fruits){
      console.log(fruit.name);
    }
  }
});

// Updating data
Fruit.updateOne({_id: "6241ed83032c3d5ac9d27550"}, {name:"Peach"}, (err)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log("Successfully Updated");
  }
});

// Deleting data
Fruit.deleteOne({_id: "6241ed83032c3d5ac9d27550"}, (err)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log("Successfully Deleted");
  }
});

// Deleting Many
Person.deleteMany({name: "John"}, (err)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log("Successfully Deleted John");
  }
});