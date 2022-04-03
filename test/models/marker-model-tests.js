import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlacemarks, testMarkers, claudia, ireland, munster, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Marker Model tests", () => {

  let claudiaList = null;

  setup(async () => {
    db.init("mongo");
    await db.placemarkStore.deleteAllPlacemarks();
    await db.markerStore.deleteAllMarkers();
    claudiaList = await db.placemarkStore.addPlacemark(claudia);
    for (let i = 0; i < testMarkers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testMarkers[i] = await db.markerStore.addTrack(claudiaList._id, testMarkers[i]);
    }
  });

  test("create single Marker", async () => {
    const irelandList = await db.placemarkStore.addPlacemark(ireland);
    const marker = await db.markerStore.addMarker(irelandList._id, munster)
    assert.isNotNull(marker._id);
    assertSubset (munster, marker);
  });

  test("get multiple markers", async () => {
    const markers = await db.markerStore.getMarkersByPlacemarkId(claudiaList._id);
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
    const irelandList = await db.placemarkStore.addPlacemark(ireland);
    const marker = await db.markerStore.addMarker(irelandList._id, munster)
    const newMarker = await db.markerStore.getMarkerById(marker._id);
    assertSubset (munster, newMarker);
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