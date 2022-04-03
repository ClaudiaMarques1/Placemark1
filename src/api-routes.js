import { userApi } from "./api/user-api.js";
import { placemarkApi } from "./api/placemark-api.js";
import { markerApi } from "./api/marker-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/placemarks", config: placemarkApi.create },
  { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
  { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placemarkApi.deleteOne },

  { method: "GET", path: "/api/markers", config: markerApi.find },
  { method: "GET", path: "/api/markers/{id}", config: markerApi.findOne },
  { method: "POST", path: "/api/placemarks/{id}/markers", config: markerApi.create },
  { method: "DELETE", path: "/api/markers", config: markerApi.deleteAll },
  { method: "DELETE", path: "/api/markers/{id}", config: markerApi.deleteOne },
];
