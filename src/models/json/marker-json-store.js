import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/markers.json"));
db.data = { markers: [] };

export const markerJsonStore = {
  async getAllMarkers() {
    await db.read();
    return db.data.markers;
  },

  async addMarker(placemarkId, marker) {
    await db.read();
    marker._id = v4();
    marker.placemarkid = placemarkId;
    db.data.markers.push(marker);
    await db.write();
    return marker;
  },

  async getMarkersByPlacemarkId(id) {
    await db.read();
    return db.data.markers.filter((marker) => marker.placemarkid === id);
  },

  async getMarkerById(id) {
    await db.read();
    return db.data.markers.find((marker) => marker._id === id);
  },

  async deleteMarker(id) {
    await db.read();
    const index = db.data.markers.findIndex((marker) => marker._id === id);
    db.data.markers.splice(index, 1);
    await db.write();
  },

  async deleteAllMarkers() {
    db.data.markers = [];
    await db.write();
  },

  async updateMarker(marker, updatedMarker) {
    marker.title = updatedMarker.title;
    marker.location = updatedMarker.location;
    marker.date = updatedMarker.date;
    await db.write();
  },
};
