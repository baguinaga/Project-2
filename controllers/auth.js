module.exports = (app, passport) => {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/signup", (req, res) => {
    res.render("signup", { error: req.flash("error") });
  });

  app.get("/signin", (req, res) => {
    res.render("signin", { error: req.flash("error") });
  });

  app.get("/signout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/"); //Inside a callback… bulletproof!
    });
  });

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/home",
      failureRedirect: "/signup",
      failureFlash: true
    })
  );

  app.get("/home", isLoggedIn, (req, res) => {
    res.render("home");
  });

  app.get("/logout", (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      res.redirect("/");
    });
  });

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/home",
      failureRedirect: "/signin",
      failureFlash: true
    })
  );

  app.get("/game", isLoggedIn, function(req, res) {
    res.render("game");
  });

  app.get("/api/game/:id", function(req, res) {
    res.render("highscores");
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
};
