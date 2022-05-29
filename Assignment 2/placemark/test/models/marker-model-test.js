import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlacemarks, testMarkers, dublin, cork, gym, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Marker Model tests", () => {

  let dublinList = null;

  setup(async () => {
    db.init("mongo");
    await db.placemarkStore.deleteAllPlacemarks();
    await db.markerStore.deleteAllMarkers();
    dublinList = await db.placemarkStore.addPlacemark(dublin);
    for (let i = 0; i < testMarkers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testMarkers[i] = await db.markerStore.addMarker(dublinList._id, testMarkers[i]);
    }
  });

  test("create single Marker", async () => {
    const corkList = await db.placemarkStore.addPlacemark(cork);
    const marker = await db.markerStore.addMarker(corkList._id, gym)
    assert.isNotNull(marker._id);
    assertSubset(gym, marker);
  });

  test("get multiple markers", async () => {
    const markers = await db.markerStore.getMarkersByPlacemarkId(dublinList._id);
    assert.equal(testMarkers.length, testMarkers.length)
  });

  test("delete all markers", async () => {
    const markers = await db.markerStore.getAllMarkers();
    assert.equal(testMarkers.length, markers.length);
    await db.markerStore.deleteAllMarkers();
    const newMarkers = await db.markerStore.getAllMarkers();
    assert.equal(0, newMarkers.length);
  });

  test("get a marker - success", async () => {
    const corkList = await db.placemarkStore.addPlacemark(cork);
    const marker = await db.markerStore.addMarker(corkList._id, gym)
    const newMarker = await db.markerStore.getMarkerById(marker._id);
    assertSubset(gym, newMarker);
  });

  test("delete One Marker - success", async () => {
    await db.markerStore.deleteMarker(testMarkers[0]._id);
    const markers = await db.markerStore.getAllMarkers();
    assert.equal(markers.length, testPlacemarks.length - 1);
    const deletedMarker = await db.markerStore.getMarkerById(testMarkers[0]._id);
    assert.isNull(deletedMarker);
  });

  test("get a marker - bad params", async () => {
    assert.isNull(await db.markerStore.getMarkerById(""));
    assert.isNull(await db.markerStore.getMarkerById());
  });

  test("delete one marker - fail", async () => {
    await db.markerStore.deleteMarker("bad-id");
    const markers = await db.markerStore.getAllMarkers();
    assert.equal(markers.length, testPlacemarks.length);
  });
});