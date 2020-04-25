var express = require("express");
app = express();
bodyParser = require("body-parser");
dotenv = require("dotenv");
mongoose = require("mongoose");
Campground = require("./models/campground");
Comment = require("./models/comment");
seedDB = require("./seed");

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("db connected")
);

//seedDB();

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
  //Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    err
      ? console.log(err)
      : res.render("campgrounds/index", { campgrounds: allCampgrounds });
  });
});

app.post("/campgrounds", function (req, res) {
  Campground.create(req.body.post, (err, newCreated) => {
    err ? console.log(err) : res.redirect("/campgrounds");
  });
});

app.get("/campgrounds/new", function (req, res) {
  res.render("campgrounds/new");
});

//show more info about one campground
app.get("/campgrounds/:id", (req, res) => {
  //find the campground with provided ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampground) => {
      err
        ? console.log(err)
        : res.render("campgrounds/show", { campground: foundCampground });
    });
});

/**
 * COMMENTS ROUTES
 */

app.get("/campgrounds/:id/comments/new", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    err
      ? console.log(err)
      : res.render("comments/new", { campground: campground });
  });
});

app.post("/campgrounds/:id/comments", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    err
      ? (console.log(err), redirect("/campgrounds"))
      : Comment.create(req.body.comment, (err, comment) => {
          err
            ? console.log(err)
            : (campground.comments.push(comment),
              campground.save(),
              res.redirect(`/campgrounds/${campground._id}`));
        });
  });
});

app.listen(process.env.PORT, function () {
  console.log("YelpCamp server has started");
});

/**
 * // var campgroundsSchema = new mongoose.Schema({
//   name: String,
//   image: String,
//   description: String,
// });

// var Campground = mongoose.model("Campground", campgroundsSchema);

// Campground.create(
//   {
//     name: "Cat",
//     image:
//       "https://en.freejpg.com.ar/image-900/8a/8ad1/F100011956-gray_cat_with_yellow_eyes_looking_at_the_camera.jpg",
//     description: "What a lovely dog",
//   },
//   function (err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("New campround");
//       console.log(campground);
//     }
//   }
// );

// var campgrounds = [
//   {
//     name: "Cat",
//     image:
//       "https://en.freejpg.com.ar/image-900/8a/8ad1/F100011956-gray_cat_with_yellow_eyes_looking_at_the_camera.jpg",
//   },
//   {
//     name: "Dog",
//     image:
//       "https://en.freejpg.com.ar/image-900/12/1247/F100011831-close_up_of_a_dog_sitting_on_the_grass_with_a_natural_background.jpg",
//   },
//   {
//     name: "Cow",
//     image:
//       "https://en.freejpg.com.ar/image-900/91/91ad/F100011815-close_up_of_a_brown_cow_with_a_blue_sky_in_the_background.jpg",
//   },
//   {
//     name: "Polar Bear",
//     image:
//       "https://en.freejpg.com.ar/image-900/04/04aa/F100011855-polar_bear_in_tokyo.jpg",
//   },
//   {
//     name: "Cat",
//     image:
//       "https://en.freejpg.com.ar/image-900/8a/8ad1/F100011956-gray_cat_with_yellow_eyes_looking_at_the_camera.jpg",
//   },
//   {
//     name: "Dog",
//     image:
//       "https://en.freejpg.com.ar/image-900/12/1247/F100011831-close_up_of_a_dog_sitting_on_the_grass_with_a_natural_background.jpg",
//   },
//   {
//     name: "Cow",
//     image:
//       "https://en.freejpg.com.ar/image-900/91/91ad/F100011815-close_up_of_a_brown_cow_with_a_blue_sky_in_the_background.jpg",
//   },
//   {
//     name: "Polar Bear",
//     image:
//       "https://en.freejpg.com.ar/image-900/04/04aa/F100011855-polar_bear_in_tokyo.jpg",
//   },
// ];
 */
