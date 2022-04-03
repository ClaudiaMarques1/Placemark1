import { MarkerSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const markerController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const marker = await db.markerStore.getMarkerById(request.params.markerid);
      const viewData = {
        title: "Edit Marker",
        placemark: placemark,
        marker: marker,
      };
      return h.view("marker-view", viewData);
    },
  },

  update: {
    validate: {
      payload: MarkerSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("marker-view", { title: "Edit marker error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const marker = await db.markerStore.getMarkerById(request.params.markerid);
      const newMarker = {
        title: request.payload.title,
        location: request.payload.location,
        date: new Date(request.payload.date).toDateString(),
      };
      await db.markerStore.updateMarker(marker, newMarker);
      return h.redirect(`/placemark/${request.params.id}`);
    },
  },
};
