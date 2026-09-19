// get all properties
// get property based on id

import { Property } from "../Models/propertyModel.js";
import { APIFeatures } from "../utils/APIFeatures.js";
import imagekit from "../utils/ImagekitIO.js";

// GET ALL PROPERTIES
const getProperties = async (req, res) => {
  try {
    const features = new APIFeatures(Property.find(), req.query)
      .filter()
      .search()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: "success",
      no_of_responses: doc.length,
      data: doc,
    });
  } catch (error) {
    console.error("Error searching properties:", error);

    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

// GET PROPERTY BY ID
// http://localhost:8080/api/v1/rent/listing/:id

const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        status: "fail",
        message: "Property not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: property,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// CREATE A PROPERTY
// An owner adds his house

const createProperty = async (req, res) => {
  try {
    const {
      propertyName,
      description,
      propertyType,
      roomType,
      extraInfo,
      address,
      amenities,
      checkInTime,
      checkOutTime,
      maximumGuest,
      price,
      images,
    } = req.body;

    const uploadedImages = [];

    // Upload each image to ImageKit
    for (const image of images) {
      const result = await imagekit.upload({
        file: image.url,
        fileName: `property_${Date.now()}.jpg`,
        folder: "property_images",
      });

      uploadedImages.push({
        url: result.url,
        public_id: result.fileId,
      });
    }

    // Save property in database
    const property = await Property.create({
      propertyName,
      description,
      propertyType,
      roomType,
      extraInfo,
      address,
      amenities,
      checkInTime,
      checkOutTime,
      maximumGuest,
      price,
      images: uploadedImages,
      userId: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: property,
    });
  } catch (error) {
    console.error("Error creating property:", error);

    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// GET MY PROPERTIES
// Find every property owned by the logged-in user

const getUsersProperties = async (req, res) => {
  try {
    const userId = req.user._id;

    const property = await Property.find({ userId });

    res.status(200).json({
      status: "success",
      data: property,
    });
  } catch (error) {
    console.error("Error getting user's properties:", error);

    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export {
  getProperties,
  getProperty,
  createProperty,
  getUsersProperties,
};
