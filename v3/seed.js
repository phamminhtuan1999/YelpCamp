var mongoose = require("mongoose");
Campground = require("./models/campground");
Comment = require("./models/comment");

var seeds = [
  {
    name: "Cat",
    image:
      "https://en.freejpg.com.ar/image-900/8a/8ad1/F100011956-gray_cat_with_yellow_eyes_looking_at_the_camera.jpg",
    description:
      "Exercitation duis pariatur sunt dolore ullamco in voluptate proident reprehenderit cupidatat in esse nostrud laboris. Aute aute officia eu ullamco qui et. Ullamco et deserunt proident deserunt nostrud id eu deserunt consequat laboris reprehenderit Lorem amet. Ad labore duis amet commodo veniam adipisicing labore deserunt excepteur sunt sit.",
  },
  {
    name: "Dog",
    image:
      "https://en.freejpg.com.ar/image-900/12/1247/F100011831-close_up_of_a_dog_sitting_on_the_grass_with_a_natural_background.jpg",
    description: "blah blah blah",
  },
  {
    name: "Cow",
    image:
      "https://en.freejpg.com.ar/image-900/91/91ad/F100011815-close_up_of_a_brown_cow_with_a_blue_sky_in_the_background.jpg",
    description: "blah blah blah",
  },
];

async function seedDB() {
  try {
    await Campground.deleteMany({});
    console.log("delete campgrounds");

    await Comment.deleteMany({});
    console.log("delete comments");

    for (const seed of seeds) {
      let campground = await Campground.create(seed);
      console.log("add new campround");

      let comment = await Comment.create({
        text: "Nulla esse ullamco ex est dolor.",
        author: "Ex ex occaecat cupidatat veniam duis quis.",
      });
      campground.comments.push(comment);
      campground.save();
      console.log("add new comment");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = seedDB;
