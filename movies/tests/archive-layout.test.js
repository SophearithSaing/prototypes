import test from "node:test";
import assert from "node:assert/strict";
import {
  createArchiveLayout,
  isWalkable,
  roomAtPosition,
  posterSlots,
  ROOM_CAPACITY,
} from "../src/archive-layout.js";

const film = (id, year) => ({
  id: String(id),
  title: `Film ${id}`,
  year: 1999,
  status: "watched",
  watched: `${year}-06-12`,
});

test("a thousand films across twenty years all receive reachable gallery slots", () => {
  const films = Array.from({ length: 1000 }, (_, i) =>
    film(i, 2026 - (i % 20)),
  );
  const layout = createArchiveLayout(films);
  assert.equal(layout.years.length, 20);
  const galleries = layout.rooms.filter((r) => r.type === "year");
  assert.equal(galleries.length, 100);
  const displayed = galleries.flatMap((r) => r.films.map((f) => f.id));
  assert.equal(new Set(displayed).size, films.length);
  assert.equal(displayed.length, films.length);
  for (const room of galleries) {
    assert.ok(room.films.length <= ROOM_CAPACITY);
    assert.equal(posterSlots(room).length, ROOM_CAPACITY);
    for (let x = 0; x <= 20; x += 0.1)
      assert.ok(isWalkable(layout, x * room.side, room.z));
    assert.equal(roomAtPosition(layout, room.x, room.z)?.id, room.id);
  }
});

test("gallery walls block movement while their open doors connect to the concourse", () => {
  const layout = createArchiveLayout([film(1, 2026)]);
  const room = layout.rooms[0];
  assert.equal(isWalkable(layout, -5, room.z), true);
  assert.equal(isWalkable(layout, -5, room.z + 7), false);
  assert.equal(isWalkable(layout, -21, room.z), false);
  assert.equal(isWalkable(layout, -13, room.z + 10), false);
  assert.equal(isWalkable(layout, 0, layout.minZ - 1), false);
  assert.equal(isWalkable(layout, 0, layout.maxZ + 1), false);
});

test("archives use viewing years, retain undated entries, and grow when a gallery fills", () => {
  const films = Array.from({ length: 13 }, (_, i) => film(i, 2025));
  films.push({ ...film("undated", 2024), watched: "" }, film("new", 2026));
  const layout = createArchiveLayout(films);
  assert.deepEqual(layout.years, ["2026", "2025", "Undated"]);
  assert.deepEqual(
    layout.rooms.filter((r) => r.year === "2025").map((r) => r.films.length),
    [12, 1],
  );
  assert.ok(
    layout.rooms.some(
      (r) => r.year === "Undated" && r.films[0].id === "undated",
    ),
  );
});

test("empty archives and large watchlists remain navigable", () => {
  const empty = createArchiveLayout([]);
  assert.equal(empty.rooms.length, 4);
  assert.ok(isWalkable(empty, 0, 10));
  const layout = createArchiveLayout(
    Array.from({ length: 30 }, (_, i) => ({
      ...film(i, 2026),
      status: "watchlist",
    })),
  );
  assert.equal(layout.watchedCount, 0);
  assert.equal(
    layout.rooms.filter((r) => r.type === "watchlist").flatMap((r) => r.films)
      .length,
    30,
  );
});
