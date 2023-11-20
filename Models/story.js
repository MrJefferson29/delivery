const mongoose = require("mongoose");
const Comment = require("./comment");
const slugify = require("slugify");

const StorySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    slug: String,
    title: {
      type: String,
      required: [true, "Please provide a Trcking Number"],
      unique: true,
      minlength: [10, "Please provide a title least 10 characters "],
    },
    status: {
      type: String,
      required: [true, "What is the package status"],
    },
    insurrance: {
      type: String,
      required: [true, "How much is the insurrnce"],
    },
    slider: {
      type: String,
      required: [true, "what is the percentage delivered"],
    },
    content: {
      type: String,
      required: [true, "Please a provide a name for package "],
      minlength: [3, "Please provide a content least 3 characters "],
    },
    address: {
        type: String,
        required: [ true, "Please provide the name and address of the client"]
    },
    image: {
      type: String,
      default: "default.jpg",
    },
    readtime: {
      type: Number,
      default: 3,
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

StorySchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    next();
  }

  this.slug = this.makeSlug();

  next();
});

StorySchema.pre("remove", async function (next) {
  const story = await Story.findById(this._id);

  await Comment.deleteMany({
    story: story,
  });
});

StorySchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: "-",
    remove: /[*+~.()'"!:@/?]/g,
    lower: true,
    strict: false,
    locale: "tr",
    trim: true,
  });
};

const Story = mongoose.model("Story", StorySchema);

module.exports = Story;
