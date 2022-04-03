import Mongoose from "mongoose";

const { Schema } = Mongoose;

const markerSchema = new Schema({
  title: String,
  location: String,
  date: String,
  placemarkid: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Marker = Mongoose.model("Marker", markerSchema);