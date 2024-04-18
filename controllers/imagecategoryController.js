import imagecategoryModel from "../models/imagecategoryModel.js";
import designcategoryModel from "../models/designcategoryModel.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export const createDesignimgController = async (req, res) => {
  try {
    const { photo } = req.files;
    const { category } = req.fields;

    // Check if there is already an image uploaded for the specified category
    const existingImage = await imagecategoryModel.findOne({ category });
    if (existingImage) {
      return res.status(400).send({ error: "An image already exists for this category" });
    }

    // Validation
    switch (true) {
      case !photo:
        return res
          .status(400)
          .send({ error: "Photo is Required and should be less than 5mb" });
      case photo.size > 5000000:
        return res
          .status(400)
          .send({ error: "Photo should be less than 5mb" });
    }

    const designs = new imagecategoryModel({ ...req.fields });

    if (photo) {
      designs.photo.data = fs.readFileSync(photo.path);
      designs.photo.contentType = photo.type;
    }
    await designs.save();
    res.status(201).send({
      success: true,
      message: "Design Created Successfully",
      designs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating Designs",
    });
  }
};



//get all products
export const getDesignimgController = async (req, res) => {
    try {
      const designs = await imagecategoryModel
        .find({})
        .populate("category") // Update this line
        .select("-photo")
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        counTotal: designs.length,
        message: "ALL Designs ",
        designs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in getting products",
        error: error.message,
      });
    }
  };


// get photo
export const designcategoryPhotoController = async (req, res) => {
  try {
    const designs = await imagecategoryModel
      .findById(req.params.pid)
      .select("photo");
    if (designs && designs.photo && designs.photo.data) {
      res.set("Content-type", designs.photo.contentType);
      return res.status(200).send(designs.photo.data);
    } else {
      res.status(404).send({
        success: false,
        message: "Photo not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

// delete controller
export const deleteDesignimgController = async (req, res) => {
  try {
    await imagecategoryModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

// update product
export const updateDesignimgController = async (req, res) => {
  try {
    const { photo } = req.files;

    switch (true) {
      case !photo:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than 5mb" });
      case photo.size > 5000000:
        return res
          .status(500)
          .send({ error: "Photo should be less than 5mb" });
    }

    const designs = await imagecategoryModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields },
      { new: true }
    );
    if (photo) {
      designs.photo.data = fs.readFileSync(photo.path);
      designs.photo.contentType = photo.type;
    }
    await designs.save();
    res.status(201).send({
      success: true,
      message: "Updated Successfully",
      designs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update",
    });
  }
};

// product count
export const designimgCountController = async (req, res) => {
  try {
    const total = await imagecategoryModel.countDocuments({});
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in count",
      error,
      success: false,
    });
  }
};

export const designimgCategoryController = async (req, res) => {
  try {
    const categorydesign = await designcategoryModel.findOne({});
    const designs = await imagecategoryModel
      .find({ categorydesign })
      .populate("Category-design");
    res.status(200).send({
      success: true,
      categorydesign,
      designs,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting",
    });
  }
};
