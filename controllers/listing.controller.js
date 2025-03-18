import mongoose from "mongoose";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  console.log("hit-ing listing");
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "you can only view your won listing"));
  }
  try {
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const deletListing = async (req, res, next) => {
  console.log("hiting delete listing");

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(errorHandler(400, "Invalid listing ID"));
  }

  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You can only delete your own listing"));
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing deleted" });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(errorHandler(400, "Invalid listing ID"));
  }

  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You can only update your own listing"));
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
