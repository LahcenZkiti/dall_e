import express from "express";
import * as dotenv from "dotenv";
import Post from "../mongodb/models/post.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

dotenv.config();

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const AllPosts = await Post.find({});

    res.status(200).json({ success: true, data: AllPosts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
});

// router.route("/").post(async (req, res) => {
//   try {
//     const { name, prompt, photo } = req.body;

//     const newPost = await Post.create({
//       name,
//       prompt,
//       photo,
//     });

//     res.status(200).json({ success: true, data: newPost });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Unable to create a post, please try again",
//     });
//   }
// });

export default router;
