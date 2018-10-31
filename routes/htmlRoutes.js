const db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(users) {
      res.render("index", {
        msg: "Welcome!",
        examples: users
      });
    });
  });

  // Load user profile page by id
  app.get("/user/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(users) {
      res.render("example", {
        example: users
      });
    });
  });

  app.get("/highscores", function(req, res) {
    db.Scores.findAll({
      include: [db.user],
      order: [["score", "DESC"]],
      limit: 10
    }).then(function(scores) {
      console.log(scores);
      res.render("highscores", { score: scores });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
