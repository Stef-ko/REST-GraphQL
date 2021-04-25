const Post = require("../models/Post");
// const Post = db.Post;

exports.create = (req, res) => {
  console.log("Post created via REST");
  if (!req.body.body) {
    res.status(400).send({ message: "Post must not be empty" });
    return;
  }
  const newPost = new Post({
    body: req.body.body,
    username: "mock username",
    createdAt: new Date().toISOString(),
  });

  newPost
    .save(newPost)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(510).send({
        message: err.message || "Error while saving post",
      });
    });
  //   const post = newPost.save();
  return newPost;
};

exports.findAll = (req, res) => {
  Post.find()
    .sort({ createdAt: "desc" })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while fetching posts",
      });
    });
};

exports.findOne = (req, res) => {};

exports.update = (req, res) => {};

exports.delete = (req, res) => {};

exports.findAllPublished = (req, res) => {};
