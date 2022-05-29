import { imageStore } from "../models/image-store.js";
import { MarkerSpec } from "../models/joi-schemas.js";
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
    validate: {
      payload: MarkerSpec,
      options: {
        abortEarly: false
      },
      failAction: function (request, h, error) {
        return h.view("placemark-view", {
          title: "Add marker error",
          errors: error.details
        }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const newMarker = {
        title: request.payload.title,
        location: request.payload.location,
        date: new Date(request.payload.date).toDateString(),
      };
      await db.markerStore.addMarker(placemark._id, newMarker);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },

  deleteMarker: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      await db.markerStore.deleteMarker(request.params.markerid);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getplacemarkById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          db.placemarkStore.updateplacemark(placemark);
        }
        return h.redirect(`/placemark/${placemark._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/placemark/${placemark._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  }
};