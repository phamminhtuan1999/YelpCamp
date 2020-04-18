var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
  var campgrounds = [
    {
      name: "Cat",
      image:
        "https://en.freejpg.com.ar/image-900/8a/8ad1/F100011956-gray_cat_with_yellow_eyes_looking_at_the_camera.jpg",
    },
    {
      name: "Dog",
      image:
        "https://en.freejpg.com.ar/image-900/12/1247/F100011831-close_up_of_a_dog_sitting_on_the_grass_with_a_natural_background.jpg",
    },
    {
      name: "Cow",
      image:
        "https://en.freejpg.com.ar/image-900/91/91ad/F100011815-close_up_of_a_brown_cow_with_a_blue_sky_in_the_background.jpg",
    },
  ];
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("YelpCamp server has started");
});
