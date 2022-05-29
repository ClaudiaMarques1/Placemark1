import { v4 } from "uuid";

let markers = [];

export const markerMemStore = {
  async getAllMarkers() {
    return markers;
  },

  async addMarker(placemarkId, marker) {
    marker._id = v4();
    marker.placemarkid = placemarkId;
    markers.push(marker);
    return marker;
  },

  async getMarkersByPlacemarkId(id) {
    return markers.filter((marker) => marker.placemarkid === id);
  },

  async getMarkerById(id) {
    return markers.find((marker) => marker._id === id);
  },

  async getPlacemarkMarkers(placemarkId) {
    return markers.filter((marker) => marker.placemarkid === placemarkId);
  },

  async deleteMarker(id) {
    const index = markers.findIndex((marker) => marker._id === id);
    markers.splice(index, 1);
  },

  async deleteAllMarkers() {
    markers = [];
  },

  async updateMarker(marker, updatedMarker) {
    marker.title = updatedMarker.title;
    marker.location = updatedMarker.location;
    marker.date = updatedMarker.date;
  },
};