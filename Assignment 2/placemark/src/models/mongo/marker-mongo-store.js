import { Marker } from "./marker.js";
import { Placemark } from "./placemark.js";

export const markerMongoStore = {
  async getAllMarkers() {
    const markers = await Marker.find().lean();
    return markers;
  },

  async addMarker(placemarkId, marker) {
    marker.placemarkid = placemarkId;
    const newMarker = new Marker(marker);
    const markerObj = await newMarker.save();
    return this.getMarkerById(markerObj._id);
  },

  async getMarkersByPlacemarkId(id) {
    const markers = await Marker.find({ placemarkid: id }).lean();
    return markers;
  },

  async getMarkerById(id) {
    if (id) {
      const marker = await Marker.findOne({ _id: id }).lean();
      return marker;
    }
    return null;
  },

  async deleteMarker(id) {
    try {
      await Marker.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllMarkers() {
    await Marker.deleteMany({});
  },

  async updateMarker(marker, updatedMarker) {
    marker.title = updatedMarker.title;
    marker.location = updatedMarker.location;
    marker.date = updatedMarker.date;
    await marker.save();
  },
};