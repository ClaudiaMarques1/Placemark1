import { v4 } from "uuid";
import { markerMemStore } from "./marker-mem-store.js";

let placemarks = [];

export const placemarkMemStore = {
  async getAllPlacemarks() {
    return placemarks;
  },

  async addPlacemark(placemark) {
    placemark._id = v4();
    placemarks.push(placemark);
    return placemarks;
  },

  async getPlacemarkById(id) {
    const list = placemarks.find((placemark) => placemark._id === id);
    list.markers = await markerMemStore.getMarkersByPlacemarkId(list._id);
    return list;
  },

  async deletePlacemarkById(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    placemarks.splice(index, 1);
  },

  async deleteAllPlacemarks() {
    placemarks = [];
  },
};