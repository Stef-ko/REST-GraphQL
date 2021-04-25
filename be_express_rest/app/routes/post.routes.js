module.exports = (app) => {
  const posts = require("../../controllers/controller");

  var router = require("express").Router();

  router.post("/newpost", posts.create);

  router.delete("/deletepost/:id", posts.delete);

  router.get("/", posts.findAll);

  app.use("/api/posts", router);
};
