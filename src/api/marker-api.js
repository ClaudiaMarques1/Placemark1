import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, MarkerSpec, MarkerSpecPlus, MarkerArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const markerApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const markers = await db.markerStore.getAllMarkers();
        return markers;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: MarkerArraySpec, failAction: validationError },
    description: "Get all markerApi",
    notes: "Returns all markerApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const marker = await db.markerStore.getMarkerById(request.params.id);
        if (!marker) {
          return Boom.notFound("No marker with this id");
        }
        return marker;
      } catch (err) {
        return Boom.serverUnavailable("No marker with this id");
      }
    },
    tags: ["api"],
    description: "Find a Marker",
    notes: "Returns a marker",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: MarkerSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const marker = await db.markerStore.addMarker(request.params.id, request.payload);
        if (marker) {
          return h.response(marker).code(201);
        }
        return Boom.badImplementation("error creating marker");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a marker",
    notes: "Returns the newly created marker",
    validate: { payload: MarkerSpec },
    response: { schema: MarkerSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.markerStore.deleteAllMarkers();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all markerApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const marker = await db.markerStore.getMarkerById(request.params.id);
        if (!marker) {
          return Boom.notFound("No Marker with this id");
        }
        await db.markerStore.deleteMarker(marker._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No marker with this id");
      }
    },
    tags: ["api"],
    description: "Delete a marker",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
