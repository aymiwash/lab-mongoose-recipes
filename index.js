const mongoose = require("mongoose");
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const pestoRecipe = Recipe.create({
      title: "Pesto Pasta",
      level: "Easy Peasy",
      ingredients: ["Pasta", "Onion", "Oil", "Pesto", "Seasonings", "Cheese"],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://media.soscuisine.com/images/recettes/large/682.jpg",
      duration: 15,
      creator: "Emilie Luong",
    });
    return pestoRecipe;
  })
  .then((recipe) => {
    //after promise (pesto recipe) fullfilled
    console.log(recipe.title);
    return Recipe.insertMany(data);
  })
  .then((data) => {
    //promise should be an array of objets (all recipes)
    data.forEach((recipe) => console.log(recipe.title));
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then(() => {
    console.log("Successfully updated");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Successfully deleted");
    return mongoose.connection.close();
  })
  .then(() => console.log("successfully closed"))
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
