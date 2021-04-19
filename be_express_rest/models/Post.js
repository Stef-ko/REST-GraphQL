// module.exports = (mongoose) => {
//   var schema = mongoose.Schema({
//     body: String,
//     username: String,
//     createdAt: String,
//   });

//   schema.method("toJSON", function () {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

//   const Post = mongoose.model("tutorial", schema);
//   return Post;
// };

const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
});

module.exports = model("Post", postSchema);
