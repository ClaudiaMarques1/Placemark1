import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, dublin, testPlacemarks, testMarkers, gym, maggieCredentials } from "../fixtures.js";

suite("Marker API tests", () => {
  let user = null;
  let corkFavourites = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.deleteAllMarkers();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    dublin.userid = user._id;
    corkFavourites = await placemarkService.createPlacemark(dublin);
  });

  teardown(async () => { });

  test("create marker", async () => {
    const returnedMarker = await placemarkService.createMarker(corkFavourites._id, gym);
    assertSubset(gym, returnedMarker);
  });

  test("create Multiple markers", async () => {
    for (let i = 0; i < testMarkers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createMarker(corkFavourites._id, testMarkers[i]);
    }
    const returnedMarkers = await placemarkService.getAllMarkers();
    assert.equal(returnedMarkers.length, testMarkers.length);
    for (let i = 0; i < returnedMarkers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const marker = await placemarkService.getMarker(returnedMarkers[i]._id);
      assertSubset(marker, returnedMarkers[i]);
    }
  });

  test("Delete MarkerApi", async () => {
    for (let i = 0; i < testMarkers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createMarker(corkFavourites._id, testMarkers[i]);
    }
    let returnedMarkers = await placemarkService.getAllMarkers();
    assert.equal(returnedMarkers.length, testMarkers.length);
    for (let i = 0; i < returnedMarkers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const marker = await placemarkService.deleteMarker(returnedMarkers[i]._id);
    }
    returnedMarkers = await placemarkService.getAllMarkers();
    assert.equal(returnedMarkers.length, 0);
  });

  test("denormalised Placemark", async () => {
    for (let i = 0; i < testMarkers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createMarker(corkFavourites._id, testMarkers[i]);
    }
    const returnedPlacemark = await placemarkService.getPlacemark(corkFavourites._id);
    assert.equal(returnedPlacemark.markers.length, testMarkers.length);
    for (let i = 0; i < testMarkers.length; i += 1) {
      assertSubset(testMarkers[i], returnedPlacemark.markers[i]);
    }
  });
});
