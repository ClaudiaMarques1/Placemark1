import { db } from "../models/db.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const viewData = {
        title: "Placemark",
        placemark: placemark,
      };
      return h.view("placemark-view", viewData);
    },
  },

  addMarker: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const newMarker = {
        title: request.payload.title,
        location: request.payload.location,
        date: Date(request.payload.date),
        timestamp: request.payload.timestamp        
      };
      await db.markerStore.addMarker(placemark._id, newMarker);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
};