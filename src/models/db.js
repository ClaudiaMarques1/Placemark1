import { userMemStore } from "./mem/user-mem-store.js";
import { placemarkMemStore } from "./mem/placemark-mem-store.js";
import { markerMemStore } from "./mem/marker-mem-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  markerStore: null,

  init() {
    this.userStore = userMemStore;
    this.placemarkStore = placemarkMemStore;
    this.markerStore = markerMemStore;
  },
};